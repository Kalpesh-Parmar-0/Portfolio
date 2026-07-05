import { Sun, Moon } from "lucide-react";
import useThemeStore from "#store/theme";

const ThemeToggle = () => {
  const { resolved, setPreference } = useThemeStore();
  const isDark = resolved === "dark";

  return (
    <li className="theme-toggle">
      <button
        type="button"
        className="p-1 rounded transition-colors hover:bg-gray-200 dark:hover:bg-white/10 text-black dark:text-gray-100 cursor-pointer"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setPreference(isDark ? "light" : "dark")}
      >
        {isDark ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
      </button>
    </li>
  );
};

export default ThemeToggle;
