import { create } from "zustand";

const STORAGE_KEY = "portfolio-theme";
const media = window.matchMedia("(prefers-color-scheme: dark)");

const systemPrefersDark = () => media.matches;

// "system" follows the OS; "light"/"dark" are explicit user overrides.
const resolvePreference = (preference) =>
  preference === "system"
    ? systemPrefersDark()
      ? "dark"
      : "light"
    : preference;

const applyResolvedTheme = (resolved) => {
  document.documentElement.classList.toggle("dark", resolved === "dark");
};

const readStoredPreference = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" || stored === "system"
    ? stored
    : "system";
};

const initialPreference = readStoredPreference();
const initialResolved = resolvePreference(initialPreference);
// Applied as soon as this module is evaluated (before first paint) so
// there's no flash of the wrong theme on load.
applyResolvedTheme(initialResolved);

const useThemeStore = create((set) => ({
  preference: initialPreference,
  resolved: initialResolved,
  setPreference: (preference) => {
    localStorage.setItem(STORAGE_KEY, preference);
    const resolved = resolvePreference(preference);
    applyResolvedTheme(resolved);
    set({ preference, resolved });
  },
}));

// If the user hasn't overridden it, keep following the OS live (e.g. macOS
// switching to Dark Mode automatically at sunset).
media.addEventListener("change", (event) => {
  if (useThemeStore.getState().preference !== "system") return;
  const resolved = event.matches ? "dark" : "light";
  applyResolvedTheme(resolved);
  useThemeStore.setState({ resolved });
});

export default useThemeStore;
