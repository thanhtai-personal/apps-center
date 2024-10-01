import Box, { BoxProps } from "@material-ui/core/Box";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import { createStyles, makeStyles, useTheme } from "@material-ui/styles";
import { AppTheme, PropType } from "themes";

const defaultColors = [
  "initial",
  "inherit",
  "primary",
  "secondary",
  "textPrimary",
  "textSecondary",
] as const;

type HexColor = string & { hexish?: any };

type TextProps = Omit<BoxProps, "color" | "display" | "style"> &
  Omit<TypographyProps, "color"> & {
    color?:
      | (typeof defaultColors[number] | keyof PropType<AppTheme, "colors">)
      | HexColor;
    boxStyle?: any;
  };

const Text = (props: TextProps) => {
  const {
    color,
    style: styleProps = {},
    textAlign,
    children,
    className,
    boxStyle,
    ...rest
  } = props;
  const theme: AppTheme = useTheme();
  //@ts-ignore
  const isDefaultColors = defaultColors.includes(color);
  const colorProps = isDefaultColors
    ? {
        color: color,
      }
    : undefined;
  const style = {
    ...styleProps,
    //@ts-ignore
    color: !isDefaultColors ? theme.colors[color] || color : undefined,
    textAlign: textAlign || styleProps.textAlign,
  };

  const boxProps = {
    ...rest,
    textAlign: undefined,
  };

  const typoProps = {
    ...rest,
    maxWidth: undefined,
    onClick: undefined,
  };

  const styles = useStyles({
    ...colorProps,
    ...typoProps,
  });

  //@ts-ignore
  return (
    <Box style={boxStyle} {...boxProps} className={className}>
      {/* @ts-ignore */}
      <Typography
        className={[styles.root, className || ""].join(" ")}
        component="div"
        style={style}
      >
        {children}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: (props) => {
      return {
        ...props,
      };
    },
  })
);

export default Text;
