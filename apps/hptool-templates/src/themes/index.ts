import createMuiTheme from "@material-ui/core/styles/createTheme";
import { isEmpty } from "lodash";
const lightTheme = require("./theme.light");
const darkTheme = require("./theme.dark");

declare module "@material-ui/core/Typography/Typography" {
  interface TypographyPropsVariantOverrides {
    lightBold: true;
    bold: true;
    light: true;
    link: true;
  }
}

declare module "@material-ui/core/Button/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    success: true;
    danger: true;
    info: true;
  }
}

export const THEME = {
  LIGHT: "LIGHT",
  DARK: "DARK",
};

export const Colors = {};

export const createAppTheme = (key: string, newStyle: any = {}) => {
  let customStyle = newStyle[key] || {};
  if (isEmpty(newStyle)) {
    switch (key) {
      case THEME.LIGHT:
        customStyle = lightTheme;
        break;
      case THEME.DARK:
        customStyle = darkTheme;
        break;
      default:
        break;
    }
  }
  const muiTheme = createMuiTheme(customStyle);
  return {
    ...muiTheme,
    spacing: (factor) => `${0.25 * factor}rem`,
    colors: {
      ...Colors,
    },
  };
};

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
export type AppTheme = ReturnType<typeof createAppTheme>;
