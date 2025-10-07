// src/lib/animations/tab-filter.ts
type Cleanup = () => void;

type Btn = HTMLButtonElement;
type Article = HTMLElement;

/** Tipos mínimos para GSAP (evita `any`) */
type GsapTweenLike = {
  eventCallback: (event: 'onComplete', cb: () => void) => void;
};

type GsapLike = {
  to: (
    target: Element,
    vars: Record<string, unknown>
  ) => GsapTweenLike;
};

function getArticleCategory(article: Article): string {
  const badge = article.querySelector<HTMLElement>('.badge');
  if (!badge) return '';
  return (badge.textContent || '').trim().toLowerCase();
}

function getFilterCategories(buttons: NodeListOf<Btn>): string[] {
  return Array.from(buttons).map((btn) => {
    const text = (btn.textContent || '').trim().toLowerCase();
    return text === 'ai software' ? 'ai software' : text;
  });
}

function updateButtonStates(buttons: NodeListOf<Btn>, activeIndex: number) {
  buttons.forEach((btn, index) => {
    const isActive = index === activeIndex;
    btn.setAttribute('data-state', isActive ? 'selected' : '');
    btn.setAttribute('aria-selected', String(isActive));
    btn.setAttribute('tabindex', isActive ? '0' : '-1');
    btn.classList.toggle('filter-active', isActive);
  });
}

function updateMobileButtonStates(buttons: NodeListOf<Btn>, activeIndex: number) {
  buttons.forEach((btn, index) => {
    const isActive = index === activeIndex;
    btn.classList.toggle('mobile-filter-active', isActive);
    // estilos inline como en el JS original
    (btn.style as CSSStyleDeclaration).backgroundColor = isActive ? '#864ffe' : '';
    (btn.style as CSSStyleDeclaration).color = isActive ? 'white' : '';
    (btn.style as CSSStyleDeclaration).borderColor = isActive ? '#5a19be' : '';
    (btn.style as CSSStyleDeclaration).transform = isActive ? 'scale(1.05)' : '';
    btn.setAttribute('aria-selected', String(isActive));
    btn.setAttribute('tabindex', isActive ? '0' : '-1');
  });
}

function updateActiveTabBar(activeTabBar: HTMLElement | null, activeButton: HTMLElement | null) {
  if (!activeTabBar || !activeButton) return;
  const left = activeButton.offsetLeft - activeTabBar.offsetLeft;
  const width = activeButton.offsetWidth;
  activeTabBar.style.setProperty('--_left', `${left}px`);
  activeTabBar.style.setProperty('--_width', `${width}px`);
}

function filterArticles(
  articles: NodeListOf<Article>,
  filterCategory: string
): { filtered: Article[]; hidden: Article[] } {
  const filtered: Article[] = [];
  const hidden: Article[] = [];
  articles.forEach((article) => {
    const articleCategory = getArticleCategory(article);
    const shouldShow =
      filterCategory === 'all' ||
      articleCategory === filterCategory ||
      (filterCategory === 'ai software' && articleCategory === 'ai software');

    (shouldShow ? filtered : hidden).push(article);
  });
  return { filtered, hidden };
}

