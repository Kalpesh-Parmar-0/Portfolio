import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const BootScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef(null); // full screen ref
  const logoRef = useRef(null); // logo ref
  const barRef = useRef(null); // status bar (loading) ref

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)", // check if user has stoped animation
    ).matches;

    // don't use animation for user who has stoped animation from system
    if (prefersReducedMotion) {
      setVisible(false);
      onComplete?.();
      return;
    }

    // make timeline for gsap animation
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false); // make loading screen appear, everything else not visible
        onComplete?.();
      },
    });

    tl.fromTo(
      logoRef.current, // logo animation
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" },
    )
      .fromTo(
        barRef.current, // status bar animation
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power1.inOut",
          transformOrigin: "left center",
        },
        "-=0.05", // make bar animation appears .05 seconds start before logo animation finish
      )
      .to(overlayRef.current, {
        opacity: 0, // disappers dark screen and web content appears
        duration: 0.45,
        ease: "power2.inOut",
      });

    return () => tl.kill(); // stop animation
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
