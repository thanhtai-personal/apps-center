import { Theme } from "@material-ui/core";

const boxStyle = (theme: Theme) => ({
  box: {
    padding: "16px",
    borderRadius: "16px",
    background: theme.palette.background.paper,
    boxShadow: "0px 2px 16px rgba(35, 36, 41, 0.12)",
    "& .box-title": {
      width: "100%",
      justifyContent: "center",
      alignItem: "center",
    },
  },
});

export default boxStyle;
