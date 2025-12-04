¡Claro\! Aquí tienes la documentación formateada en **Markdown** y organizada por módulos.

# Documentación de Módulos Comunes

-----

## 🖱️ `smooth-scrolling.ts` (Scroll Suave)

| Metadato | Descripción |
| :--- | :--- |
| 📦 **Archivo** | `src/lib/common/smooth-scrolling.ts` |
| 🎯 **Propósito** | Añade **scroll suave** para enlaces internos (`.lenis-scroll-to`) con **Lenis** (npm) o fallback nativo. Si hay GSAP + ScrollTrigger, sincroniza la animación. |

### 🔧 Dependencias

  * **Recomendado**: `npm i lenis gsap`
  * **(Opcional)** `gsap/ScrollTrigger` para sincronizar.

### 🧠 Cómo Funciona

1.  Detecta los enlaces con la clase `.lenis-scroll-to` (por ejemplo `<a href="#seccion" class="lenis-scroll-to">`).
2.  En **desktop**, usa **Lenis**; en **mobile**, usa `scrollIntoView`.
3.  Compensa `offset` de **$-100\text{px}$** (útil para *headers* fijos).

### 🚀 Inicialización

Se invoca desde tu barril `src/lib/common/index.ts`:

```typescript
try {
  const {initSmoothScrolling} = await import('./smooth-scrolling')
  cleanups.push(initSmoothScrolling())
} catch (e) {
  console.warn('[common] smooth-scrolling not loaded:', e)
}
// initSmoothScrolling devuelve un cleanup que el barril gestiona.
```

### 🧩 Uso en HTML

```html
<a href="#benefits" class="lenis-scroll-to btn btn-primary">Ver beneficios</a>

<section id="benefits" class="pt-24">
  </section>
```

### ⚙️ Opciones

  * No hay atributos de configuración. Se puede proporcionar una versión parametrizable si se necesita personalizar *offset* o *duration*.

### 🛠️ Debug

  * Si al pinchar no hace nada, revisa que el **`href` apunte a un `id` existente** (`#id`).
  * En **mobile**, el fallback usa `scrollIntoView`; añade `padding-top` si tienes *header* fijo.

-----

## 📈 `progress.ts` (Barra de Progreso)

| Metadato | Descripción |
| :--- | :--- |
| 📦 **Archivo** | `src/lib/common/progress.ts` |
| 🎯 **Propósito** | Muestra una **barra de progreso de lectura**: del documento completo o de un contenedor concreto. |

### 🧠 Cómo Funciona

  * Busca un elemento con `[data-scroll-progress]` y ajusta su **`width` en %**.
  * Accesible con **`role="progressbar"`** + **`aria-valuenow`**.

### 🚀 Inicialización

```typescript
try {
  const {initProgress} = await import('./progress');
  cleanups.push(initProgress());
} catch (e) {
  console.warn('[common] progress not loaded:', e);
}
```

### 🧩 Uso en HTML

#### Documento completo

```html
<div
  data-scroll-progress
  class="fixed left-0 top-0 h-1 bg-primary-500 z-[9999] transition-[width] duration-150 ease-out"
/>
```

#### Contenedor específico

```html
<main id="page-content" class="relative">
  <div
    data-scroll-progress
    data-progress-target="#page-content"
    class="sticky top-0 left-0 h-1 bg-primary-500 w-0 z-50"
  ></div>

  </main>
```

### 🛠️ Debug

  * Si no avanza, verifica que existe `[data-scroll-progress]`.
  * En modo contenedor, `data-progress-target` debe ser un **selector válido y único**.

-----

## ✨ `parallax-effect.ts` (Efecto Parallax por Ratón)

| Metadato | Descripción |
| :--- | :--- |
| 📦 **Archivo** | `src/lib/common/parallax-effect.ts` |
| 🎯 **Propósito** | **Parallax por movimiento del ratón** para uno o varios “escenarios”. |

