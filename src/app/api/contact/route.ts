// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  nombre?: string;
  telefono?: string;
  email?: string;
  mensaje?: string;
  departamento?: "marketing" | "audiovisuales" | "tech" | string;
  // Compatibilidad con lo que envía el form
  teamId?: number | string;
  companyId?: number | string;
  sourceId?: number | string;

  // ⬇️ Compatibilidad: puedes mandar el token con cualquiera de estos nombres
  turnstileToken?: string;
  "cf-turnstile-response"?: string;
};

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

const departmentEmails: Record<"marketing" | "audiovisuales" | "tech", string> = {
  marketing: "marketing@soulmarket.es",
  audiovisuales: "audiovisual@soulmarket.es",
  tech: "tech@soulmarket.es",
};

const departmentLabels: Record<"marketing" | "audiovisuales" | "tech", string> = {
  marketing: "Marketing",
  audiovisuales: "Audiovisuales",
  tech: "Tecnología & Desarrollo",
};

// ---- Verificación Turnstile (server-side) ----
async function verifyTurnstile(token: string, ip?: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new Error("TURNSTILE_SECRET_KEY no configurada en el servidor");
  }

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
      ...(ip ? { remoteip: ip } : {}),
    }),
  });

  type VerifyResp = {
    success: boolean;
    "error-codes"?: string[];
    challenge_ts?: string;
    hostname?: string;
    action?: string;
    cdata?: string;
  };

  const data = (await res.json()) as VerifyResp;
  return data;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    const nombre = (body.nombre || "").trim();
    const telefono = (body.telefono || "").trim();
    const email = (body.email || "").trim();
    const mensaje = (body.mensaje || "").trim();
    // Determina departamento: puede venir como 'departamento' o como 'teamId' (compatibilidad)
    let departamentoRaw = (body.departamento || "").toString().trim();
    const teamIdRaw = body.teamId ?? body["teamId"] ?? "";
    // Si no se recibió departamento explícito, intentamos mapear desde teamId
    if (!departamentoRaw && teamIdRaw) {
      const teamId = Number(teamIdRaw);
      // Mapeo por defecto (ajustable): 6 -> marketing, 4 -> audiovisuales, 5 -> tech
      const map: Record<number, string> = { 6: "marketing", 4: "audiovisuales", 5: "tech" };
      if (map[teamId]) departamentoRaw = map[teamId];
    }

    // 0) Capturamos el token del captcha (aceptamos ambos nombres)
    const token =
      (body.turnstileToken || body["cf-turnstile-response"] || "").trim();

    // 1) Validaciones de datos
    if (!departamentoRaw || !["marketing", "audiovisuales", "tech"].includes(departamentoRaw)) {
      return bad("Debes seleccionar un área de contacto.");
    }
    if (!nombre) return bad("El nombre es obligatorio.");
    if (!email) return bad("El email es obligatorio.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad("El email no es válido.");
    if (!mensaje) return bad("El mensaje es obligatorio.");
    if (telefono && !/^\+?[0-9\s-]{7,15}$/.test(telefono)) return bad("El teléfono no es válido.");

    // 2) Validación de Turnstile (obligatoria)
    if (!token) return bad("Falta el token de verificación (captcha).");

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      null;

    const verify = await verifyTurnstile(token, ip);

    if (!verify.success) {
      return NextResponse.json(
        {
          error: "Captcha fallido",
          details: verify["error-codes"] || [],
        },
        { status: 400 }
      );
    }

    // 3) Lógica propia.
    const departamento = departamentoRaw as "marketing" | "audiovisuales" | "tech";
    const targetEmail = departmentEmails[departamento];
    const deptLabel = departmentLabels[departamento];

    const requestId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    console.log("[/api/contact] Nuevo contacto", {
      requestId,
      departamento,
      targetEmail,
      nombre,
      email,
      telefono: telefono || null,
      captcha: { success: verify.success, hostname: verify.hostname, ts: verify.challenge_ts },
      ip,
    });

    // =================================================================================
    // INICIO: Bloque de reenvío a n8n
    // Asegúrate de tener estas variables en tu .env.local:
    // N8N_WEBHOOK_URL="https://tu-dominio.com/webhook/..."
    // N8N_API_KEY="tu_clave_secreta" (opcional, para proteger el webhook)
    // =================================================================================
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      try {
        const forwardBody = {
          requestId,
          nombre,
          telefono: telefono || undefined,
          email,
          mensaje,
          departamento, // "marketing", "audiovisuales", o "tech"
          teamId: body.teamId,
          companyId: body.companyId,
          sourceId: body.sourceId,
          ip,
          captchaInfo: {
             success: verify.success,
             hostname: verify.hostname,
             ts: verify.challenge_ts
          }
        };

        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (process.env.N8N_API_KEY) {
          headers["X-API-KEY"] = process.env.N8N_API_KEY; // Header de autenticación
        }

        const controller = new AbortController();
        const timeout = 8000; // 8 segundos
        const id = setTimeout(() => controller.abort(), timeout);

        const resp = await fetch(n8nWebhookUrl, {
          method: "POST",
          headers,
          body: JSON.stringify(forwardBody),
          signal: controller.signal,
        });
        clearTimeout(id);

        if (!resp.ok) {
          const text = await resp.text().catch(() => "(no body)");
          console.error("[/api/contact] n8n forward failed", { status: resp.status, body: text });
        }
      } catch (err: unknown) {
        console.error("[/api/contact] Error forwarding to n8n:", err);
      }
    }
    // =================================================================================
    // FIN: Bloque de reenvío a n8n
    // =================================================================================

    return NextResponse.json({
      ok: true,
      requestId,
      departamento: deptLabel,
      targetEmail,
      forwarded: Boolean(n8nWebhookUrl),
    });
  } catch (err: unknown) {
    console.error("[/api/contact] error:", err);
    return bad(getErrorMessage(err) || "No se pudo procesar la solicitud.", 500);
  }
}