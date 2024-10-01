import AppMenuReducer from "./appMenu.reducer";
import authReducer from "./auth.reducer";
import footerReducer from "./footer.reducer";
import headerReducer from "./header.reducer";
import layoutReducer from "./layout.reducer";
import localizeReducer from "./localize.reducer";
import loginReducer from "./login.reducer";
import themeReducer from "./theme.reducer";
import signupReducer from "./signup.reducer";

const rootReducer = (state: any = {}, action) => {
  return {
    appMenu: AppMenuReducer(state.appMenu, action),
    auth: authReducer(state.auth, action),
    footer: footerReducer(state.footer, action),
    header: headerReducer(state.header, action),
    layout: layoutReducer(state.layout, action),
    localize: localizeReducer(state.localize, action),
    login: loginReducer(state.login, action),
    signup: signupReducer(state.signup, action),
    theme: themeReducer(state.theme, action),
  };
};

export default rootReducer;
