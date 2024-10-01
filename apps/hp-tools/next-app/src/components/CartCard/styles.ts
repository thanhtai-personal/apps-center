import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";

export const useCartCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "space-between",
      "& .hover-container": {
        "& .hover-content": {
          display: "none",
        },
        "&:hover": {
          "& .hover-content": {
            display: "flex",
          },
        },
      },
      [theme.breakpoints.down("md")]: {},
    },
  })
);
