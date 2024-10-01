import AppBar from "@material-ui/core/AppBar";
import useSelector from "src/hooks/useSelector";
import AppToolbar from "./AppToolbar";
import { headerStyles } from "./styles";

interface HeaderProps {
  accountMenuId?: string;
  mobileMenuId?: string;
}

const Header = (props: HeaderProps) => {
  const classes = headerStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <AppToolbar></AppToolbar>
      </AppBar>
    </div>
  );
};

export default Header;
