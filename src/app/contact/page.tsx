import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import React from "react";
import Tetris from "@/components/interactive/Tetris";


export const metadata: Metadata = {
  title: "Contacto | Soulmarket",
  description:
    "Habla con nuestro equipo: soporte, demos y propuestas comerciales.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contacto | Soulmarket",
    description:
      "Habla con nuestro equipo: soporte, demos y propuestas comerciales.",
    url: "/contact",
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-800 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 dark:text-slate-100">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(14,165,233,.15),transparent)] dark:bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(56,189,248,.18),transparent)]"
        />
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300 dark:border-cyan-400/30 dark:bg-cyan-400/10">
            <SparkleIcon className="h-3.5 w-3.5" />
            ¿Hablamos?
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Contacta con <span className="text-cyan-700 dark:text-cyan-300">Soulmarket</span>
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Cuéntanos tu idea, solicita soporte o pide una demo. Te respondemos
            lo antes posible.
          </p>
        </div>
      </section>

      {/* TARJETAS */}
      <section className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          <ContactCard
            title="Email"
            value="info@soulmarket.es"
            href="mailto:info@soulmarket.es"
            icon={<MailIcon className="h-6 w-6" />}
            gradient="from-cyan-500 via-fuchsia-500 to-indigo-500"
          />
          <ContactCard
            title="Teléfono"
            value="+34 625 030 452"
            href="tel:+34625030452"
            icon={<PhoneIcon className="h-6 w-6" />}
            gradient="from-emerald-500 via-cyan-500 to-blue-500"
          />
          <ContactCard
            title="WhatsApp"
            value="+34 625 030 452"
            href="https://wa.me/34625030452"
            icon={<WhatsappIcon className="h-6 w-6" />}
            gradient="from-lime-500 via-emerald-500 to-cyan-500"
          />
          <ContactCard
            title="Horario"
            value="Lunes a Viernes · 9:00–17:00"
            href="#form"
            icon={<ClockIcon className="h-6 w-6" />}
            gradient="from-violet-500 via-fuchsia-500 to-rose-500"
          />
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* FORM */}
          <div id="form" className="relative">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/15 to-fuchsia-500/15 blur-lg dark:from-cyan-500/30 dark:via-indigo-500/20 dark:to-fuchsia-500/20" />
            <div className="relative rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60">
              <h2 className="text-2xl font-bold">Envíanos un mensaje</h2>
              <p className="mt-1 mb-6 text-sm text-slate-600 dark:text-slate-300">
                Rellena el formulario y te contactamos en breve.
              </p>
              <ContactForm />
            </div>
            
          </div>

          {/* INFO / MAPA */}
          <div className="space-y-6">
            <Tetris />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- UI helpers ---------- */
  // Dentro de page.tsx: ContactCard SIN any
  function ContactCard({
    title,
    value,
    href,
    icon,
    gradient,
  }: {
    title: string;
    value: string;
    href?: string;
    icon: React.ReactNode;
    gradient: string; // CSS linear-gradient(...)
  }) {
    // Tipado correcto para variables CSS personalizadas sin "as any" ni literal assertion
    type CSSVars = React.CSSProperties & { ["--gbg"]?: string };
    const style: CSSVars = { ["--gbg"]: gradient };

    const card = (
      <div className="gradient-border h-full" style={style}>
        <div className="relative z-[1] flex h-full flex-col justify-between overflow-hidden rounded-[calc(1rem-1px)] border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur-md transition hover:border-cyan-500/40 dark:border-white/10 dark:bg-slate-900/60">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="relative">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-cyan-700 ring-1 ring-inset ring-slate-200 dark:bg-white/5 dark:text-cyan-300 dark:ring-white/10">
              {icon}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{title}</div>
          </div>
          <div className="mt-4 text-lg font-semibold text-slate-800 dark:text-slate-100">{value}</div>
        </div>
      </div>
    );

  return href ? (
    <a href={href} className="group block h-full">
      {card}
    </a>
  ) : (
    <div className="group block h-full">{card}</div>
  );
}

function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2l2.2 5.4L20 9.6l-5.2 2.2L12 17l-2.8-5.2L4 9.6l5.8-2.2L12 2z" />
    </svg>
  );
}
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20 4H4a2 2 0 00-2 2v.4l10 6 10-6V6a2 2 0 00-2-2z" />
      <path d="M22 8.2l-10 6-10-6V18a2 2 0 002 2h16a2 2 0 002-2V8.2z" />
    </svg>
  );
}
function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6.6 10.8a15.9 15.9 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.24c1.2.48 2.5.74 3.8.74a1 1 0 011 1V20a2 2 0 01-2 2C10.3 22 2 13.7 2 3a2 2 0 012-2h3.3a1 1 0 011 1c0 1.3.26 2.6.74 3.8a1 1 0 01-.24 1.1L6.6 10.8z" />
    </svg>
  );
}
function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M128.2 25C71.5 25 25.5 70.9 25.5 127.5c0 22.6 6.2 44.5 18 63.4L24 231.9l42.1-13.8c18.3 10 39 15.3 60.1 15.3 56.6 0 102.5-45.9 102.5-102.5S184.8 25 128.2 25zm0 186.4c-18.9 0-37.4-5-53.5-14.6l-3.8-2.3-25 8.2 8.2-24.4-2.5-4c-10.5-16.6-16-35.8-16-55.3 0-56 45.6-101.6 101.6-101.6s101.6 45.6 101.6 101.6-45.6 101.6-101.6 101.6zm58.7-72.7c-3.2-1.6-18.9-9.3-21.8-10.4-2.9-1.1-5-1.6-7.1 1.6-2.1 3.2-8.1 10.4-9.9 12.5-1.8 2.1-3.7 2.4-6.9.8-3.2-1.6-13.3-4.9-25.3-15.6-9.3-8.3-15.6-18.5-17.4-21.7-1.8-3.2-.2-5 1.3-6.6 1.3-1.3 3.2-3.7 4.8-5.6 1.6-1.9 2.1-3.2 3.2-5.3 1.1-2.1.5-4-0.3-5.6-.8-1.6-7.1-17-9.8-23.3-2.6-6.2-5.2-5.4-7.1-5.5-1.8-.1-4-.1-6.1-.1s-5.6.8-8.5 4c-2.9 3.2-11 10.7-11 26.1s11.3 30.2 12.9 32.3c1.6 2.1 22.2 33.9 54.2 47.5 7.6 3.3 13.5 5.2 18.1 6.7 7.6 2.4 14.5 2.1 20 1.3 6.1-0.9 18.9-7.7 21.6-15.2 2.7-7.5 2.7-14 1.9-15.2-.8-1.3-2.9-2.1-6.1-3.7z" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    </svg>
  );
}