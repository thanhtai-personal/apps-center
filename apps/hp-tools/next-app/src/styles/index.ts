import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import boxStyle from "./box";
import textStyle from "./text";
import buttonStyle from "./button";

export const useGlobalStyle = makeStyles((theme: Theme) =>
  createStyles({
    ...boxStyle(theme),
    ...textStyle(theme),
    ...buttonStyle(theme),
  })
);
