/* =========================
 Common animation utility across the site (TypeScript + GSAP)
=========================== */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dividerExpand } from "../utils/divider-expand";



// Tipado mínimo para SplitText sin usar `any`
type SplitTextResult = {
  chars?: HTMLElement[];
  words?: HTMLElement[];
  lines?: HTMLElement[];
  revert?: () => void;
};

type SplitTextCreate = (
  target: string | Element | Element[],
  vars?: { type?: string }
) => SplitTextResult;

type SplitTextPlugin = {
  create: SplitTextCreate;
  register?: () => void;
};

// Si SplitText está disponible en el scope global del bundle GSAP
declare const SplitText: SplitTextPlugin;

gsap.registerPlugin(ScrollTrigger);

type Cleanup = () => void;

export function initCommonAnimations(): Cleanup {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }

  const divider = document.querySelector<HTMLElement>(".divider");
  const footerDivider = document.querySelector<HTMLElement>(".footer-divider");
  const progressContainer = document.querySelector<HTMLElement>(
    ".progress-container"
  );
  const progressLine = document.querySelectorAll<HTMLElement>(".progress-line");
  const scrollExpand = document.querySelector<HTMLElement>(".scroll-expand");
  const stepLine = document.querySelectorAll<HTMLElement>(".step-line");
  const splitTextTeamTitle =
    document.querySelector<HTMLElement>(".split-text-team-title");
  const heroPerspective =
    document.querySelector<HTMLElement>(".hero-perspective");
  const heroLines =
    document.querySelectorAll<HTMLElement>("[data-hero-line]");

  if (divider) {
    dividerExpand(divider);
  }
  if (footerDivider) {
    dividerExpand(footerDivider);
  }
  if (progressLine.length > 0 && progressContainer) {
    gsap.set(progressLine, { width: "0%" });

    const progressTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: progressContainer,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    progressLine.forEach((line, index) => {
      progressTimeline.to(
        line,
        {
          width: "100%",
          duration: 2,
          ease: "power2.inOut",
        },
        index * 2
      );
    });
  }
  if (scrollExpand) {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      gsap.set(scrollExpand, { minWidth: "auto" });
    } else {
      gsap.set(scrollExpand, { minWidth: "500px" });

      ScrollTrigger.create({
        trigger: scrollExpand,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
          gsap.to(scrollExpand, {
            minWidth: "950px",
            duration: 0.5,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.to(scrollExpand, {
            minWidth: "950px",
            duration: 0.5,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(scrollExpand, {
            minWidth: "500px",
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    }
  }
  if (stepLine.length > 0) {
    gsap.set(stepLine, { height: "0px" });

    stepLine.forEach((line, index) => {
      gsap.to(line, {
        height: "380px",
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: line,
          start: "top 75%",
          end: "top 15%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.delayedCall(index * 0.15, () => {
              gsap.to(line, {
                height: "380px",
                duration: 1.5,
                ease: "power3.out",
              });
            });
          },
        },
      });
    });
  }
  if (splitTextTeamTitle && typeof SplitText !== "undefined") {
    gsap.registerPlugin(SplitText);
    const split = SplitText.create(".split-text-team-title", { type: "chars" });
    const chars = split.chars ?? []; // asegura un array, evita que TS se queje

    gsap.from(chars, {
      scrollTrigger: {
        trigger: splitTextTeamTitle,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
      opacity: 0.1,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });
  }
  if (heroPerspective) {
    gsap.set(heroPerspective, {
      opacity: 0,
      filter: "blur(20px)",
      transform: "perspective(1200px) scale(0.896871) rotateX(14.4381deg)",
    });

    ScrollTrigger.create({
      trigger: heroPerspective,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(heroPerspective, {
          opacity: 1,
          filter: "blur(0px)",
          transform: "perspective(1200px) scale(1) rotateX(0deg)",
          duration: 0.8,
          delay: 0.7,
          ease: "power2.out",
        });
      },
    });
  }
  if (heroLines.length > 0) {
    heroLines.forEach((line) => {
      gsap.to(line, {
        height: "100%",
        duration: 0.8,
        delay: 0.7,
        ease: "power2.out",
      });
    });
  }

  // Retornamos un cleanup sencillo (si quisieras hacer ScrollTrigger.killAll())
  return () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}