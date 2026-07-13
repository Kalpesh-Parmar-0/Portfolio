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

media.addEventListener("change", (event) => {
  if (useThemeStore.getState().preference !== "system") return;
  const resolved = event.matches ? "dark" : "light";
  applyResolvedTheme(resolved);
  useThemeStore.setState({ resolved });
});

export default useThemeStore;
