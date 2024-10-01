import appMenuState from "./appMenu.reducer/initialState";
import authState from "./auth.reducer/initialState";
import footerState from "./footer.reducer/initialState";
import headerState from "./header.reducer/initialState";
import layoutState from "./layout.reducer/initialState";
import localizeState from "./localize.reducer/initialState";
import loginState from "./login.reducer/initialState";
import themeState from "./theme.reducer/initialState";
import signupState from "./signup.reducer/initialState";

const defaultState = {
  appMenu: appMenuState,
  auth: authState,
  footer: footerState,
  header: headerState,
  layout: layoutState,
  localize: localizeState,
  login: loginState,
  theme: themeState,
  signup: signupState,
};

export default defaultState;
