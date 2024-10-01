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
    /* width */
    "&::-webkit-scrollbar": {
      width: "2px",
    },
    /* Track */
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },

    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      "&:hover": {
        background: "#555",
      },
    },
  },
  scrollable: {
    "&::-webkit-scrollbar": {
      width: "2px",
    },
    /* Track */
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },

    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      "&:hover": {
        background: "#555",
      },
    },
  },
  pageContent: {
    paddingTop: "16px",
  },
  itemHover: {
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)",
    "&:hover": {
      background: "pink",
      "& .text": {
        color: "rgb(246, 45, 62)",
      },
    },
  },
});

export default boxStyle;
