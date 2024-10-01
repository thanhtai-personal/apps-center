import { setOfThemes } from "@/utils/constants";
import { makeContext } from "../makeContext";
import { initialData } from "./initialData";
import {
  ThemeActionType,
  IThemeContext,
  IThemeAction,
  IUpdateThemePayload
} from "./interfaces";
import { changeTheme } from "@/utils/theme";

type ThemeActionPayload = IUpdateThemePayload;

// Define the reducer function
const reducer = (state: IThemeContext, action: IThemeAction<ThemeActionType, ThemeActionPayload>): IThemeContext => {

  switch (action.type) {
    case (ThemeActionType.updateTheme): {
      changeTheme(action.payload.key)
      return {
        ...state,
        theme: setOfThemes[Object.keys(setOfThemes).find((key: string) => setOfThemes[key].key === action.payload.key) || "light"]
      }
    }
    default:
      return state;
  }
};

// Create the counter context using makeContext
export const ThemeContext = makeContext<IThemeContext, IThemeAction<ThemeActionType, ThemeActionPayload>>(reducer, initialData);