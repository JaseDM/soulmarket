// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  nombre?: string;
  telefono?: string;
  email?: string;
  mensaje?: string;
  departamento?: "marketing" | "audiovisuales" | "tech" | string;
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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    const nombre = (body.nombre || "").trim();
    const telefono = (body.telefono || "").trim();
    const email = (body.email || "").trim();
    const mensaje = (body.mensaje || "").trim();
    const departamentoRaw = (body.departamento || "").trim();

    // Validaciones
    if (!departamentoRaw || !["marketing", "audiovisuales", "tech"].includes(departamentoRaw)) {
      return bad("Debes seleccionar un área de contacto.");
    }
    if (!nombre) return bad("El nombre es obligatorio.");
    if (!email) return bad("El email es obligatorio.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad("El email no es válido.");
    if (!mensaje) return bad("El mensaje es obligatorio.");
    if (telefono && !/^\+?[0-9\s-]{7,15}$/.test(telefono)) return bad("El teléfono no es válido.");

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
    });

    // Si en el futuro quieres enviar email, aquí podrías integrar nodemailer
    // y mandar a `targetEmail` el contenido. Por ahora solo confirmamos recepción.

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