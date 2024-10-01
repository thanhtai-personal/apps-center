import AppMenuReducer from "./appMenu.reducer";
import authReducer from "./auth.reducer";
import footerReducer from "./footer.reducer";
import headerReducer from "./header.reducer";
import layoutReducer from "./layout.reducer";
import localizeReducer from "./localize.reducer";
import loginReducer from "./login.reducer";
import themeReducer from "./theme.reducer";
import signupReducer from "./signup.reducer";
import categoryReducer from "./category.reducer";
import branchReducer from "./branch.reducer";
import orderReducer from "./order.reducer";
import productReducer from "./product.reducer";
import userReducer from "./user.reducer";
import roleReducer from "./role.reducer";
import imagesReducer from "./images.reducer";
import homeReducer from "./home.reducer";

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
    categories: categoryReducer(state.categories, action),
    branchs: branchReducer(state.branchs, action),
    users: userReducer(state.users, action),
    roles: roleReducer(state.roles, action),
    products: productReducer(state.products, action),
    orders: orderReducer(state.orders, action),
    images: imagesReducer(state.images, action),
    home: homeReducer(state.home, action),
  };
};

export default rootReducer;
