// src/app/[locale]/contact/ContactForm.tsx

"use client";

import * as React from "react";
import Script from "next/script";
import { toast } from "sonner"; // <--- Importación de Sonner

// --- Tipos (sin cambios) ---
type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

export type ContactFormI18n = {
  fields: {
    name: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    team: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  options: { team: Record<string, string> };
  privacy: { labelPrefix: string; linkText: string };
  infoLine: string;
  actions: { submit: string; sending: string };
  errors: { required: string; email: string; phone: string; team: string };
  feedback: { success: string; error: string };
};

type Props = { i18n: ContactFormI18n; siteKey: string };

// --- Componente ---
export default function ContactForm({ i18n, siteKey }: Props) {
  const [state, setState] = React.useState<FormState>({ status: "idle" });

  const captchaRef = React.useRef<HTMLDivElement | null>(null);
  const widgetIdRef = React.useRef<string | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const renderCaptcha = React.useCallback(() => {
    if (!captchaRef.current || typeof window === "undefined" || !window.turnstile) return;
    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
    }
    widgetIdRef.current = window.turnstile.render(captchaRef.current, {
      sitekey: siteKey,
      theme: "auto",
      "error-callback": (code: string) => console.error("[Turnstile error]", code),
      "expired-callback": () => {
        if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
      }
    });
  }, [siteKey]);

  React.useEffect(() => {
    renderCaptcha();
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderCaptcha]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // --- Recolección y validación de datos (sin cambios) ---
    const companyId = Number((form.get("company_id") as string) || "4");
    const sourceId = Number((form.get("source_id") as string) || "10");
    const teamId = Number((form.get("area_interes") as string) || "");
    if ((form.get("website") as string)?.trim()) return; // Honeypot

    const turnstileToken = (form.get("cf-turnstile-response") as string | null)?.trim() || "";

    const payload = {
      nombre: (form.get("nombre") as string | null)?.trim() || "",
      telefono: (form.get("telefono") as string | null)?.trim() || "",
      email: (form.get("email") as string | null)?.trim() || "",
      mensaje: (form.get("mensaje") as string | null)?.trim() || "",
      teamId,
      companyId,
      sourceId,
      turnstileToken
    };

    const errors: string[] = [];
    if (!payload.nombre) errors.push(i18n.errors.required);
    if (!payload.email) errors.push(i18n.errors.required);
    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errors.push(i18n.errors.email);
    if (!payload.mensaje) errors.push(i18n.errors.required);
    if (!payload.teamId) errors.push(i18n.errors.team);
    if (form.get("privacy") !== "on") errors.push(i18n.errors.required);
    if (!payload.turnstileToken) errors.push(i18n.errors.required);

    if (errors.length) {
      // Usamos el toast también para errores de validación
      toast.error(errors[0]);
      setState({ status: "error", message: errors[0] });
      return;
    }

    // --- Lógica de envío con Notificaciones Toast ---
    try {
      setState({ status: "submitting" });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = (await res.json().catch(() => ({}))) as { ok?: boolean, requestId?: string, error?: string };

      // Si la respuesta no es 200 OK o no incluye el 'requestId', lo tratamos como un error
      if (!res.ok || !data.requestId) {
        throw new Error(data?.error || i18n.feedback.error);
      }

      // ¡ÉXITO! Lanzamos la notificación flotante
      toast.success(i18n.feedback.success);

      // Limpiamos el formulario y reseteamos el estado y el captcha
      setState({ status: "idle" });
      formRef.current?.reset();
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }

    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      // Mostramos notificación de error y también el mensaje en el formulario
      toast.error(errorMessage);
      setState({ status: "error", message: errorMessage });
    }
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderCaptcha}
      />

      <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
        {/* Honeypot & Hidden fields */}
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <input type="hidden" name="company_id" value="4" />
        <input type="hidden" name="source_id" value="10" />

        {/* --- Campos del Formulario (sin cambios) --- */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={i18n.fields.name.label} htmlFor="nombre" required>
            <input id="nombre" name="nombre" required placeholder={i18n.fields.name.placeholder} className={inputClass} />
          </Field>
          <Field label={i18n.fields.phone.label} htmlFor="telefono">
            <input id="telefono" name="telefono" placeholder={i18n.fields.phone.placeholder} inputMode="tel" className={inputClass} />
          </Field>
        </div>
        <Field label={i18n.fields.email.label} htmlFor="email" required>
          <input id="email" name="email" type="email" required placeholder={i18n.fields.email.placeholder} className={inputClass} />
        </Field>
        <Field label={i18n.fields.team.label} htmlFor="area_interes" required>
          <select id="area_interes" name="area_interes" required className={inputClass} defaultValue="">
            <option value="" disabled>{i18n.fields.team.placeholder}</option>
            <option value="6">{i18n.options.team["6"]}</option>
            <option value="4">{i18n.options.team["4"]}</option>
            <option value="5">{i18n.options.team["5"]}</option>
          </select>
        </Field>
        <Field label={i18n.fields.message.label} htmlFor="mensaje" required>
          <textarea id="mensaje" name="mensaje" required placeholder={i18n.fields.message.placeholder} rows={5} className={inputClass + " resize-y"} />
        </Field>

        <div ref={captchaRef} />

        <div className="flex items-start gap-3 rounded-md border border-slate-200/70 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
          <input id="privacy" name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-400 dark:border-white/10 dark:bg-transparent dark:checked:bg-cyan-500" />
          <label htmlFor="privacy" className="text-sm text-slate-700 dark:text-slate-200">
            {i18n.privacy.labelPrefix}{" "}
            <a href="/privacy" className="font-semibold text-primary-800 underline text-primary-500/40 underline-offset-2 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-200" target="_blank" rel="noopener noreferrer">
              {i18n.privacy.linkText}
            </a>.
          </label>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">{i18n.infoLine}</p>
          <button type="submit" disabled={state.status === "submitting"} className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white shadow-lg shadow-primary-500/20 transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-primary-500 dark:hover:bg-primary-400">
            {state.status === "submitting" ? (<><Spinner /> {i18n.actions.sending}</>) : (i18n.actions.submit)}
          </button>
        </div>

        {/* El Alert de error se mantiene, el de éxito ya no es necesario */}
        {state.status === "error" && <Alert tone="error" message={state.message} />}
      </form>
    </>
  );
}

// --- Componentes de UI (sin cambios) ---
const inputClass = "w-full rounded-lg border border-slate-300 bg-white/95 px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-400";

function Field({ label, htmlFor, required, children }: { label: string; htmlFor: string; required?: boolean; children: React.ReactNode; }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1 inline-flex items-center gap-1 text-sm text-slate-700 dark:text-slate-200">
        {label}
        {required ? <span aria-hidden className="text-rose-500">*</span> : null}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Alert({ tone, message }: { tone: "success" | "error"; message: string }) {
  const color = tone === "success"
      ? "bg-emerald-100 text-emerald-800 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:ring-emerald-500/20"
      : "bg-rose-100 text-rose-800 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-200 dark:ring-rose-500/20";
  return (
    <div className={`mt-2 flex items-start gap-2 rounded-lg p-3 text-sm ring-1 ring-inset ${color}`} role="status" aria-live="polite">
      {tone === "success" ? (
        <svg className="mt-0.5 h-5 w-5 flex-none" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" /></svg>
      ) : (
        <svg className="mt-0.5 h-5 w-5 flex-none" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 13h-2v-2h2zm0-4h-2V7h2z" /></svg>
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