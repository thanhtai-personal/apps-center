import { getLanguageCode } from "@/utils/index";
import { makeContext } from "../makeContext";
import { initialData } from "./initialData";
import {
  AppActionType,
  IAppContext,
  IAction,
  UpdateLanguagePayload
} from "./interfaces";
import i18n from "../../i18n";

type AppActionPayload = UpdateLanguagePayload // | {}

// Define the reducer function
const reducer = (state: IAppContext, action: IAction<AppActionType, AppActionPayload>): IAppContext => {

  switch (action.type) {
    case AppActionType.updateLanguage:
      i18n.changeLanguage(action.payload.language);
      return {
        ...state,
        language: action.payload.language,
        languageCode: getLanguageCode(action.payload.language),
      }
    default:
      return state;
  }
};
// Create the counter context using makeContext
export const AppContext = makeContext<IAppContext, IAction<AppActionType, AppActionPayload>>(reducer, initialData);