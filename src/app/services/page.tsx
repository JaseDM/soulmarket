import Link from "next/link";
import { notFound } from "next/navigation";

// Server Component — no hooks so it stays compatible with the App Router.
// Light/Dark: Tailwind `dark:` variants. Keep styles simple to match the template.
// i18n (ES/EN) minimal inline dictionary until next-intl messages are wired.

const DICT = {
  es: {
    metaTitle: "Servicios — Soulmarket",
    heroBadge: "Agencia digital 360º",
    heroTitle: "Transformación digital completa",
    heroSub: "Nuestros servicios van desde la creación de páginas corporativas o e-commerce hasta la creación de contenidos audiovisuales de productos o para compartir en redes sociales. Con la solución llave en mano no tendras que preocuparte de palabras como hosting, migraciones o seguridad. Integramos web con CRM/ERP y automatizamos la captación de leads con campañas a tu medida.",
    ctaPrimary: "Habla con nosotros",
    ctaSecondary: "Ver proyectos",

    sections: {
      services: {
        title: "¿Qué hacemos?",
        subtitle: "Tecnología, marketing, audiovisual e infraestructura. Desde automatización con IA y ERP/CRM hasta webs, e‑commerce y soporte técnico continuo.",
        items: [
          {
            tag: "Transformación Digital",
            title: "Automatización & IA",
            desc:
              "Optimizamos procesos con ERP/CRM y flujos sin código/low‑code. Implementamos IA práctica para atención, generación de contenidos y análisis.",
            bullets: [
              "ERP/CRM: Odoo, HubSpot, Zoho (integraciones a medida)",
              "Automatización: n8n, Make, Zapier (webhooks, colas, RPA ligero)",
              "IA aplicada: chatbots, generación de imágenes/texto, análisis de datos",
              "APIs y microservicios: REST/SOAP, OAuth2, Webhooks",
            ],
          },
          {
            tag: "Desarrollo Web & App",
            title: "Web corporativa, e‑commerce y mobile",
            desc:
              "Sitios rápidos y seguros con enfoque en conversión: desde landing a catálogo y tienda. Apps móviles cuando el caso de uso lo requiere.",
            bullets: [
              "Front: Next.js (export estático), Tailwind, TypeScript",
              "E‑commerce: PrestaShop, Shopify o headless a medida",
              "Apps móviles: React Native / Flutter, publicación iOS/Android",
              "UX/UI y prototipado con el usuario en el centro",
            ],
          },
          {
            tag: "Marketing & Comunicación",
            title: "SEO/SEM, contenidos y social",
            desc:
              "Estrategias creativas y medibles para atraer clientes y consolidar marca en ES/EN.",
            bullets: [
              "SEO técnico, on‑page y schema (ES/EN con hreflang)",
              "SEM/ADS y campañas multi‑canal",
              "Gestión de redes: contenido, comunidad e influencers",
              "Branding: identidad, piezas online/offline",
            ],
          },
          {
            tag: "Audiovisual",
            title: "Foto & Vídeo",
            desc:
              "Producción y edición de piezas para landings, anuncios y redes: spots, reels y vídeos corporativos.",
            bullets: ["Pre‑producción/guion", "Grabación y edición", "Piezas para paid/social"],
          },
          {
            tag: "Infraestructura & Soporte",
            title: "Servidores, bases de datos y mantenimiento",
            desc:
              "Nos encargamos de la base tecnológica para que el negocio funcione sin interrupciones.",
            bullets: [
              "VPS y redes: administración, seguridad y backups",
              "Bases de datos: creación, mantenimiento y optimización",
              "Integraciones técnicas avanzadas y monitoreo",
              "Soporte y gestión de incidencias con SLA",
            ],
          },
        ],
      },
      offerings: {
        title: "Entregables habituales",
        items: [
          { title: "Mapa de procesos & automatizaciones", desc: "Diagrama de flujos con herramientas, triggers y SLAs." },
          { title: "Arquitectura técnica", desc: "Diagrama de infraestructura (VPS, CDN, BD, backups, monitorización)." },
          { title: "Guía de marca & componentes", desc: "Tokens, tipografías y librería de UI (Tailwind)." },
          { title: "Kit de analítica", desc: "Métricas, dashboards y eventos clave para negocio." },
        ],
      },
      process: {
        title: "Cómo trabajamos",
        steps: [
          { title: "1) Auditoría de plantilla", desc: "Inventario de CSS/JS y componentes reutilizables." },
          { title: "2) Layout + i18n", desc: "Base Next + next-intl con prefijos /es y /en." },
          { title: "3) Desarrollo por secciones", desc: "Portamos secciones de la plantilla a componentes." },
          { title: "4) Formularios & Odoo", desc: "Lead routing por equipo, validación y RGPD." },
          { title: "5) SEO & Rendimiento", desc: "hreflang, sitemap, Vitals y accesibilidad." },
          { title: "6) CI/CD & Despliegue", desc: "next export ➜ rsync (front) / Passenger (API)." },
        ],
      },
      pricing: {
        title: "Planes orientativos",
        note: "Precios base. Ajustamos según alcance/volumen.",
        cards: [
          {
            name: "Landing Starter",
            price: "690€",
            period: "pago único",
            features: [
              "1 página (ES/EN)",
              "Maquetación desde plantilla",
              "Form básico a Odoo",
            ],
          },
          {
            name: "Web Pro",
            price: "1.490€",
            period: "pago único",
            features: [
              "Hasta 5 páginas (ES/EN)",
              "Blog básico + SEO on-page",
              "Form avanzado + validación",
            ],
            highlight: true,
          },
          {
            name: "Growth",
            price: "desde 390€",
            period: "al mes",
            features: [
              "Mantenimiento + contenidos",
              "Gestión redes/ads",
              "Reporting mensual",
            ],
          },
        ],
        disclaimer: "* No incluye IVA ni costes de terceros (dominios, ads, etc.).",
      },
      faqs: {
        title: "Preguntas frecuentes",
        items: [
          {
            q: "¿Trabajáis multilenguaje desde el inicio?",
            a: "Sí, configuramos /es y /en con next-intl y hreflang.",
          },
          {
            q: "¿Cómo se envían los leads a Odoo?",
            a: "Mediante la API NestJS en /odoo/leads con company_id=4 y ruteo por equipo.",
          },
          {
            q: "¿Qué hosting usáis?",
            a: "VPS Ubuntu 22.04 + Plesk, con despliegues por rsync y Passenger para la API.",
          },
        ],
      },
      cta: {
        title: "¿Listo para empezar?",
        desc: "Cuéntanos tu proyecto y te proponemos un plan por fases.",
        primary: "Solicitar propuesta",
        secondary: "Ver contacto",
      },
    },
  },
  en: {
    metaTitle: "Services — Soulmarket",
    heroBadge: "360° Digital Agency",
    heroTitle: "Web design, marketing, audiovisual & automation",
    heroSub:
      "Multidisciplinary team with static Next export and a Nest API. We integrate Odoo (CRM/ERP) and automate lead capture.",
    ctaPrimary: "Talk to us",
    ctaSecondary: "See projects",

    sections: {
      services: {
        title: "What we do",
        subtitle:
          "Technology, marketing, audiovisual and infrastructure. From AI/ERP automation to websites, e‑commerce and ongoing technical support.",
        items: [
          {
            tag: "Digital Transformation",
            title: "Automation & AI",
            desc:
              "We optimize processes with ERP/CRM and low/no‑code flows. Practical AI for support, content generation and analytics.",
            bullets: [
              "ERP/CRM: Odoo, HubSpot, Zoho (custom integrations)",
              "Automation: n8n, Make, Zapier (webhooks, queues, light RPA)",
              "Applied AI: chatbots, image/text generation, data analysis",
              "APIs & microservices: REST/SOAP, OAuth2, Webhooks",
            ],
          },
          {
            tag: "Web & App Development",
            title: "Corporate web, e‑commerce & mobile",
            desc:
              "Fast, secure and conversion‑focused sites—from landings to catalogues and stores. Mobile apps when the use‑case requires it.",
            bullets: [
              "Frontend: Next.js (static export), Tailwind, TypeScript",
              "E‑commerce: PrestaShop, Shopify or headless custom",
              "Mobile apps: React Native / Flutter, iOS/Android publishing",
              "UX/UI and user‑centred prototyping",
            ],
          },
          {
            tag: "Marketing & Comms",
            title: "SEO/SEM, content & social",
            desc:
              "Creative, measurable strategies to attract customers and strengthen your brand (ES/EN).",
            bullets: [
              "Technical SEO, on‑page and schema (ES/EN with hreflang)",
              "SEM/ADS and multi‑channel campaigns",
              "Social management: content, community & influencers",
              "Branding: identity, online/offline assets",
            ],
          },
          {
            tag: "Audiovisual",
            title: "Photo & Video",
            desc:
              "Production and editing for landings, ads and social: spots, reels and corporate videos.",
            bullets: ["Pre‑production/script", "Filming & editing", "Assets for paid/social"],
          },
          {
            tag: "Infrastructure & Support",
            title: "Servers, databases & maintenance",
            desc:
              "We handle the tech foundation so your business runs without interruptions.",
            bullets: [
              "VPS & networks: administration, security and backups",
              "Databases: creation, maintenance and optimization",
              "Advanced technical integrations and monitoring",
              "Support & incident management with SLA",
            ],
          },
        ],
      },
      offerings: {
        title: "Typical deliverables",
        items: [
          { title: "Process & automation map", desc: "Flow diagrams with tools, triggers and SLAs." },
          { title: "Technical architecture", desc: "Infra diagram (VPS, CDN, DB, backups, monitoring)." },
          { title: "Brand & components guide", desc: "Design tokens, type and Tailwind UI library." },
          { title: "Analytics kit", desc: "KPIs, dashboards and key business events." },
        ],
      },
      process: {
        title: "How we work",
        steps: [
          { title: "1) Template audit", desc: "Inventory of CSS/JS and reusable parts." },
          { title: "2) Layout + i18n", desc: "Next base + next-intl with /es and /en." },
          { title: "3) Section-by-section", desc: "Port template sections to components." },
          { title: "4) Forms & Odoo", desc: "Lead routing, validation and GDPR." },
          { title: "5) SEO & Performance", desc: "hreflang, sitemap, Vitals and a11y." },
          { title: "6) CI/CD & Deploy", desc: "next export ➜ rsync (front) / Passenger (API)." },
        ],
      },
      pricing: {
        title: "Indicative plans",
        note: "Base pricing. We fine-tune per scope/volume.",
        cards: [
          {
            name: "Landing Starter",
            price: "€690",
            period: "one-off",
            features: ["1 page (ES/EN)", "From template", "Basic form to Odoo"],
          },
          {
            name: "Web Pro",
            price: "€1,490",
            period: "one-off",
            features: [
              "Up to 5 pages (ES/EN)",
              "Basic blog + on-page SEO",
              "Advanced form + validation",
            ],
            highlight: true,
          },
          {
            name: "Growth",
            price: "from €390",
            period: "per month",
            features: ["Maintenance + content", "Social/ads mgmt", "Monthly reporting"],
          },
        ],
        disclaimer: "* VAT and third-party costs (domains, ads, etc.) not included.",
      },
      faqs: {
        title: "FAQs",
        items: [
          { q: "Do you ship multilingual from day one?", a: "Yes, /es and /en via next-intl and hreflang." },
          { q: "How do leads go into Odoo?", a: "Using the NestJS API /odoo/leads with company_id=4 and team routing." },
          { q: "What hosting do you use?", a: "Ubuntu 22.04 VPS + Plesk; rsync deploys and Passenger for the API." },
        ],
      },
      cta: {
        title: "Ready to start?",
        desc: "Tell us about your project and we'll propose a phased plan.",
        primary: "Request a proposal",
        secondary: "Contact page",
      },
    },
  },
} as const;

