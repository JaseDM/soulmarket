import { NextResponse } from "next/server";
import { odooCallKw } from "@/lib/odoo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const result = await odooCallKw<any[]>({
      model: "crm.lead",
      method: "read",
      args: [[id], ["name", "type", "active", "user_id", "team_id", "company_id", "create_date", "email_from", "contact_name"]],
    });
    return NextResponse.json({ ok: true, lead: result?.[0] ?? null });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 502 });
  }
}