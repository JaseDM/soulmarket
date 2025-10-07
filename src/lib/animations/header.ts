/* =========================
 Header animation (TS)
=========================== */

function headerOne() {
  const header = document.querySelector<HTMLElement>('.header-one');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.style.transition = 'all 0.5s ease-in-out';
        header.classList.add('scroll-header');
      } else {
        header.classList.remove('scroll-header');
      }
    });
  }
}

function headerTwo() {
  const header = document.querySelector<HTMLElement>('.header-two');
  const headerBtn = document.querySelector<HTMLElement>('.header-btn');
  if (header && headerBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 150) {
        header.style.transition = 'all 0.5s ease-in-out';
        header.classList.add('header-two-scroll');
        headerBtn.classList.remove('btn-secondary');
        headerBtn.classList.add('btn-white');
      } else {
        header.classList.remove('header-two-scroll');
        headerBtn.classList.remove('btn-white');
        headerBtn.classList.add('btn-secondary');
      }
    });
  }
}

function headerThree() {
  const header = document.querySelector<HTMLElement>('.header-three');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.style.transition = 'all 0.5s ease-in-out';
        header.classList.add('header-three-scroll');
      } else {
        header.classList.remove('header-three-scroll');
      }
    });
  }
}

function headerFour() {
  const header = document.querySelector<HTMLElement>('.header-four');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.style.transition = 'all 0.5s ease-in-out';
        header.classList.add('header-four-scroll');
      } else {
        header.classList.remove('header-four-scroll');
      }
    });
  }
}

function headerFive() {
  const header = document.querySelector<HTMLElement>('.header-five');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 25) {
        header.style.transition = 'all 0.5s ease-in-out';
        header.classList.add('header-five-scroll');
      } else {
        header.classList.remove('header-five-scroll');
      }
    });
  }
}

function headerSix() {
  const header = document.querySelector<HTMLElement>('.header-six');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.style.transition = 'all 0.5s ease-in-out';
        header.classList.add('header-six-scroll');
      } else {
        header.classList.remove('header-six-scroll');
      }
    });
  }
}

export function initHeaderAnimations() {
  if (typeof window !== 'undefined') {
    headerOne();
    headerTwo();
    headerThree();
    headerFour();
    headerFive();
    headerSix();
  }
}