type Locale = keyof typeof DICT;

function getLocaleFromPath(pathname: string): Locale {
  // Expect routes like /en/services or /es/services; fallback to 'es'.
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/es")) return "es";
  return "es";
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium border-neutral-300 bg-white/60 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-200">
      {children}
    </span>
  );
}

function Card({
  title,
  desc,
  tag,
  bullets,
}: {
  title: string;
  desc: string;
  tag?: string;
  bullets?: readonly string[];
}) {
  return (
    <div className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      {tag && (
        <div className="mb-2 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">{tag}</div>
      )}
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">{title}</h3>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">{desc}</p>
      {bullets && bullets.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-200 list-disc pl-5">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PriceCard({
  name,
  price,
  period,
  features,
  highlight,
}: {
  name: string;
  price: string;
  period: string;
  features: readonly string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "rounded-2xl border p-6 shadow-sm bg-white dark:bg-neutral-900 " +
        (highlight
          ? "border-fuchsia-300 ring-2 ring-fuchsia-300/50 dark:border-fuchsia-600 dark:ring-fuchsia-600/40"
          : "border-neutral-200 dark:border-neutral-800")
      }
    >
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{name}</h3>
      <div className="mt-4 text-3xl font-bold text-neutral-900 dark:text-neutral-50">{price}</div>
      <div className="text-sm text-neutral-500 dark:text-neutral-400">{period}</div>
      <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-200 list-disc pl-5">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <div className="mt-6">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700"
        >
          Contactar
        </Link>
      </div>
    </div>
  );
}

