// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  nombre?: string;
  telefono?: string;
  email?: string;
  mensaje?: string;
  departamento?: "marketing" | "audiovisuales" | "tech" | string;

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
    const departamentoRaw = (body.departamento || "").trim();

    // 0) Capturamos el token del captcha (aceptamos ambos nombres)
    const token =
      (body.turnstileToken || body["cf-turnstile-response"] || "").trim();

    // 1) Validaciones de datos (como tenías)
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

    // Extraemos IP de cabecera estándar en Plesk/proxy
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") || // por si usas Cloudflare delante
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

    // 3) Lógica propia (tuya). Mantengo tu flujo original:
    const departamento = departamentoRaw as "marketing" | "audiovisuales" | "tech";
    const targetEmail = departmentEmails[departamento];
    const deptLabel = departmentLabels[departamento];

    // Genera un id local para trazabilidad (sustituye al old leadId)
    const requestId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // Log mínimo en servidor (para auditoría)
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

    // Si en el futuro quieres enviar email o reenviar a Odoo desde aquí, se haría ahora.
    // (Puedo añadir el fetch a tu backend si me confirmas el endpoint y el formato exacto).

    return NextResponse.json({
      ok: true,
      requestId,
      departamento: deptLabel,
      targetEmail, // útil para monitorizar a qué buzón iría
    });
  } catch (err: unknown) {
    console.error("[/api/contact] error:", err);
    return bad(getErrorMessage(err) || "No se pudo procesar la solicitud.", 500);
  }
}