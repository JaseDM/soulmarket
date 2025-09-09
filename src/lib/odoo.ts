// src/lib/odoo.ts

type JsonRpcRequest = {
  jsonrpc: "2.0";
  method: "call";
  params: Record<string, unknown>;
  id: number;
};

type JsonRpcError = {
  message?: string;
  data?: { message?: string; [k: string]: unknown };
  [k: string]: unknown;
};

type JsonRpcResponse<T> = {
  jsonrpc?: "2.0";
  id?: number;
  result?: T;
  error?: JsonRpcError;
};

export type AuthResult = { uid: number; sessionId: string };

let _sessionCache: AuthResult | null = null;

const ODOO_URL = (process.env.ODOO_URL || "").replace(/\/+$/, "");
const ODOO_DB = process.env.ODOO_DB || "";
const ODOO_LOGIN = process.env.ODOO_LOGIN || "";
const ODOO_PASSWORD = process.env.ODOO_PASSWORD || "";

function assertEnv(): void {
  const missing: string[] = [];
  if (!ODOO_URL) missing.push("ODOO_URL");
  if (!ODOO_DB) missing.push("ODOO_DB");
  if (!ODOO_LOGIN) missing.push("ODOO_LOGIN");
  if (!ODOO_PASSWORD) missing.push("ODOO_PASSWORD");
  if (missing.length) {
    throw new Error(`[Odoo] Faltan variables de entorno: ${missing.join(", ")}`);
  }
}

function withTimeout(ms: number) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(id) };
}

function safeHost(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

/** Autentica contra Odoo y cachea cookie de sesión */
export async function odooAuthenticate(): Promise<AuthResult> {
  assertEnv();
  if (_sessionCache) return _sessionCache;

  const body: JsonRpcRequest = {
    jsonrpc: "2.0",
    method: "call",
    params: { db: ODOO_DB, login: ODOO_LOGIN, password: ODOO_PASSWORD },
    id: Date.now(),
  };

  const t = withTimeout(10_000);
  let res: Response;
  try {
    res = await fetch(`${ODOO_URL}/web/session/authenticate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: t.signal,
      cache: "no-store",
    });
  } catch (e) {
    t.clear();
    const reason = e instanceof Error ? e.message : String(e);
    const host = safeHost(ODOO_URL);
    throw new Error(`[Odoo] No se pudo conectar a ${host} (/web/session/authenticate): ${reason}`);
  }
  t.clear();

  if (!res.ok) {
    throw new Error(`[Odoo] Auth HTTP ${res.status}`);
  }

  const setCookie = res.headers.get("set-cookie") || "";
  const sessionIdMatch = /session_id=([^;]+)/.exec(setCookie);
  const sessionId = sessionIdMatch?.[1];

  const data = (await res.json()) as JsonRpcResponse<{ uid?: number }>;
  const uid = data?.result?.uid;

  if (!sessionId || !uid) {
    throw new Error("[Odoo] Auth inválida: falta session_id o uid");
  }

  _sessionCache = { sessionId, uid };
  return _sessionCache;
}

/** call_kw genérico */
export async function odooCallKw<T = unknown>(opts: {
  model: string;
  method: string;
  args?: unknown[];
  kwargs?: Record<string, unknown>;
}): Promise<T> {
  const { sessionId } = await odooAuthenticate();

  const payload: JsonRpcRequest = {
    jsonrpc: "2.0",
    method: "call",
    params: {
      model: opts.model,
      method: opts.method,
      args: opts.args ?? [],
      kwargs: opts.kwargs ?? {},
    },
    id: Date.now(),
  };

  const t = withTimeout(12_000);
  let res: Response;
  try {
    res = await fetch(`${ODOO_URL}/web/dataset/call_kw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session_id=${sessionId}`,
      },
      body: JSON.stringify(payload),
      signal: t.signal,
      cache: "no-store",
    });
  } catch (e) {
    t.clear();
    const reason = e instanceof Error ? e.message : String(e);
    const host = safeHost(ODOO_URL);
    throw new Error(`[Odoo] No se pudo conectar a ${host} (/web/dataset/call_kw): ${reason}`);
  }
  t.clear();

  if (!res.ok) {
    throw new Error(`[Odoo] call_kw HTTP ${res.status}`);
  }

  const data = (await res.json()) as JsonRpcResponse<T>;
  if (data?.error) {
    const message = data.error.data?.message || data.error.message || "Error desconocido en Odoo";
    throw new Error(`[Odoo] ${message}`);
  }
  return data.result as T;
}

/** Crea un lead en crm.lead */
export async function odooCreateLead(input: {
  nombre: string;
  email: string;
  telefono?: string | null;
  mensaje: string;
}): Promise<number> {
  const vals = {
    type: "lead",
    name: `Contacto web: ${input.nombre}`,
    contact_name: input.nombre,
    email_from: input.email,
    phone: input.telefono || null,
    description: input.mensaje,
  };
  const leadId = await odooCallKw<number>({
    model: "crm.lead",
    method: "create",
    args: [vals],
  });
  return leadId;
}

export function odooResetSession(): void {
  _sessionCache = null;
}