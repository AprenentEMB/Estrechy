import { useState, useEffect } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

// Mobile-first breakpoints (px)
// xs  < 480   → phone portrait
// sm  480–767 → phone landscape / small tablet
// md  768–1023 → tablet portrait
// lg  1024–1279 → tablet landscape / small desktop
// xl  ≥ 1280  → desktop

function getBreakpoint(width: number): Breakpoint {
  if (width < 480) return "xs";
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  if (width < 1280) return "lg";
  return "xl";
}

export function useBreakpoint() {
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 375,
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const breakpoint = getBreakpoint(width);

  return {
    breakpoint,
    width,
    isMobile: width < 480,
    isSmall: width >= 480 && width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    isWide: width >= 1280,
  };
}
