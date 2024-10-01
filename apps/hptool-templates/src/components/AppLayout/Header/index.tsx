import AppBar from "@material-ui/core/AppBar";
import useSelector from "hooks/useSelector";
import AppToolbar from "./AppToolbar";
import { headerStyles } from "./styles";

interface HeaderProps {
  accountMenuId?: string;
  mobileMenuId?: string;
}

const ACCOUNT_MENU_ID = `${Math.round(
  Math.random() * 100000
)}-primary-search-account-menu`;
const MOBILE_MENU_ID = `${Math.round(
  Math.random() * 100000
)}-primary-search-account-menu-mobile`;

const Header = (props: HeaderProps) => {
  const classes = headerStyles();
  const appMenuState = useSelector((state) => state.appMenu);
  const { accountMenuId = ACCOUNT_MENU_ID, mobileMenuId = MOBILE_MENU_ID } =
    props;

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <AppToolbar></AppToolbar>
      </AppBar>
    </div>
  );
};

export default Header;