### 🧠 Cómo Funciona

  * Busca escenas: `#scene` (legacy) o cualquier `[data-parallax-scene]`.
  * Dentro, todos los hijos con `.parallax-effect` se mueven según:
      * `data-parallax-value` (profundidad, por defecto $1$)
      * `data-parallax-x` y `data-parallax-y` (direcciones, por defecto $1$)
  * Compatibilidad con typos del *theme*: `data-data-parallax-x|y`.

### 🚀 Inicialización

```typescript
try {
  const {initParallaxEffects} = await import('./parallax-effect')
  cleanups.push(initParallaxEffects())
} catch (e) {
  console.warn('[common] parallax-effect not loaded:', e)
}
```

### 🧩 Uso en HTML

#### Escena única (legacy)

```html
<section id="scene">
  <img class="parallax-effect" src="/images/hero-asset-1.svg" data-parallax-value="1.2" alt="">
  <img class="parallax-effect" src="/images/hero-asset-2.png" data-parallax-value="0.8" data-parallax-x="-1" alt="">
</section>
```

#### Múltiples escenas

```html
<section data-parallax-scene>
  <div class="parallax-effect" data-parallax-value="1.5" data-parallax-x="1" data-parallax-y="0.5">
    </div>
</section>

<section data-parallax-scene>
  <div class="parallax-effect" data-parallax-value="0.7" data-parallax-x="-1">
    </div>
</section>
```

### 🛠️ Tips

  * No uses elementos pesados (SVG enormes) sin `will-change: transform`.
  * Evita usar esta animación en **mobile** para no molestar al *scroll*/tacto.

-----

## 💰 `price-switcher.ts` (Alternador de Precios)

| Metadato | Descripción |
| :--- | :--- |
| 📦 **Archivo** | `src/lib/common/price-switcher.ts` |
| 🎯 **Propósito** | Alterna la tarifa **mensual/anual** mostrando/ocultando bloques. |

### 🧠 Cómo Funciona

  * Necesita un **`checkbox` con `id="priceCheck"`**.
  * Busca pares `.price-month` / `.price-year` y alterna la clase `hidden`.

### 🚀 Inicialización

```typescript
try {
  const { initPriceSwitcher } = await import("./price-switcher");
  cleanups.push(initPriceSwitcher());
} catch (e) {
  console.warn("[common] price-switcher not loaded:", e);
}
```

### 🧩 Uso en HTML

```html
<label for="priceCheck" class="flex items-center gap-2 cursor-pointer">
  <span>Mensual</span>
  <input id="priceCheck" type="checkbox" class="hidden" />
  <span class="switch bg-gray-300 dark:bg-gray-600 w-12 h-6 rounded-full relative">
    <span class="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></span>
  </span>
  <span>Anual</span>
</label>

<div class="mt-4">
  <p class="price-month text-xl font-bold">$10 / mes</p>
  <p class="price-year text-xl font-bold hidden">$100 / año</p>
</div>
```

-----

## 🎨 `common.ts` (Animaciones Generales)

| Metadato | Descripción |
| :--- | :--- |
| 📦 **Archivo** | `src/lib/common/common.ts` |
| 🎯 **Propósito** | Conjunto de **animaciones comunes** del *theme* (GSAP/ScrollTrigger): `dividerExpand`, líneas de progreso seccional, `scrollExpand`, `stepLine`, `SplitText` (opcional), `heroPerspective`, `heroLines`. |

### 🔧 Dependencias

  * `gsap` y `gsap/ScrollTrigger`
  * `dividerExpand` (propia) en `src/lib/utils/divider-expand.ts`
  * **(Opcional)** `SplitText` (plugin de pago de GSAP). Si no está, se ignora.

### 🚀 Inicialización

```typescript
try {
  const { initCommonAnimations } = await import("./common");
  cleanups.push(initCommonAnimations());
} catch (e) {
  console.warn("[common] common animations not loaded:", e);
}
```

