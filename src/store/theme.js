import { create } from "zustand";

const STORAGE_KEY = "portfolio-theme"; // local storage key value for theme
const media = window.matchMedia("(prefers-color-scheme: dark)"); // stores matches key as tru if dark otherwise false

const systemPrefersDark = () => media.matches; // boolean expression that stores true if system theme is dark

// resolve preference in light or dark mode
const resolvePreference = (preference) =>
  preference === "system"
    ? systemPrefersDark()
      ? "dark"
      : "light"
    : preference;

// apply theme
const applyResolvedTheme = (resolved) => {
  document.documentElement.classList.toggle("dark", resolved === "dark"); // remove dark class if theme is light
};

// read localy stored them
const readStoredPreference = () => {
  const stored = localStorage.getItem(STORAGE_KEY); // portfolio-theme if available then use that theme
  return stored === "light" || stored === "dark" || stored === "system"
    ? stored
    : "system";
};

const initialPreference = readStoredPreference(); // Initially check stored theme
const initialResolved = resolvePreference(initialPreference); // if theme stored then use it otherwise use system theme

applyResolvedTheme(initialResolved); // apply resolved theme

const useThemeStore = create((set) => ({
  preference: initialPreference,
  resolved: initialResolved,
  setPreference: (preference) => {
    localStorage.setItem(STORAGE_KEY, preference); // store user's theme in browser
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
