# 🌍 Plantilla Base Next.js + next-intl + TailwindCSS 4

Esta plantilla es el punto de partida para proyectos futuros con **Next.js (App Router)**, **next-intl** para internacionalización y **TailwindCSS 4.x** para estilos.

Incluye:

  - 🌐 **Internacionalización** (ES/EN listos)
  - 🖼️ **Header dinámico** con navegación
  - 🌗 **Theme Toggle** (dark/light con animación GSAP)
  - 📑 **Páginas base** (`about`, `services`, `portfolio`, `contact`)
  - 🎨 **TailwindCSS 4.x** configurado

-----

## 🚀 Tecnologías principales

  - **Next.js 15+** con App Router
  - **TypeScript** por defecto
  - **TailwindCSS 4.x**
  - **next-intl** para i18n
  - **GSAP** para animaciones en el toggle

-----

## 📂 Estructura de directorios

```bash
├── public
│   ├── favicon.ico
│   ├── main-logo.svg        # Logo modo oscuro
│   ├── dark-logo.svg        # Logo modo claro
│   ├── logo.svg             # Logo móvil claro
│   ├── logo-dark.svg        # Logo móvil oscuro
│   └── ...otros recursos (imágenes, vídeos, vendor, etc.)
├── src
│   ├── app
│   │   ├── [locale]         # Rutas internacionalizadas
│   │   │   ├── layout.tsx   # Layout con next-intl provider
│   │   │   ├── page.tsx     # HomePage
│   │   │   ├── about/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── portfolio/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── globals.css      # Estilos globales
│   │   └── favicon.ico
│   ├── components
│   │   ├── Header.tsx       # Header con navegación i18n
│   │   ├── ThemeToggle.tsx  # Toggle dark/light con GSAP
│   │   └── LocaleSwitch.tsx # Selector de idioma minimalista
│   ├── i18n
│   │   └── navigation.ts    # Rutas internacionalizadas
│   └── locales
│       ├── es/messages.json # Traducciones español
│       └── en/messages.json # Traducciones inglés
└── README.md
```

-----

## 🌍 Internacionalización con next-intl

  - Se usa `NextIntlClientProvider` en `layout.tsx` para envolver la app.
  - Archivos de traducción en `src/locales/{lang}/messages.json`.
  - Ejemplo de uso en `HomePage`:

<!-- end list -->

```javascript
const t = useTranslations('HomePage')

<h1>{t('title')}</h1>
<p>{t('description')}</p>
```

### Ejemplo de traducciones

**`src/locales/es/messages.json`:**

```json
{
  "HomePage": {
    "title": "¡Hola mundo!",
    "description": "Cambia entre tema claro y oscuro con el botón de la esquina inferior derecha.",
    "cta": "Explorar"
  },
  "Header": {
    "home": "Inicio",
    "about": "Sobre nosotros",
    "services": "Servicios",
    "portfolio": "Portfolio",
    "contact": "Contacto",
    "cta": "Empezar",
    "openMenu": "Abrir menú",
    "closeMenu": "Cerrar menú",
    "changeLanguage": "Cambiar idioma",
    "toggleTheme": "Cambiar tema"
  }
}
```

**`src/locales/en/messages.json`:**

```json
{
  "HomePage": {
    "title": "Hello world!",
    "description": "Switch between light and dark mode with the button at the bottom right corner.",
    "cta": "Explore"
  },
  "Header": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "portfolio": "Portfolio",
    "contact": "Contact",
    "cta": "Get Started",
    "openMenu": "Open menu",
    "closeMenu": "Close menu",
    "changeLanguage": "Change language",
    "toggleTheme": "Toggle theme"
  }
}
```

-----

## 🖼️ Header

  - Navegación internacionalizada con `Link` de `next-intl/navigation`.
  - **Logos adaptados** según el tema:
      - Light → `dark-logo.svg`
      - Dark → `main-logo.svg`
  - Menú hamburguesa en mobile.

-----

## 🌗 Theme Toggle (Dark/Light)

  - Basado en **React** con **GSAP** para animaciones de entrada (derecha → izquierda).
  - Estado persistido en `localStorage`.
  - Comportamiento:
      - Light → 🌙 Luna blanca sobre fondo negro
      - Dark → ☀️ Sol negro sobre fondo blanco

-----

## 📑 Páginas incluidas

  - `/about` → Sobre nosotros
  - `/services` → Servicios
  - `/portfolio` → Portfolio
  - `/contact` → Contacto
  - `/` (Home) → Con bloques de prueba para verificar cambios de tema

-----

## 🎨 TailwindCSS 4.x

  - Estilos globales en `globals.css`.
  - Configuración recomendada con `@theme`.
  - **No se usa** `tailwind.config.js` (deprecated en v4).

-----

## 🔮 Próximos pasos recomendados

  - **Middleware** para detección automática de idioma.
  - Animaciones adicionales en Header (sticky, scroll).
  - Extender `LocaleSwitch` con banderas/íconos.
  - Crear componentes base reutilizables (botones, cards, secciones).

-----

## ✅ Estado actual

Esta plantilla está lista para ser reutilizada en proyectos futuros. Incluye:

  - **Routing internacionalizado**
  - **Header dinámico** con logos adaptables
  - **Toggle dark/light animado**
  - **Páginas base**
  - **Traducciones listas** en ES/EN