async function animateFilter(filtered: Article[], hidden: Article[]) {
  const allArticles = [...filtered, ...hidden];
  const allContainers = allArticles
    .map((article) => article.closest<HTMLElement>('.col-span-12'))
    .filter((x): x is HTMLElement => !!x);

  // ⬇️ Antes: (globalThis as any).gsap  →  Ahora: tipado mínimo sin `any`
  const maybeGsap = (globalThis as { gsap?: GsapLike }).gsap;
  const canAnimate = !!maybeGsap && typeof maybeGsap.to === 'function';

  if (!canAnimate) {
    // Fallback sin GSAP
    hidden.forEach((article) => {
      const container = article.closest<HTMLElement>('.col-span-12');
      if (container) {
        container.style.display = 'none';
        container.setAttribute('aria-hidden', 'true');
      }
    });
    filtered.forEach((article) => {
      const container = article.closest<HTMLElement>('.col-span-12');
      if (container) {
        container.style.display = 'block';
        container.setAttribute('aria-hidden', 'false');
        container.style.opacity = '1';
        container.style.transform = 'none';
        container.style.filter = 'none';
      }
    });
    return;
  }

  // Fade out
  const fadeOutTweens: GsapTweenLike[] = allContainers.map((container) =>
    maybeGsap.to(container, {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(4px)',
      duration: 0.3,
      ease: 'power2.inOut'
    })
  );

  // Esperar a todos
  await Promise.all(
    fadeOutTweens.map(
      (t) =>
        new Promise<void>((resolve) => {
          t.eventCallback('onComplete', resolve);
        })
    )
  );

  // Ocultar los no coincidentes
  hidden.forEach((article) => {
    const container = article.closest<HTMLElement>('.col-span-12');
    if (container) {
      container.style.display = 'none';
      container.setAttribute('aria-hidden', 'true');
    }
  });

  // Mostrar los filtrados (reseteando estilos para animación)
  const filteredContainers = filtered
    .map((article) => article.closest<HTMLElement>('.col-span-12'))
    .filter((x): x is HTMLElement => !!x);

  filteredContainers.forEach((container) => {
    container.style.display = 'block';
    container.setAttribute('aria-hidden', 'false');
    container.style.opacity = '0';
    container.style.transform = 'scale(0.95)';
    container.style.filter = 'blur(4px)';
  });

  // Fade in escalonado
  const fadeInTweens: GsapTweenLike[] = filteredContainers.map((container, index) =>
    maybeGsap.to(container, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      delay: index * 0.1,
      ease: 'power2.out'
    })
  );

  await Promise.all(
    fadeInTweens.map(
      (t) =>
        new Promise<void>((resolve) => {
          t.eventCallback('onComplete', resolve);
        })
    )
  );
}

