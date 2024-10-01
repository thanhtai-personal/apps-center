import HomeReducer from "./home.reducer";

const rootReducer = (state: any = {}, action: any) => {
  return {
    home: HomeReducer(state.appMenu, action),
  };
};

export default rootReducer;
