import { IAction } from "../app";
import { Theme } from "@/utils/index"

export enum ThemeActionType {
  updateTheme = "UPDATE_THEME"
}

export interface IUpdateThemePayload {
  key: string;
}

export interface IThemeAction<T, K> extends IAction<T, K> {}

// Define the state type
export interface IThemeContext {
  theme?: Theme;
}