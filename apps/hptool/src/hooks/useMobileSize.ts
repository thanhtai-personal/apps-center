import { useMediaQuery, useTheme } from "@material-ui/core";

const useMobileFirstDesign = () => {
  const theme = useTheme();
  const upXS = useMediaQuery(theme.breakpoints.up("xs"));
  const upSM = useMediaQuery(theme.breakpoints.up("sm"));
  const upMD = useMediaQuery(theme.breakpoints.up("md"));
  const upLG = useMediaQuery(theme.breakpoints.up("lg"));
  const upXL = useMediaQuery(theme.breakpoints.up("xl"));
  return {
    upXS,
    upSM,
    upMD,
    upLG,
    upXL,
  };
};

export const useDesktopFirstDesign = () => {
  const theme = useTheme();
  const downXS = useMediaQuery(theme.breakpoints.down("xs"));
  const downSM = useMediaQuery(theme.breakpoints.down("sm"));
  const downMD = useMediaQuery(theme.breakpoints.down("md"));
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));
  const downXL = useMediaQuery(theme.breakpoints.down("xl"));
  return {
    downXS,
    downSM,
    downMD,
    downLG,
    downXL,
  };
};

export default useMobileFirstDesign;
