import Box, { BoxProps } from "@material-ui/core/Box";
import { PropType, AppTheme } from "src/themes";
import useTheme from "@material-ui/styles/useTheme";
import { createStyles, makeStyles } from "@material-ui/styles";

const defaultColors = [
  "primary.main",
  "primary.light",
  "primary.dark",
  "secondary.main",
  "secondary.main",
  "secondary.light",
  "error.light",
  "error.dark",
  "error.dark",
  "success.light",
  "success.dark",
  "success.dark",
  "info.light",
  "info.dark",
  "info.dark",
  "background.light",
  "background.dark",
  "background.dark",
] as const;
type HexColor = string & { hexish?: any };

type FlexProps = Omit<BoxProps, "bgcolor"> & {
  cursor?: string;
  column?: boolean;
  center?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  cloneChildren?: boolean;
  bgcolor?:
    | typeof defaultColors[number]
    | keyof PropType<AppTheme, "colors">
    | HexColor;
};

const Flex = (props: FlexProps) => {
  const theme: AppTheme = useTheme();
  const {
    bgcolor,
    style: styleProps = {},
    column,
    center,
    centerX,
    centerY,
    children,
    cloneChildren,
    className,
    cursor,
    ...rest
  } = props;
  let centerProps: any = {};
  if (center) {
    centerProps["justifyContent"] = "center";
    centerProps["alignItems"] = "center";
  }
  if (centerX) {
    centerProps["justifyContent"] = "center";
  }
  if (centerY) {
    centerProps["alignItems"] = "center";
  }
  if (column) {
    centerProps["flexDirection"] = "column";
  }

  //@ts-ignore
  const isDefaultColors = defaultColors.includes(bgcolor);
  const colorProps = isDefaultColors
    ? {
        bgcolor: bgcolor,
      }
    : undefined;
  const style = {
    ...styleProps,
    //@ts-ignore
    backgroundColor: !isDefaultColors
      ? //@ts-ignore
        theme.colors[bgcolor] || bgcolor
      : undefined,
  };
  style.cursor = cursor;
  const styles = useStyles({
    ...centerProps,
    ...colorProps,
    ...rest,
  });

  return (
    <Box
      component={"div"}
      className={[styles.root, className || ""].join(" ")}
      style={style}
      {...centerProps}
      {...colorProps}
      {...rest}
    >
      {children}
    </Box>
  );
};

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: (props) => {
      const returnValue = {
        display: "flex",
      };
      Object.keys(props).forEach((key) => {
        if (typeof props[key] !== "function") {
          returnValue[key] = props[key];
        }
      });
      return returnValue;
    },
  })
);

export default Flex;
