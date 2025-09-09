// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { odooCreateLead, odooResetSession } from "@/lib/odoo";

export const runtime = "nodejs";

type Payload = {
  nombre?: string;
  telefono?: string;
  email?: string;
  mensaje?: string;
};

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    const nombre = (body.nombre || "").trim();
    const telefono = (body.telefono || "").trim();
    const email = (body.email || "").trim();
    const mensaje = (body.mensaje || "").trim();

    // Validaciones básicas
    if (!nombre) return bad("El nombre es obligatorio.");
    if (!email) return bad("El email es obligatorio.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad("El email no es válido.");
    if (!mensaje) return bad("El mensaje es obligatorio.");
    if (telefono && !/^\+?[0-9\s-]{7,15}$/.test(telefono)) {
      return bad("El teléfono no es válido.");
    }

    try {
      const leadId = await odooCreateLead({
        nombre,
        email,
        telefono: telefono || undefined,
        mensaje,
      });

      console.log("[/api/contact] Lead creado en Odoo:", { leadId, email, nombre });
      return NextResponse.json({ ok: true, leadId });
    } catch (err: unknown) {
      const msg = getErrorMessage(err);

      // Reintento si es sesión caducada
      if (/Session expired|Invalid session|Access Denied/i.test(msg)) {
        odooResetSession();
        const leadId = await odooCreateLead({
          nombre,
          email,
          telefono: telefono || undefined,
          mensaje,
        });
        console.log("[/api/contact] Lead creado tras reintento:", { leadId, email, nombre });
        return NextResponse.json({ ok: true, leadId });
      }

      // Fallos de red/DNS/timeout a Odoo → 502 Bad Gateway
      if (/ENOTFOUND|ECONNREFUSED|EAI_AGAIN|ETIMEDOUT|fetch.*failed/i.test(msg)) {
        return bad("No se pudo contactar con Odoo. Verifica ODOO_URL/DNS/Firewall/SSL.", 502);
      }

      return bad(msg || "Error al crear el lead en Odoo.", 500);
    }
  } catch (err: unknown) {
    console.error("[/api/contact] error:", err);
    return bad("No se pudo procesar la solicitud.", 500);
  }
}