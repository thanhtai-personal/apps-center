import store from "store";
import LocalizeActionTypes from "actionTypes/localize.actionsType";

export const changeLanguage = (value) => {
  store.dispatch({
    type: LocalizeActionTypes.CHANGE_LANGUAGE,
    payload: value,
  });
};
