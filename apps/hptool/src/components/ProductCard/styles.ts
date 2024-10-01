import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";

export const useProductCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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
