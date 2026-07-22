import useWindowStore from "#store/window";
import { useIsMobile } from "#hooks";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const MIN_WIDTH = 320; // min width for resizing
const MIN_HEIGHT = 220; // min height for resizing user can't make window too much tiny

// higher order component which takes other components for draging and resizing effects
const WindowWraper = (Component, windowKey) => {
  // component which we recived
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex, isMinimized, isMaximized } = windows[windowKey]; // state of current window
    const isMobile = useIsMobile();
    const ref = useRef(null); // ref to current window
    const draggableRef = useRef(null); // draggable ref used when dragging component
    const maximizeSnapshotRef = useRef(null); // stores state of component before maximizing like current position, width, hight so when we press of maximize then it restores to current position
    const minimizeSnapshotRef = useRef(null); // stores state of component before minimizing like current position, width, hight so that when restoring from minimize it appears to same position as before minimizing
    const resizeStateRef = useRef(null); // while resizing it calculated whole time so that when user resize component then it appears resized instently
    const stateRef = useRef({ isMinimized, isMaximized }); // Finds if current boolean value of is maximize and minimized
    stateRef.current = { isMinimized, isMaximized };

    useGSAP(() => {
      const el = ref.current; // ref to current window
      if (!el || !isOpen) return; // if no window open then return
      gsap.killTweensOf(el); // if there is any current gsap
      el.style.display = "block"; // make display block again because before this render function like minimize window could make display none

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

    useGSAP(() => {
      const el = ref.current; // ref to current window
      if (!el) return;
      const header = el.querySelector("#window-header") ?? el; // finder header of component
      //create instance of draggable which can apply to ref
      const [instance] = Draggable.create(el, {
        trigger: header, // only trigger draggable effect if mouse is on header
        onPress: () => focusWindow(windowKey), // if window is not on top then make it on top of every other window
      });
      if (isMobile) {
        instance.disable(); // remove dragable effect if device is mobile
        gsap.set(el, { x: 0, y: 0 }); // set window
      }
      draggableRef.current = instance;

      return () => instance.kill();
    }, [isMobile]); // run this hook if isMobile changes

    // hook for maximizing and restoring window
    useGSAP(() => {
      const el = ref.current; // ref to current window
      const instance = draggableRef.current;
      if (!el || !isOpen || isMobile) return;

      // hardcoded values to not appear window on it while maximizing
      const navGap = 36;
      const sideGap = 12;
      const dockGap = 104;

      if (isMaximized) {
        instance?.disable();
        gsap.killTweensOf(el);
        gsap.set(el, {
          scale: 1,
          opacity: 1,
          transformOrigin: "50% 50%",
        });

        const rect = el.getBoundingClientRect(); // stores current position of window such as left, top, width, height
        const currentX = gsap.getProperty(el, "x"); // gsap's x(left) movement by draging
        const currentY = gsap.getProperty(el, "y"); // gsap's y movement

        // stores snapshot of window before maximizing
        maximizeSnapshotRef.current = {
          x: currentX,
          y: currentY,
          width: rect.width,
          height: rect.height,
        };

        const targetLeft = sideGap;
        const targetTop = navGap;
        const targetWidth = Math.max(320, window.innerWidth - sideGap * 2); // calculate width of maximized window so that it have side gaps
        const targetHeight = Math.max(
          240,
          window.innerHeight - navGap - dockGap, // calculate hight of window so that it don't come on top of dock
        );

        gsap.to(el, {
          x: currentX + (targetLeft - rect.left), // maximizing window's x position
          y: currentY + (targetTop - rect.top), // maximizing window's y position
          width: targetWidth, // width of maximizing window
          height: targetHeight, // height of maximizing window
          borderRadius: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      } else if (maximizeSnapshotRef.current) {
        // if window is maximized then resize to previouse position
        const { x, y, width, height } = maximizeSnapshotRef.current; // use maximize snapshot that taken before maximizing

        gsap.to(el, {
          x,
          y,
          width,
          height,
          borderRadius: 12,
          duration: 0.35,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(el, { clearProps: "borderRadius" }); // remove border redious
            if (!stateRef.current.isMinimized) instance?.enable();
          },
        });
      }
    }, [isMaximized, isOpen, isMobile]);

    // minimize, restore window hook
    useGSAP(() => {
      const el = ref.current;
      const instance = draggableRef.current;
      if (!el || !isOpen || isMobile) return;

      if (isMinimized) {
        instance?.disable();
        gsap.killTweensOf(el);
        gsap.set(el, { scale: 1, opacity: 1, transformOrigin: "50% 50%" });

        const rect = el.getBoundingClientRect(); // get left, top, width, height of window
        const dockRect = document
          .querySelector("#dock")
          ?.getBoundingClientRect(); // find left, top, width, height of dock

        // snap shot of current position of window before minimizing
        minimizeSnapshotRef.current = {
          x: gsap.getProperty(el, "x"),
          y: gsap.getProperty(el, "y"),
        };

        const targetX = dockRect
          ? dockRect.left + dockRect.width / 2 - (rect.left + rect.width / 2)
          : 0; // calculates window icon's center in dock
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
            el.style.display = "none"; // make display none of window
          },
        });
      } else if (minimizeSnapshotRef.current) {
        el.style.display = "block"; // makes display block of window
        gsap.killTweensOf(el);

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
              if (!stateRef.current.isMaximized) instance?.enable();
            },
          },
        );
      }
    }, [isMinimized, isOpen, isMobile]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    // resizing windows
    const startResize = (direction) => (e) => {
      e.stopPropagation(); // stops draggable effect
      e.preventDefault();

      const el = ref.current;
      if (!el || isMaximized || isMobile) return;

      focusWindow(windowKey); // focus window which we want to resize

      const rect = el.getBoundingClientRect(); // current x, y, width, height of window

      // store direction, x, y, width, height before starting of resize
      resizeStateRef.current = {
        direction,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: rect.width,
        startHeight: rect.height,
      };

      // runs everytime pointer moves
      const handleMove = (moveEvent) => {
        const state = resizeStateRef.current; // snapshot before resize
        if (!state) return;

        const dx = moveEvent.clientX - state.startX;
        const dy = moveEvent.clientY - state.startY;
        const maxWidth = window.innerWidth - 24;
        const maxHeight = window.innerHeight - 24;
        const next = {}; // stores width and height

        if (state.direction === "right" || state.direction === "corner") {
          next.width = Math.min(
            maxWidth,
            Math.max(MIN_WIDTH, state.startWidth + dx),
          ); // srores min width between screen width or (max of min width or size)
        }
        if (state.direction === "bottom" || state.direction === "corner") {
          next.height = Math.min(
            maxHeight,
            Math.max(MIN_HEIGHT, state.startHeight + dy),
          );
        }

        gsap.set(el, next);
      };

      // stops resizing when pointer releashed
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
