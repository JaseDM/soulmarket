type Cleanup = () => void;

export function initPriceSwitcher(): Cleanup {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const toggle = document.getElementById('priceCheck') as HTMLInputElement | null;
  // Tipado explícito de los nodos
  const monthlyPrices = Array.from(document.querySelectorAll<HTMLElement>('.price-month'));
  const yearlyPrices = Array.from(document.querySelectorAll<HTMLElement>('.price-year'));

  if (!toggle) return () => {};

  const updatePrices = () => {
    // Si no hay pares suficientes, no hacemos nada
    if (monthlyPrices.length === 0 || yearlyPrices.length === 0) return;

    monthlyPrices.forEach((monthly, i) => {
      const yearly = yearlyPrices[i];
      if (!yearly) return; // protege por si hay desajuste de longitudes

      if (toggle.checked) {
        // Mostrar precios anuales
        monthly.classList.add('hidden');
        yearly.classList.remove('hidden');
      } else {
        // Mostrar precios mensuales
        monthly.classList.remove('hidden');
        yearly.classList.add('hidden');
      }
    });
  };

  // Mejor escuchar 'change' en checkbox/toggle
  const onChange = () => updatePrices();
  toggle.addEventListener('change', onChange);

  // Estado inicial
  updatePrices();

  // Cleanup al salir de la página (App Router)
  return () => {
    toggle.removeEventListener('change', onChange);
  };
}