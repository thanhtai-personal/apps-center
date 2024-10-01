import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";

export const useTopbarStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#f8f9fb",
      borderBottom: "solid 1px rgba(0,0,0,0.12)",
      "& .content": {
        maxWidth: 1100,
        justifyContent: "space-between",
        "& .welcome_text": {
          color: "#f62d3e",
          fontSize: "13px",
          fontWeight: 700,
          textTransform: "uppercase",
        },
        "& .topbar_button": {
          fontSize: "13px",
          color: "#474c5f",
          textDecoration: "none",
          textTransform: "none",
          background: "0 0",
          transition: "all .15s ease-in-out",
          "&:hover": {
            color: "#f62d3e",
          },
        },
        [theme.breakpoints.down("md")]: {
          justifyContent: "flex-end",
          "& .welcome_text": {
            display: "none",
          },
        },
      },
    },
  })
);

export const useSearchbarStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#f8f9fb",
      borderBottom: "solid 1px rgba(0,0,0,0.12)",
      "& .searchbox_mobile": {
        display: "none",
      },
      "& .content": {
        maxWidth: 1250,
        justifyContent: "space-between",
        "& .text_hotline": {
          fontSize: "14px",
          color: "#474c5f",
        },
        "& .number_hotline": {
          fontSize: "14px",
          color: "#f62d3e",
          fontWeight: 700,
        },
        "& .cart_mobile": {
          display: "none",
        },
        "& .menu_mobile": {
          display: "none",
        },
        [theme.breakpoints.down("md")]: {
          "& .hot_line": {
            display: "none",
          },
          "& .searchbox": {
            display: "none",
          },
          "& .searchbox_mobile": {
            display: "flex",
          },
          "& .cart_mobile": {
            display: "flex",
          },
          "& .cart": {
            display: "none",
          },
          "& .menu_mobile": {
            display: "flex",
          },
        },
      },
    },
  })
);

export const useAppMenuStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    menuButton: {
      textTransform: "uppercase",
      color: "#fff",
      fontSize: "13px",
      padding: "16px",
      "&:hover": {
        background: "#f62d3e",
      },
    },
  })
);

export const useFooterStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("md")]: {},
      backgroundImage: `url("images/bg_footer.png")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: "100%",
      height: "100%",
      overflowX: "hidden",
      overflowY: "hidden",
      "& .content-wrap": {
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0, 0.4)",
        "& .content": {
          maxWidth: 1100,
          width: "100%",
        },
      },
    },
  })
);
