import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 640;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === "undefined" // if open in server
      ? false
      : window.innerWidth < MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`); // max width for mobile
    const handleChange = (e) => setIsMobile(e.matches);

    handleChange(mql);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
};

export default useIsMobile;
