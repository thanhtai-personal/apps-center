import { Theme } from "@material-ui/core";

const boxStyle = (theme: Theme) => ({
  buttonSubmit: {},
  buttonText: {
    fontWeight: 700,
  },
  button: {
    background: "#f62d3e",
    color: "#fff",
    borderRadius: ".5rem",
    cursor: "pointer",
    padding: "8px",
    margin: "8px",
    "&:hover": {
      background: "gray",
    },
  },
});

export default boxStyle;
