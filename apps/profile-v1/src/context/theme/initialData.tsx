import { setOfThemes } from "@/utils/constants";
import { IThemeContext } from "./interfaces";

// Initial state
export const initialData: IThemeContext = {
  theme: setOfThemes.light,
};