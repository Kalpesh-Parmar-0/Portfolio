import useWindowStore from "#store/window";
import { useIsMobile } from "#hooks";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const MIN_WIDTH = 320;
const MIN_HEIGHT = 220;

const WindowWraper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex, isMinimized, isMaximized } = windows[windowKey];
    const isMobile = useIsMobile();
    const ref = useRef(null);
    const draggableRef = useRef(null);
    // Separate snapshots: maximize/minimize can each be toggled independently
    // (e.g. minimizing a window that's already maximized), so they can't
    // share one ref without clobbering each other.
    const maximizeSnapshotRef = useRef(null);
    const minimizeSnapshotRef = useRef(null);
    const resizeStateRef = useRef(null);

    // Open animation. On mobile, windows are fullscreen "apps" - a slide-up
    // presentation (iOS-style) reads better there than the desktop
    // scale/fade-in.
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;
      el.style.display = "block";

      if (isMobile) {
        gsap.fromTo(
          el,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.4, ease: "power3.out" },
        );
      } else {
        gsap.fromTo(
          el,
          { scale: 0.8, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        );
      }
    }, [isOpen, isMobile]);

    // Draggable setup - restricted to the header as the drag handle (not
    // the whole window). This also keeps it from fighting with the resize
    // handles below: Draggable checks pointerdown targets against its
    // trigger itself, so without this restriction a drag on the resize
    // handles would kick off a window-drag at the same time as a resize.
    // Disabled entirely on mobile - fullscreen "apps" don't move around.
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;
      const header = el.querySelector("#window-header") ?? el;
      const [instance] = Draggable.create(el, {
        trigger: header,
        onPress: () => focusWindow(windowKey),
      });
      if (isMobile) {
        instance.disable();
        // A window may have been dragged around before the viewport crossed
        // into mobile width (e.g. someone shrinking their browser to
        // preview it, or rotating a tablet). Mobile positions windows with
        // fixed/inset-0 fullscreen CSS, and a leftover drag transform would
        // stack right on top of that, shoving the "fullscreen" box off
        // however far it had been dragged. Clear it so mobile always starts
        // from a clean slate.
        gsap.set(el, { x: 0, y: 0 });
      }
      draggableRef.current = instance;

      return () => instance.kill();
    }, [isMobile]);

    // Maximize / un-maximize animation. Not applicable on mobile - windows
    // are always fullscreen there, so this is a no-op.
    useGSAP(() => {
      const el = ref.current;
      const instance = draggableRef.current;
      if (!el || !isOpen || isMobile) return;

      const navGap = 36;
      const sideGap = 12;
      const dockGap = 104;

      if (isMaximized) {
        const rect = el.getBoundingClientRect();
        const currentX = instance?.x ?? 0;
        const currentY = instance?.y ?? 0;

        maximizeSnapshotRef.current = {
          x: currentX,
          y: currentY,
          width: rect.width,
          height: rect.height,
        };

        instance?.disable();

        const targetLeft = sideGap;
        const targetTop = navGap;
        const targetWidth = Math.max(320, window.innerWidth - sideGap * 2);
        const targetHeight = Math.max(
          240,
          window.innerHeight - navGap - dockGap,
        );

        // Express the destination purely as a transform delta from the
        // window's actual current on-screen box (rect), instead of
        // switching position to "fixed" and animating top/left directly.
        // Different windows use different Tailwind positioning classes
        // (px-based vs. fraction/%-based), and animating top/left mixed
        // with a position-mode switch is sensitive to that - transform is
        // always resolved in real pixels regardless of how the window was
        // originally positioned, so this can't drift off-screen.
        gsap.to(el, {
          x: currentX + (targetLeft - rect.left),
          y: currentY + (targetTop - rect.top),
          width: targetWidth,
          height: targetHeight,
          borderRadius: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      } else if (maximizeSnapshotRef.current) {
        const { x, y, width, height } = maximizeSnapshotRef.current;

        gsap.to(el, {
          x,
          y,
          width,
          height,
          borderRadius: 12,
          duration: 0.35,
          ease: "power2.inOut",
          onComplete: () => {
            // Only hand borderRadius back to the window's own CSS class -
            // width/height stay as the explicit px values we just animated
            // to (the pre-maximize snapshot), so a window the user had
            // manually resized keeps that size instead of snapping back to
            // its default CSS width/height.
            gsap.set(el, { clearProps: "borderRadius" });
            // Only re-enable dragging if the window isn't ALSO currently
            // minimized (e.g. minimized while maximized, then un-maximized
            // via some other path) - keep it locked while hidden.
            if (!isMinimized) instance?.enable();
          },
        });
      }
    }, [isMaximized, isOpen, isMobile]);

    // Minimize / restore animation (genie-to-dock effect). Not applicable
    // on mobile - there's no dock to minimize toward there.
    useGSAP(() => {
      const el = ref.current;
      const instance = draggableRef.current;
      if (!el || !isOpen || isMobile) return;

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
    }, [isMinimized, isMaximized, isOpen, isMobile]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    // Resize via right/bottom/corner handles. Deliberately edge/corner-only
    // (never top or left) so resizing only ever changes width/height - it
    // never has to also shift the window's x/y transform to keep the
    // opposite edge anchored, which keeps this independent of whatever
    // positioning units (%, px, left-based, right-based) a window's CSS uses.
    // Not offered on mobile - fullscreen "apps" aren't resizable.
    const startResize = (direction) => (e) => {
      // Stop this from also bubbling to the Draggable instance listening on
      // the same element, which would otherwise start dragging the window.
      e.stopPropagation();
      e.preventDefault();

      const el = ref.current;
      if (!el || isMaximized || isMobile) return;

      focusWindow(windowKey);

      const rect = el.getBoundingClientRect();
      resizeStateRef.current = {
        direction,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: rect.width,
        startHeight: rect.height,
      };

      const handleMove = (moveEvent) => {
        const state = resizeStateRef.current;
        if (!state) return;

        const dx = moveEvent.clientX - state.startX;
        const dy = moveEvent.clientY - state.startY;
        const maxWidth = window.innerWidth - 24;
        const maxHeight = window.innerHeight - 24;
        const next = {};

        if (state.direction === "right" || state.direction === "corner") {
          next.width = Math.min(
            maxWidth,
            Math.max(MIN_WIDTH, state.startWidth + dx),
          );
        }
        if (state.direction === "bottom" || state.direction === "corner") {
          next.height = Math.min(
            maxHeight,
            Math.max(MIN_HEIGHT, state.startHeight + dy),
          );
        }

        gsap.set(el, next);
      };

      const stopResize = () => {
        resizeStateRef.current = null;
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", stopResize);
      };

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", stopResize);
    };

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
        <Component {...props} />

        {!isMobile && !isMaximized && (
          <>
            <div
              onPointerDown={startResize("right")}
              className="absolute top-0 right-0 h-full w-2 cursor-ew-resize"
              style={{ touchAction: "none" }}
            />
            <div
              onPointerDown={startResize("bottom")}
              className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize"
              style={{ touchAction: "none" }}
            />
            <div
              onPointerDown={startResize("corner")}
              className="absolute bottom-0 right-0 size-4 cursor-nwse-resize"
              style={{ touchAction: "none" }}
            />
          </>
        )}
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "component"}`;

  return Wrapped;
};

export default WindowWraper;
