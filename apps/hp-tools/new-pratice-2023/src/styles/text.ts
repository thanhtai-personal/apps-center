import { Theme } from "@material-ui/core";

const textStyle = (theme: Theme) => ({
  textTitle: {
    fontWeight: 700,
    fontSize: "large",
    color: theme.palette.primary.main,
    fontFamily: `Arial, Helvetica, sans-serif`,
  },
  text: {
    fontWeight: 450,
    fontSize: "medium",
    color: theme.palette.primary.main,
    fontFamily: `Arial, Helvetica, sans-serif`,
  },
  textLink: {
    cursor: "pointer",
    color: theme.palette.secondary.main,
    textDecoration: "underline",
  },
});

export default textStyle;