### 🧩 Uso en HTML

#### Divider

```html
<hr class="divider" />
<hr class="footer-divider" />
```

#### Progreso seccional

```html
<div class="progress-container">
  <div class="progress-line h-1 bg-primary-500 w-0"></div>
  <div class="progress-line h-1 bg-primary-500 w-0"></div>
  <div class="progress-line h-1 bg-primary-500 w-0"></div>
</div>
```

#### Scroll expand

```html
<div class="scroll-expand min-w-[500px]">
  </div>
```

#### Step lines

```html
<div class="space-y-10">
  <div class="step-line w-px bg-stroke-2"></div>
  <div class="step-line w-px bg-stroke-2"></div>
  <div class="step-line w-px bg-stroke-2"></div>
</div>
```

#### SplitText (opcional)

```html
<h2 class="split-text-team-title">Nuestro equipo</h2>
```

#### Hero perspective + líneas

```html
<section class="relative">
  <div class="hero-perspective">
    </div>

  <div class="absolute -z-0 left-1/2 -translate-x-1/2 top-5 h-full main-container flex justify-between gap-[239px]">
    <div data-hero-line class="w-px bg-gradient-to-b from-stroke-1 to-stroke-1/30 h-0"></div>
    <div data-hero-line class="w-px bg-gradient-to-b from-stroke-1 to-stroke-1/30 h-0"></div>
    <div data-hero-line class="w-px bg-gradient-to-b from-stroke-1 to-stroke-1/30 h-0"></div>
  </div>
</section>
```

### 🛠️ Notas

  * Este módulo **mata todos los ScrollTrigger en el *cleanup*** (al cambiar de ruta).
  * Se puede preparar un *scope* de ScrollTrigger por bloque si alguna animación no debe "morir".

-----

## 📚 Integración Recomendada (Barril)

Asegúrate de tener un barril `src/lib/common/index.ts` que inicialice todo una vez, en el *layout*.

### `src/lib/common/index.ts`

```typescript
export async function CommonScripts() {
  if (typeof window === 'undefined') return () => {}

  const cleanups: Array<() => void> = []

  // Inicialización de módulos...
  try {
    const {initSmoothScrolling} = await import('./smooth-scrolling')
    cleanups.push(initSmoothScrolling())
  } catch (e) { console.warn('[common] smooth-scrolling not loaded:', e) }

  try {
    const {initProgress} = await import('./progress')
    cleanups.push(initProgress())
  } catch (e) { console.warn('[common] progress not loaded:', e) }

  try {
    const {initParallaxEffects} = await import('./parallax-effect')
    cleanups.push(initParallaxEffects())
  } catch (e) { console.warn('[common] parallax-effect not loaded:', e) }

  try {
    const {initPriceSwitcher} = await import('./price-switcher')
    cleanups.push(initPriceSwitcher())
  } catch (e) { console.warn('[common] price-switcher not loaded:', e) }

  try {
    const {initCommonAnimations} = await import('./common')
    cleanups.push(initCommonAnimations())
  } catch (e) { console.warn('[common] common animations not loaded:', e) }

  // Devuelve un cleanup único
  return () => cleanups.splice(0).forEach((off) => { try { off() } catch {} })
}
```

### Uso en tu `src/app/[locale]/layout.tsx`

```typescript
'use client'
import {useEffect} from 'react'
import {CommonScripts} from '@/lib/common'

export default function LocaleLayout({children}: {children: React.ReactNode}) {
  useEffect(() => {
    let off: (() => void) | undefined
    
    // Ejecutar CommonScripts y guardar el cleanup
    CommonScripts().then((cleanup) => {
      off = cleanup
    })
    
    // Devolver la función de cleanup de useEffect
    return () => {
      if (off) {
        off()
      }
    }
  }, [])

  // ... resto del layout
}
```