import { useRef } from "react";
import dayjs from "dayjs";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { dockApps } from "#constants";
import useWindowStore from "#store/window";

const MobileHome = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const gridRef = useRef(null);

  useGSAP(() => {
    const icons = gridRef.current?.querySelectorAll(".app-icon");
    if (!icons?.length) return;

    gsap.fromTo(
      icons,
      { opacity: 0, y: 16, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.05,
      },
    );
  }, []);

  const handleOpen = (app) => {
    if (!app.canOpen) return;

    // iOS-style single-app-at-a-time: close whatever else is open before
    // opening the tapped app fullscreen.
    Object.entries(windows).forEach(([key, win]) => {
      if (key !== app.id && win.isOpen) closeWindow(key);
    });

    openWindow(app.id);
  };

  return (
    <section id="mobile-home">
      <div className="status-bar">
        <time>{dayjs().format("h:mm A")}</time>
        <div className="flex items-center gap-1.5">
          <img src="/icons/wifi.svg" alt="" className="size-3.5" />
          <img src="/icons/user.svg" alt="" className="size-3.5" />
        </div>
      </div>

      <div className="greeting">
        <p>Hey, I&apos;m Kalpesh</p>
        <h1>Welcome to my portfolio</h1>
      </div>

      <div ref={gridRef} className="app-grid">
        {dockApps.map((app) => (
          <button
            key={app.id}
            type="button"
            disabled={!app.canOpen}
            onClick={() => handleOpen(app)}
            className="app-icon"
          >
            <span className="icon-wrap">
              <img src={`/images/${app.icon}`} alt="" />
            </span>
            <p>{app.name}</p>
          </button>
        ))}
      </div>

      <div className="home-indicator" />
    </section>
  );
};

export default MobileHome;
