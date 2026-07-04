import { useEffect, useState } from "react";

// Matches Tailwind's default `sm` breakpoint (640px) so this stays in sync
// with the max-sm:* utility classes already used elsewhere in the CSS.
const MOBILE_BREAKPOINT = 640;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.innerWidth < MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handleChange = (e) => setIsMobile(e.matches);

    handleChange(mql);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
};

export default useIsMobile;
