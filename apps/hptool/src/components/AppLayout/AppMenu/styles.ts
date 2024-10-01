import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

export const listStyle = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
      overflowX: "hidden",
    },
    fullList: {
      width: "auto",
    },
  })
);

export const menuItemStyle = makeStyles((theme: Theme) =>
  createStyles({
    itemActive: {
      background: "rgba(0,0,0, 0.89) !important",
      color: "white",
      pointerEvents: "none",
      width: "100%",
      boxShadow:
        "inset 0 8px 16px rgba(252,150,0, 0.056), 0 4px 6px rgba(252,150,0, 0.24)",
      borderRadius: ".3rem",
      transform: "scaleX(1.05)",
    },
    item: {
      width: "100%",
      animationDuration: "200ms",
      transitionDuration: "200ms",
      animation: "$background_animation 200ms ease-in-out",
    },
    "@keyframes background_animation": {
      "0%": {
        background: "white",
      },
    },
  })
);

export const subMenusStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      background: "rgba(0,0,0, 0.12)",
      borderRadius: ".5rem",
    },
  })
);
