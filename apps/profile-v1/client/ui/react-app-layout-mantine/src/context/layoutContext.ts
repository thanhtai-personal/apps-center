import { ContextData, makeContext, IAction } from "@ttt-ui/react-context"

export enum LayoutActionType {
  INIT_STATE = "init_state",
  CLOSE_MENU = "close_menu",
  OPEN_MENU = "open_menu",
}

export interface ILayoutContext {
  languages?: { [key: string]: { [key: string]: string } }; // { [language key]: { [text key]: text value }}
  languageKey?: string;
  themeKey?: string;
  logo?: {
    src: string;
    name?: string;
    alt: string;
  },
  defaultAvatar?: string;
  appMenu?: {
    opened?: boolean;
  }
}

type LayoutActionPayload = Partial<ILayoutContext> & {
  newKey?: string;
};

const reducer = (state: ILayoutContext, action: IAction<LayoutActionType, LayoutActionPayload>): ILayoutContext => {

  switch (action.type) {
    case LayoutActionType.CLOSE_MENU:
      return {
        ...state,
        appMenu: {
          ...(state.appMenu || {}),
          opened: true, // no close
        }
      };
    case LayoutActionType.OPEN_MENU:
      return {
        ...state,
        appMenu: {
          ...(state.appMenu || {}),
          opened: true,
        }
      };
    case LayoutActionType.INIT_STATE:
      return action.payload;
    default:
      return state;
  }
};

export const LayoutContext: ContextData<ILayoutContext, IAction<LayoutActionType, LayoutActionPayload>> =
  makeContext<ILayoutContext, IAction<LayoutActionType, LayoutActionPayload>>(reducer, {});