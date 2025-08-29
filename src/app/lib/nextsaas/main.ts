// src/lib/nextsaas/main.ts
// Importa sólo lo necesario para que el header y el scroll funcionen.
// Puedes ir activando el resto poco a poco.

// --- Animations esenciales ---
import './animation/header'
import './animation/accordion'
import './animation/modal'
import './animation/sidebar'
import './animation/tab'
import './animation/tab-filter'
// import './animation/slider'         // actívalo si usas sliders ya
// import './animation/swiper'         // requiere CSS/JS de Swiper bien puestos
// import './animation/svg-draw'       // si usas animación de SVG
// import './animation/marquee'        // si usas el marquee
// import './animation/gradient-path'  // si usas gradientes animados

// --- Common / helpers ---
import './common/common'
import './common/reveal-elements'
import './common/smooth-scrolling'
import './common/progress'
import './common/parallax-effect'
import './common/price-switcher'

// --- Utils ---
import './utils/counter'
import './utils/theme-switcher'
// import './utils/leaflet'            // ⚠️ actívalo solo cuando estén los assets de Leaflet en /public