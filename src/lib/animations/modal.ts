// src/lib/animations/modal.ts
import { gsap } from 'gsap';

export class ModalAnimation {
  private modalAction: HTMLElement | null = null;
  private modalOverlay: HTMLElement | null = null;
  private modalCloseBtn: HTMLElement | null = null;
  private modalContent: HTMLElement | null = null;
  private isModalOpen = false;

  private animationConfig = {
    open: {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out' as const,
    },
    close: {
      opacity: 0,
      y: -50,
      duration: 0.2,
      ease: 'power2.in' as const,
    },
  };

  init() {
    this.cacheElements();
    this.bindEvents();
  }

  private cacheElements() {
    this.modalAction = document.querySelector<HTMLElement>('.modal-action');
    this.modalOverlay = document.querySelector<HTMLElement>('.modal-overlay');
    this.modalCloseBtn = document.querySelector<HTMLElement>('.modal-close-btn');
    this.modalContent = document.querySelector<HTMLElement>('.modal-content');
  }

  private bindEvents() {
    this.modalAction?.addEventListener('click', () => this.openModal());
    this.modalCloseBtn?.addEventListener('click', () => this.closeModal());
    this.modalOverlay?.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.closeModal();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isModalOpen) {
        this.closeModal();
      }
    });
  }

  async closeModal() {
    if (!this.isModalOpen || !this.modalOverlay) return;

    this.isModalOpen = false;
    document.body.style.overflow = 'auto';

    try {
      if (this.modalContent) {
        await gsap.to(this.modalContent, {
          ...this.animationConfig.close,
          onComplete: () => {
            this.modalOverlay?.classList.remove('modal-open');
            this.modalOverlay?.classList.add('modal-close');
          },
        });
      } else {
        this.modalOverlay.classList.remove('modal-open');
        this.modalOverlay.classList.add('modal-close');
      }
    } catch (error) {
      console.error('Error closing modal:', error);
    }
  }

  openModal() {
    if (this.isModalOpen || !this.modalOverlay) return;

    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';

    this.modalOverlay.classList.remove('modal-close');
    this.modalOverlay.classList.add('modal-open');

    if (this.modalContent) {
      // Set initial state for opening animation
      gsap.set(this.modalContent, {
        opacity: 0,
        y: -50,
      });

      gsap.to(this.modalContent, this.animationConfig.open);
    }
  }
}

// Inicializar automáticamente en cliente
export function initModalAnimation() {
  if (typeof window === 'undefined') return;

  const modalAnimation = new ModalAnimation();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => modalAnimation.init());
  } else {
    modalAnimation.init();
  }

  return modalAnimation;
}