import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const BootScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setVisible(false);
      onComplete?.();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete?.();
      },
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" },
    )
      .fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power1.inOut",
          transformOrigin: "left center",
        },
        "-=0.05",
      )
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.45,
        ease: "power2.inOut",
      });

    return () => tl.kill();
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div id="boot-screen" ref={overlayRef}>
      <img ref={logoRef} src="/images/logo.svg" alt="" className="invert" />

      <div className="boot-progress">
        <div ref={barRef} className="boot-progress-fill" />
      </div>
    </div>
  );
};

export default BootScreen;
