import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

export const appStyles = makeStyles((theme: Theme) =>
  createStyles({
    appRoot: {
      overflowX: "hidden",
      overflowY: "auto",
      position: "relative",
      background: theme.palette.background.default,
      "&::-webkit-scrollbar": {
        width: "2px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "steelblue",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "green",
      },
    },
  })
);
