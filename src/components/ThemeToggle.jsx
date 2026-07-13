import { Sun, Moon } from "lucide-react";
import useThemeStore from "#store/theme";

const ThemeToggle = ({
  className = "p-1 rounded transition-colors hover:bg-gray-200 dark:hover:bg-white/10 text-black dark:text-gray-100 cursor-pointer",
  iconClassName = "size-3.5",
}) => {
  const { resolved, setPreference } = useThemeStore();
  const isDark = resolved === "dark";

  return (
    <button
      type="button"
      className={className}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setPreference(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Sun className={iconClassName} />
      ) : (
        <Moon className={iconClassName} />
      )}
    </button>
  );
};

export default ThemeToggle;
