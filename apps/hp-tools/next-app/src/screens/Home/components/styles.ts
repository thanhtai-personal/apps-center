import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";

export const useSliderStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("md")]: {},
    },
  })
);

export const useBranchsStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("md")]: {},
    },
  })
);

export const useCategoriesStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("md")]: {},
    },
    activeButton: {
      background: "#f62d3e",
      color: "#fff",
      padding: "8px",
      borderRadius: ".5rem",
    },
    button: {
      background: "#f4f5f9",
      color: "#474c5f",
      padding: "8px",
      borderRadius: ".5rem",
    },
  })
);

export const useProductsStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("md")]: {},
    },
    categoryMenu: {
      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)",
      padding: "16px",
      marginRight: "32px",
      overflowY: "auto",
    },
    categoryMenuItem: {},
    categoryMenuItemActive: {
      background: "lightgreen",
      borderRadius: "4px",
    },
  })
);
