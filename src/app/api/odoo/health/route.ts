// src/app/api/odoo/health/route.ts
import { NextResponse } from "next/server";
import { odooAuthenticate, odooCallKw } from "@/lib/odoo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type VersionInfo = {
  server_version?: string;
  server_serie?: string;
  protocol_version?: number;
  [k: string]: unknown;
};

type UserInfo = {
  id?: number;
  name?: string;
  login?: string;
  active?: boolean;
  [k: string]: unknown;
};

async function tryVersionInfo(sessionId: string) {
  const base = (process.env.ODOO_URL || "").replace(/\/+$/, "");
  // 1) Intento GET
  let res = await fetch(`${base}/web/webclient/version_info`, {
    headers: { Cookie: `session_id=${sessionId}` },
    cache: "no-store",
  });
  if (res.ok) {
    const version = (await res.json()) as VersionInfo;
    return { version, method: "GET" as const };
  }

  // 2) Intento POST (algunos setups exigen POST)
  res = await fetch(`${base}/web/webclient/version_info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `session_id=${sessionId}`,
    },
    body: JSON.stringify({}), // cuerpo vacío
    cache: "no-store",
  });
  if (res.ok) {
    const version = (await res.json()) as VersionInfo;
    return { version, method: "POST" as const };
  }

  return { version: null as VersionInfo | null, methodTried: ["GET", "POST"] as const, status: res.status };
}

export async function GET() {
  try {
    // 1) Autenticación
    const { uid, sessionId } = await odooAuthenticate();

    // 2) Version (tolerante a GET/POST/errores)
    const v = await tryVersionInfo(sessionId);

    // 3) Usuario autenticado (JSON-RPC real)
    const users = await odooCallKw<UserInfo[]>({
      model: "res.users",
      method: "read",
      args: [[uid], ["name", "login", "active"]],
    });

    // 4) Extra opcional: confirmar que podemos leer algún parámetro del sistema
    const baseUrl = await odooCallKw<string | false>({
      model: "ir.config_parameter",
      method: "get_param",
      args: ["web.base.url"],
    });

    return NextResponse.json({
      ok: true,
      version: v.version,             // puede ser null si ambos (GET/POST) fallan
      versionMethod: (v as any).method ?? undefined,
      versionStatus: (v as any).status ?? undefined,
      user: users?.[0] ?? null,
      baseUrl: baseUrl || null,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 502 });
  }
}