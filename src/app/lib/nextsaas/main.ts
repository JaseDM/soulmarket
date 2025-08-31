// 1) Bootstrap GSAP (global)
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
// Safe-typed attachment to globalThis / window (no `any`)
type GlobalWithGSAP = typeof globalThis & {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
};
(globalThis as GlobalWithGSAP).gsap = gsap;
(globalThis as GlobalWithGSAP).ScrollTrigger = ScrollTrigger;
if (typeof window !== 'undefined') {
  (window as unknown as GlobalWithGSAP).gsap = gsap;
  (window as unknown as GlobalWithGSAP).ScrollTrigger = ScrollTrigger;
}

// 2) Theme switcher (si usa gsap, ya lo tiene disponible)
import './utils/theme-switcher'

// 3) IMPORTA AQUÍ el common de la plantilla
import './common/common'

// 4) Resto del template
import './animation/header'
import './animation/accordion'
import './animation/modal'
import './animation/sidebar'
import './animation/tab'
import './animation/tab-filter'
import './common/reveal-elements'
import './common/smooth-scrolling'
import './utils/divider-expand'