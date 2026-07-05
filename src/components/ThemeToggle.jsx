import { useEffect, useRef, useState } from "react";
import { Monitor, Sun, Moon } from "lucide-react";
import useThemeStore from "#store/theme";

const OPTIONS = [
  { id: "system", label: "System", Icon: Monitor },
  { id: "light", label: "Light", Icon: Sun },
  { id: "dark", label: "Dark", Icon: Moon },
];

const ThemeToggle = () => {
  const { preference, setPreference } = useThemeStore();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <li className="theme-toggle" ref={containerRef}>
      <img
        src="/icons/mode.svg"
        className="icon-hover"
        alt="Appearance"
        role="button"
        aria-label="Change appearance"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="theme-menu" role="menu">
          {OPTIONS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              role="menuitemradio"
              aria-checked={preference === id}
              className={preference === id ? "active" : ""}
              onClick={() => {
                setPreference(id);
                setOpen(false);
              }}
            >
              <Icon className="size-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </li>
  );
};

export default ThemeToggle;
