import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

export const formStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      "& .fields-wrapper": {
        padding: "16px",
      },
      "& .top-left": {},
      "& .top-right": {
        borderLeft: "solid 1px rgba(0,0,0,0.12)",
      },
      "& .bottom-left": { borderTop: "solid 1px rgba(0,0,0,0.12)" },
      "& .bottom-right": {
        borderLeft: "solid 1px rgba(0,0,0,0.12)",
        borderTop: "solid 1px rgba(0,0,0,0.12)",
      },
    },
  })
);
