// src/app/api/odoo/test-lead/route.ts
import { NextResponse } from "next/server";
import { odooCallKw } from "@/lib/odoo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST() {
  try {
    const leadId = await odooCallKw<number>({
      model: "crm.lead",
      method: "create",
      args: [
        {
          type: "lead",
          name: `TEST Lead desde Next ${new Date().toISOString()}`,
          contact_name: "Next Health",
          email_from: "next@test.local",
          phone: null,
          description: "Lead de prueba generado por /api/odoo/test-lead",
        },
      ],
    });

    return NextResponse.json({ ok: true, leadId });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[/api/odoo/test-lead] error:", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 502 });
  }
}