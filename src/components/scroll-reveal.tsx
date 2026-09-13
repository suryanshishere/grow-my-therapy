"use client";

import { useEffect } from "react";

/**
 * Reveals `[data-reveal]` content as it scrolls into view. The hiding styles only apply once
 * this runs and marks the root, so without JavaScript or with reduced motion nothing is hidden.
 */
export function ScrollReveal({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-visible", "");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    root.querySelectorAll("[data-reveal]").forEach((target) => observer.observe(target));
    root.classList.add("reveal-ready");
    return () => observer.disconnect();
  }, [rootId]);
  return null;
}
