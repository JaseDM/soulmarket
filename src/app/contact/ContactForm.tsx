"use client";

import * as React from "react";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

export default function ContactForm() {
  const [state, setState] = React.useState<FormState>({ status: "idle" });
  const formRef = React.useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const companyId = Number((form.get("company_id") as string) || "4");
    const sourceId = Number((form.get("source_id") as string) || "10");
    const teamId = Number((form.get("area_interes") as string) || "");
    if ((form.get("website") as string)?.trim()) return; // honeypot

    const payload = {
      nombre: (form.get("nombre") as string | null)?.trim() || "",
      telefono: (form.get("telefono") as string | null)?.trim() || "",
      email: (form.get("email") as string | null)?.trim() || "",
      mensaje: (form.get("mensaje") as string | null)?.trim() || "",
      teamId,
      companyId,
      sourceId,
    };

    const errors: string[] = [];
    if (!payload.nombre) errors.push("El nombre es obligatorio.");
    if (!payload.email) errors.push("El email es obligatorio.");
    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
      errors.push("El email no es válido.");
    if (!payload.mensaje) errors.push("El mensaje es obligatorio.");
    if (!payload.teamId) errors.push("Selecciona un área de interés.");
    if (payload.telefono && !/^\+?[0-9\s-]{7,15}$/.test(payload.telefono))
      errors.push("El teléfono no es válido.");
    if (form.get("privacy") !== "on") errors.push("Debes aceptar la política de privacidad.");

    if (errors.length) {
      setState({ status: "error", message: errors[0] });
      return;
    }

    try {
      setState({ status: "submitting" });
      const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "https://api.soulmarket.es";
      const res = await fetch(`${apiBase}/odoo/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.nombre,
          email: payload.email,
          phone: payload.telefono || undefined,
          message: payload.mensaje,
          source: { id: payload.sourceId },
          company: { id: payload.companyId },
          team: { id: payload.teamId },
        }),
        // include credentials only if same-origin; leave out by default to avoid CORS preflight issues
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => undefined)) as { error?: string } | undefined;
        throw new Error(data?.error || "No se pudo enviar el mensaje.");
      }
      setState({ status: "success" });
      formRef.current?.reset();
    } catch (err: unknown) {
      setState({ status: "error", message: getErrorMessage(err) });
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      {/* Hidden defaults required by backend/Odoo */}
      <input type="hidden" name="company_id" value="4" />
      <input type="hidden" name="source_id" value="10" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" htmlFor="nombre" required>
          <input id="nombre" name="nombre" required placeholder="Tu nombre" className={inputClass} />
        </Field>
        <Field label="Teléfono" htmlFor="telefono">
          <input
            id="telefono"
            name="telefono"
            placeholder="+34 600 000 000"
            inputMode="tel"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Email" htmlFor="email" required>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="tu@correo.com"
          className={inputClass}
        />
      </Field>

      <Field label="Área de interés" htmlFor="area_interes" required>
        <select id="area_interes" name="area_interes" required className={inputClass} defaultValue="">
          <option value="" disabled>
            Selecciona un equipo
          </option>
          <option value="6">Tecnología (web, hosting, integraciones)</option>
          <option value="4">Marketing (comunicación y SEO/Ads)</option>
          <option value="5">Audiovisual (foto y vídeo)</option>
        </select>
      </Field>

      <Field label="Mensaje" htmlFor="mensaje" required>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          placeholder="¿En qué podemos ayudarte?"
          rows={5}
          className={inputClass + " resize-y"}
        />
      </Field>

      {/* Aceptación de privacidad */}
      <div className="flex items-start gap-3 rounded-md border border-slate-200/70 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-400 dark:border-white/10 dark:bg-transparent dark:checked:bg-cyan-500"
        />
        <label htmlFor="privacy" className="text-sm text-slate-700 dark:text-slate-200">
          He leído y acepto la{" "}
          <a
            href="/privacy"
            className="font-semibold text-cyan-700 underline decoration-cyan-400/40 underline-offset-2 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            política de privacidad
          </a>
          .
        </label>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-slate-600 dark:text-slate-400">Usamos tus datos solo para responderte.</p>
        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:hover:bg-cyan-400"
        >
          {state.status === "submitting" ? (
            <>
              <Spinner /> Enviando…
            </>
          ) : (
            "Enviar"
          )}
        </button>
      </div>

      {state.status === "error" && <Alert tone="error" message={state.message} />}
      {state.status === "success" && (
        <Alert tone="success" message="¡Mensaje enviado! Te contactaremos muy pronto." />
      )}
    </form>
  );
}

/* ---------- UI helpers ---------- */

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white/95 px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-400";

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1 inline-flex items-center gap-1 text-sm text-slate-700 dark:text-slate-200">
        {label}
        {required ? (
          <span className="rounded bg-cyan-500/10 px-1 text-[10px] font-semibold text-cyan-700 ring-1 ring-inset ring-cyan-500/20 dark:text-cyan-300 dark:ring-cyan-400/20">
            Obligatorio
          </span>
        ) : null}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Alert({ tone, message }: { tone: "success" | "error"; message: string }) {
  const color =
    tone === "success"
      ? "bg-emerald-100 text-emerald-800 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:ring-emerald-500/20"
      : "bg-rose-100 text-rose-800 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-200 dark:ring-rose-500/20";
  return (
    <div className={`mt-2 flex items-start gap-2 rounded-lg p-3 text-sm ring-1 ring-inset ${color}`} role="status" aria-live="polite">
      {tone === "success" ? (
        <svg className="mt-0.5 h-5 w-5 flex-none" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
        </svg>
      ) : (
        <svg className="mt-0.5 h-5 w-5 flex-none" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 13h-2v-2h2zm0-4h-2V7h2z" />
        </svg>
      )}
      <p>{message}</p>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin text-white dark:text-slate-900" viewBox="0 0 24 24" aria-hidden>
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}