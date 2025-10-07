
"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function HeroLinesClient() {
  useEffect(() => {
    const lines = document.querySelectorAll<HTMLElement>("[data-hero-line]");
    lines.forEach((line) => {
      gsap.to(line, { height: "100%", duration: 0.8, delay: 0.7, ease: "power2.out" });
    });
  }, []);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
          <div className="main-container h-full mx-auto flex justify-between gap-24">
            <div data-hero-line className="w-px h-0 bg-gradient-to-b from-stroke-1 to-stroke-1/30 dark:from-stroke-5 dark:to-stroke-5/30" />
            <div data-hero-line className="w-px h-0 bg-gradient-to-b from-stroke-1 to-stroke-1/30 dark:from-stroke-5 dark:to-stroke-5/30" />
            <div data-hero-line className="w-px h-0 bg-gradient-to-b from-stroke-1 to-stroke-1/30 dark:from-stroke-5 dark:to-stroke-5/30" />
            <div data-hero-line className="w-px h-0 bg-gradient-to-b from-stroke-1 to-stroke-1/30 dark:from-stroke-5 dark:to-stroke-5/30" />
            <div data-hero-line className="w-px h-0 bg-gradient-to-b from-stroke-1 to-stroke-1/30 dark:from-stroke-5 dark:to-stroke-5/30" />
            <div data-hero-line className="w-px h-0 bg-gradient-to-b from-stroke-1 to-stroke-1/30 dark:from-stroke-5 dark:to-stroke-5/30" />
          </div>
        </div>
    );
  };
