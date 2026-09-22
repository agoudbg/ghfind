"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface HorizontalFadeMetrics {
  clientWidth: number;
  direction: "ltr" | "rtl";
  paddingInlineEnd: number;
  paddingInlineStart: number;
  scrollLeft: number;
  scrollWidth: number;
}

interface HorizontalFadeVisibility {
  left: boolean;
  right: boolean;
}

const EDGE_EPSILON = 1;

function getHorizontalFadeVisibility({
  clientWidth,
  direction,
  paddingInlineEnd,
  paddingInlineStart,
  scrollLeft,
  scrollWidth,
}: HorizontalFadeMetrics): HorizontalFadeVisibility {
  const maxScroll = Math.max(0, scrollWidth - clientWidth);
  const rawDistanceFromStart = direction === "rtl" ? -scrollLeft : scrollLeft;
  const distanceFromStart = Math.min(maxScroll, Math.max(0, rawDistanceFromStart));
  const distanceFromEnd = maxScroll - distanceFromStart;
  const showStart = distanceFromStart - paddingInlineStart > EDGE_EPSILON;
  const showEnd = distanceFromEnd - paddingInlineEnd > EDGE_EPSILON;

  return direction === "rtl"
    ? { left: showEnd, right: showStart }
    : { left: showStart, right: showEnd };
}

/**
 * Shared horizontal snap-scroll strip for homepage content bands: visible
 * thin scrollbar (webkit + standard properties) and edge fades painted from
 * the theme-aware --color-background so clipped cards dissolve into the page
 * in both light and dark themes. Children must be fixed-width snap items.
 */
export function HomeSnapStrip({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fades, setFades] = useState<HorizontalFadeVisibility>({ left: false, right: false });

  useEffect(() => {
    const strip = scrollRef.current;
    if (!strip) return;

    const updateFades = () => {
      const styles = getComputedStyle(strip);
      const nextFades = getHorizontalFadeVisibility({
        clientWidth: strip.clientWidth,
        direction: styles.direction === "rtl" ? "rtl" : "ltr",
        paddingInlineEnd: Number.parseFloat(styles.paddingInlineEnd) || 0,
        paddingInlineStart: Number.parseFloat(styles.paddingInlineStart) || 0,
        scrollLeft: strip.scrollLeft,
        scrollWidth: strip.scrollWidth,
      });

      setFades((currentFades) =>
        currentFades.left === nextFades.left && currentFades.right === nextFades.right
          ? currentFades
          : nextFades,
      );
    };

    updateFades();
    strip.addEventListener("scroll", updateFades, { passive: true });
    const observer = new ResizeObserver(updateFades);
    observer.observe(strip);
    for (const child of strip.children) observer.observe(child);

    return () => {
      strip.removeEventListener("scroll", updateFades);
      observer.disconnect();
    };
  }, [children]);

  return (
    <div className="relative -mx-5 mt-5 sm:-mx-6">
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-color:var(--color-zinc-500)_transparent] [scrollbar-width:thin] sm:px-6 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-500/50 [&::-webkit-scrollbar-track]:bg-transparent"
      >
        {children}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-background to-transparent transition-opacity duration-200 motion-reduce:transition-none sm:w-6"
        style={{ opacity: fades.left ? 1 : 0 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent transition-opacity duration-200 motion-reduce:transition-none sm:w-12"
        style={{ opacity: fades.right ? 1 : 0 }}
      />
    </div>
  );
}
