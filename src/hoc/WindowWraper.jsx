import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const WindowWraper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex, isMinimized, isMaximized } = windows[windowKey];
    const ref = useRef(null);
    const draggableRef = useRef(null);
    // Separate snapshots: maximize/minimize can each be toggled independently
    // (e.g. minimizing a window that's already maximized), so they can't
    // share one ref without clobbering each other.
    const maximizeSnapshotRef = useRef(null);
    const minimizeSnapshotRef = useRef(null);

    // Open animation
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;
      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    }, [isOpen]);

    // Draggable setup
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;
      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });
      draggableRef.current = instance;

      return () => instance.kill();
    }, []);

    // Maximize / un-maximize animation
    useGSAP(() => {
      const el = ref.current;
      const instance = draggableRef.current;
      if (!el || !isOpen) return;

      if (isMaximized) {
        const rect = el.getBoundingClientRect();
        maximizeSnapshotRef.current = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          x: instance?.x ?? 0,
          y: instance?.y ?? 0,
        };

        instance?.disable();

        // Lock the element into fixed, pixel-based positioning at its
        // current on-screen spot (so switching from transform-based drag
        // positioning to fixed top/left causes no visual jump)...
        gsap.set(el, {
          position: "fixed",
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          x: 0,
          y: 0,
        });

        const navGap = 36;
        const sideGap = 12;
        const dockGap = 104;

        // ...then animate it out to fill the viewport, macOS-style.
        gsap.to(el, {
          top: navGap,
          left: sideGap,
          width: window.innerWidth - sideGap * 2,
          height: window.innerHeight - navGap - dockGap,
          borderRadius: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      } else if (maximizeSnapshotRef.current) {
        const { top, left, width, height, x, y } = maximizeSnapshotRef.current;

        gsap.to(el, {
          top,
          left,
          width,
          height,
          borderRadius: 12,
          duration: 0.35,
          ease: "power2.inOut",
          onComplete: () => {
            // Hand control back to Tailwind's absolute/top/left classes and
            // restore whatever drag offset the window had before maximizing.
            gsap.set(el, {
              clearProps: "position,top,left,width,height,borderRadius",
            });
            gsap.set(el, { x, y });
            // Only re-enable dragging if the window isn't ALSO currently
            // minimized (e.g. minimized while maximized, then un-maximized
            // via some other path) - keep it locked while hidden.
            if (!isMinimized) instance?.enable();
          },
        });
      }
    }, [isMaximized, isOpen]);

    // Minimize / restore animation (genie-to-dock effect).
    // Works from either the normal windowed state OR the maximized state -
    // minimizing doesn't require un-maximizing first.
    useGSAP(() => {
      const el = ref.current;
      const instance = draggableRef.current;
      if (!el || !isOpen) return;

      if (isMinimized) {
        const rect = el.getBoundingClientRect();
        const dockRect = document
          .querySelector("#dock")
          ?.getBoundingClientRect();

        minimizeSnapshotRef.current = {
          x: instance?.x ?? 0,
          y: instance?.y ?? 0,
        };

        instance?.disable();

        const targetX = dockRect
          ? dockRect.left + dockRect.width / 2 - (rect.left + rect.width / 2)
          : 0;
        const targetY = (dockRect?.top ?? window.innerHeight) - rect.top;

        gsap.to(el, {
          x: `+=${targetX}`,
          y: `+=${targetY}`,
          scale: 0.12,
          opacity: 0,
          transformOrigin: "bottom center",
          duration: 0.45,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none";
          },
        });
      } else if (minimizeSnapshotRef.current) {
        el.style.display = "block";

        gsap.fromTo(
          el,
          { scale: 0.12, opacity: 0, transformOrigin: "bottom center" },
          {
            x: minimizeSnapshotRef.current.x,
            y: minimizeSnapshotRef.current.y,
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              // Only re-enable dragging if it isn't ALSO currently maximized.
              if (!isMaximized) instance?.enable();
            },
          },
        );
      }
    }, [isMinimized, isMaximized, isOpen]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "component"}`;

  return Wrapped;
};

export default WindowWraper;
