import { ThemeMode } from "../utils";

declare const useThemeMode: () => {
  mode: ThemeMode;
  computedMode: ThemeMode; // "light" | "dark"
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  clearMode: () => void;
};