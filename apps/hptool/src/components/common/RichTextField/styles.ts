import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";

export const useRichTextFieldStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& button": {
        padding: "8px",
        margin: "4px",
        background: "yellow",
        borderRadius: "1rem",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)",
          color: "blue",
        },
      },
      "& .ProseMirror": {
        "> * + *": {
          marginTop: "0.75em",
        },

        "& ul": {
          padding: "0 1rem",
        },
        "& ol": {
          padding: "0 1rem",
        },

        "& h1": {
          lineHeight: "1.1",
        },
        "& h2": {
          lineHeight: "1.1",
        },
        "& h3": {
          lineHeight: "1.1",
        },
        "& h4": {
          lineHeight: "1.1",
        },
        "& h5": {
          lineHeight: "1.1",
        },
        "& h6": {
          lineHeight: "1.1",
        },

        "& code": {
          backgroundColor: "rgba(#616161, 0.1)",
          color: "#616161",
        },
        "& pre": {
          background: "#0D0D0D",
          color: "#FFF",
          fontFamily: `'JetBrainsMono', monospace`,
          padding: "0.75rem 1rem",
          borderRadius: "0.5rem",
          "& code": {
            color: "inherit",
            padding: 0,
            background: "none",
            fontSize: "0.8rem",
          },
        },
        "& img": {
          maxWidth: "100%",
          height: "auto",
        },

        "& blockquote": {
          paddingLeft: "1rem",
          borderLeft: "2px solid rgba(#0D0D0D, 0.1)",
        },

        "& hr": {
          border: "none",
          borderTop: "2px solid rgba(#0D0D0D, 0.1)",
          margin: "2rem 0",
        },
      },
    },
  })
);
