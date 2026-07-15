import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { dockApps } from "#constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindowStore from "#store/window";

const Dock = () => {
  const { openWindow, closeWindow, restoreWindow, windows } = useWindowStore();
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current; // dock reference
    if (!dock) return;
    const icons = dock.querySelectorAll(".dock-icon"); // select all apps from dock

    const animateIcons = (mouseX) => {
      // animate mouse as per mouse moves
      const { left } = dock.getBoundingClientRect(); // find left side of dock
      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect(); // find each icon's left side
        const center = iconLeft - left + width / 2; // find center of each icon
        const distance = Math.abs(mouseX - center); // distance between icons

        const intensity = Math.exp(-(distance ** 2.5) / 20000); // it finds intensity by which icon should scale
        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect(); // finds left side of dock
      animateIcons(e.clientX - left); // animate icons as per mouse moves
    };
    // resets icons after animation
    const resetIcons = () => {
      icons.forEach((icon) => {
        gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: "power1.out" }); // make icon's scale to default
      });
    };
    dock.addEventListener("mousemove", handleMouseMove); // add mouse event listener
    dock.addEventListener("mouseleave", resetIcons); // make dock to default position after mouse leave

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  // toggle app's minimize feature
  const toggleApp = (app) => {
    if (!app.canOpen) return;
    const window = windows[app.id];

    if (!window) {
      console.log(`window not found for app: ${app.id}`);
      return;
    }

    if (window.isOpen && window.isMinimized) {
      restoreWindow(app.id); // restore window from minimize
    } else if (window.isOpen) {
      closeWindow(app.id); // close window if open
    } else {
      openWindow(app.id); // opens window
    }
  };
  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>

            {windows[id]?.isOpen && <span className="dock-indicator" />}
          </div>
        ))}

        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
