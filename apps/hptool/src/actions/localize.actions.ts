import store from "src/store";
import LocalizeActionTypes from "src/actionTypes/localize.actionsType";

export const changeLanguage = (value) => {
  store.dispatch({
    type: LocalizeActionTypes.CHANGE_LANGUAGE,
    payload: value,
  });
};