export function initTabFilter(): Cleanup {
  if (typeof window === 'undefined') return () => {};

  const tabBarBtns = document.querySelectorAll<Btn>('.tab-bar button');
  const activeTabBar = document.querySelector<HTMLElement>('.active-tab-bar');
  const mobileTabBtns = document.querySelectorAll<Btn>('.flex.items-center.flex-wrap.md\\:hidden button');
  const blogArticles = document.querySelectorAll<Article>('article');

  if (!blogArticles.length || (!tabBarBtns.length && !mobileTabBtns.length)) {
    return () => {};
  }

  // Estado
  let currentIndex = 0;
  // ❌ currentFilter no se usa → lo eliminamos para evitar el warning
  // let currentFilter = 'all';

  const listeners: Array<() => void> = [];
  let styleNode: HTMLStyleElement | null = null;

  async function applyFilter(articles: NodeListOf<Article>, filterCategory: string) {
    const { filtered, hidden } = filterArticles(articles, filterCategory);
    await animateFilter(filtered, hidden);

    const filterEvent = new CustomEvent('blogFiltered', {
      detail: {
        category: filterCategory,
        filteredCount: filtered.length,
        totalCount: articles.length
      }
    });
    document.dispatchEvent(filterEvent);
  }

  async function switchToFilter(targetIndex: number, buttons: NodeListOf<Btn>, articles: NodeListOf<Article>) {
    if (targetIndex < 0 || targetIndex >= buttons.length) return;

    const categories = getFilterCategories(buttons);
    const targetCategory = categories[targetIndex];

    currentIndex = targetIndex;
    // currentFilter = targetCategory; // ← Eliminado: no se usa

    // Desktop vs Mobile
    if (buttons[0].closest('.tab-bar')) {
      updateButtonStates(buttons, targetIndex);
      updateActiveTabBar(activeTabBar, buttons[targetIndex]);
    } else {
      updateMobileButtonStates(buttons, targetIndex);
    }

    await applyFilter(articles, targetCategory);
  }

  function setupAccessibility(buttons: NodeListOf<Btn>, idPrefix = 'filter') {
    buttons.forEach((btn, index) => {
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-controls', `${idPrefix}-${index}`);
      btn.setAttribute('id', `${idPrefix}-${index}`);
    });
  }

  // Desktop
  if (tabBarBtns.length > 0) {
    setupAccessibility(tabBarBtns, 'filter');

    tabBarBtns.forEach((btn, index) => {
      const onClick = (e: Event) => {
        e.preventDefault();
        void switchToFilter(index, tabBarBtns, blogArticles);
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          void switchToFilter(index, tabBarBtns, blogArticles);
        }
      };
      btn.addEventListener('click', onClick);
      btn.addEventListener('keydown', onKey);
      listeners.push(() => {
        btn.removeEventListener('click', onClick);
        btn.removeEventListener('keydown', onKey);
      });
    });

    // Estado inicial
    updateButtonStates(tabBarBtns, 0);
    updateActiveTabBar(activeTabBar, tabBarBtns[0]);
    void applyFilter(blogArticles, getFilterCategories(tabBarBtns)[0]);
  }

  // Mobile
  if (mobileTabBtns.length > 0) {
    setupAccessibility(mobileTabBtns, 'mobile-filter');

    mobileTabBtns.forEach((btn, index) => {
      const onClick = (e: Event) => {
        e.preventDefault();
        void switchToFilter(index, mobileTabBtns, blogArticles);
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          void switchToFilter(index, mobileTabBtns, blogArticles);
        }
      };
      btn.addEventListener('click', onClick);
      btn.addEventListener('keydown', onKey);
      listeners.push(() => {
        btn.removeEventListener('click', onClick);
        btn.removeEventListener('keydown', onKey);
      });
    });

    updateMobileButtonStates(mobileTabBtns, 0);
    void applyFilter(blogArticles, getFilterCategories(mobileTabBtns)[0]);
  }

  // Resize (reposiciona el indicador activo)
  if (activeTabBar && tabBarBtns.length > 0) {
    const handleResize = () => {
      if (tabBarBtns[currentIndex]) {
        updateActiveTabBar(activeTabBar, tabBarBtns[currentIndex]);
      }
    };
    window.addEventListener('resize', handleResize);
    listeners.push(() => window.removeEventListener('resize', handleResize));
  }

  // Inyectar CSS (una sola vez por instancia)
  const filterCSS = `
    .filter-active { transition: all 0.3s ease; }
    .grid { position: relative; }
    .grid > div { will-change: opacity, transform, filter; }
    .grid > div[aria-hidden="true"] {
      opacity: 0; transform: scale(0.95); filter: blur(4px); pointer-events: none;
    }
    .grid > div[aria-hidden="false"] {
      opacity: 1; transform: scale(1); filter: blur(0px); pointer-events: auto;
    }
    .tab-bar button { transition: color 0.3s ease, background-color 0.3s ease; }
    .flex.items-center.flex-wrap.md\\:hidden button {
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative; overflow: hidden;
    }
    .flex.items-center.flex-wrap.md\\:hidden button:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .grid > div article { transform-origin: center; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
    @media (prefers-reduced-motion: reduce) {
      .grid > div, .flex.items-center.flex-wrap.md\\:hidden button {
        transition: none; transform: none !important;
      }
    }
  `;
  if (!document.querySelector('#tab-filter-styles')) {
    styleNode = document.createElement('style');
    styleNode.id = 'tab-filter-styles';
    styleNode.textContent = filterCSS;
    document.head.appendChild(styleNode);
  }

  // Cleanup
  return () => {
    listeners.forEach((off) => {
      try { off(); } catch {}
    });
    if (styleNode?.parentNode) styleNode.parentNode.removeChild(styleNode);
  };
}