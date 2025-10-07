export function dispatchAnimationsRefresh(detail?: {source?: string}) {
  if (typeof window === 'undefined') return;
  // Usamos CustomEvent por si algún día quieres pasar contexto
  const ev = new CustomEvent('animations:refresh', {detail});
  window.dispatchEvent(ev);
}