import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

export const toolBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      width: "100vw",
      position: "sticky",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })
);

export const headerStyles = makeStyles((theme: Theme) => {
  return createStyles({
    grow: {
      width: "100vw",
      position: "sticky",
    },
  });
});