export default function Page() {
  // We need the pathname to infer the locale (simple approach until next-intl is wired here)
  const pathname = typeof window === "undefined" ? "" : window.location.pathname;
  const locale: Locale = pathname ? getLocaleFromPath(pathname) : "es";
  const t = DICT[locale];

  if (!t) return notFound();

  const S = t.sections;

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Hero */}
      <section className="relative overflow-hidden pt-10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mb-4 flex gap-2"><Badge>{t.heroBadge}</Badge></div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            {t.heroTitle}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-600 dark:text-neutral-300">
            {t.heroSub}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 dark:focus:ring-fuchsia-700"
            >
              {t.ctaPrimary}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative border-t border-neutral-200 py-12 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold sm:text-3xl">{S.services.title}</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">{S.services.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {S.services.items.map((it, i) => (
              <Card key={i} title={it.title} desc={it.desc} tag={it.tag} bullets={it.bullets} />
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="relative border-t border-neutral-200 py-12 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold sm:text-3xl">{S.offerings.title}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {S.offerings.items.map((it, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{it.title}</div>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative border-t border-neutral-200 py-12 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold sm:text-3xl">{S.process.title}</h2>
          <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {S.process.steps.map((s, i) => (
              <li key={i} className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">{s.title}</div>
                <div className="text-neutral-600 dark:text-neutral-300">{s.desc}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative border-t border-neutral-200 py-12 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold sm:text-3xl">{S.pricing.title}</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">{S.pricing.note}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {S.pricing.cards.map((c, i) => (
              <PriceCard
                key={i}
                name={c.name}
                price={c.price}
                period={c.period}
                features={c.features}
                highlight={Boolean((c as { highlight?: boolean }).highlight)}
              />
            ))}
          </div>
          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">{S.pricing.disclaimer}</p>
        </div>
      </section>

      {/* FAQs using native <details> for zero-JS accordions */}
      <section className="relative border-t border-neutral-200 py-12 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold sm:text-3xl">{S.faqs.title}</h2>
          <div className="mt-6 space-y-3">
            {S.faqs.items.map((f, i) => (
              <details key={i} className="rounded-xl border border-neutral-200 bg-white p-5 open:shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <summary className="cursor-pointer list-none font-medium text-neutral-900 dark:text-neutral-50">{f.q}</summary>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative border-t border-neutral-200 py-16 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{S.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-neutral-600 dark:text-neutral-300">{S.cta.desc}</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 dark:focus:ring-fuchsia-700">
              {S.cta.primary}
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800">
              {S.cta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}