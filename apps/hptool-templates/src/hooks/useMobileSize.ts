import { useTheme } from "@material-ui/core";

const useMobileFirstDesign = () => {
  const theme = useTheme();
  return {
    upXS: theme.breakpoints.up("xs"),
    upSM: theme.breakpoints.up("sm"),
    upMD: theme.breakpoints.up("md"),
    upLG: theme.breakpoints.up("lg"),
    upXL: theme.breakpoints.up("xl"),
  };
};

export const useDesktopFirstDesign = () => {
  const theme = useTheme();
  return {
    upXS: theme.breakpoints.down("xs"),
    upSM: theme.breakpoints.down("sm"),
    upMD: theme.breakpoints.down("md"),
    upLG: theme.breakpoints.down("lg"),
    upXL: theme.breakpoints.down("xl"),
  };
};

// xs: 320,
//sm: 640,
//md: 768,
//lg: 1024,
//xl: 1280,

export default useMobileFirstDesign();
