import { MantineTheme } from "@mantine/core";
import { ContextData, makeContext, IAction } from "@ttt-ui/react-context"

export enum MantineActionType {
  INIT_STATE = "init_state",
  UPDATE_THEME = "update_theme",
  ADD_THEME = "add_theme"
}

export type ThemeMapping = {
  [key: string]: Partial<MantineTheme>;
}

export interface ITTTMantineContext {
  themeKey?: string;
  themeMapping?: ThemeMapping;
}

type MantineActionPayload = Partial<ITTTMantineContext> & {
  newKey?: string;
  newTheme?: Partial<MantineTheme>;
};

const reducer = (state: ITTTMantineContext, action: IAction<MantineActionType, MantineActionPayload>): ITTTMantineContext => {

  switch (action.type) {
    case MantineActionType.ADD_THEME:
      const newMapping = state.themeMapping || {};
      if (action.payload.newKey && action.payload.newTheme) {
        newMapping[action.payload.newKey] = action.payload.newTheme;
      }
      return { ...state,
        themeMapping: newMapping
      }
    case MantineActionType.UPDATE_THEME:
      return { ...state,
        themeKey: action.payload.themeKey
      }
    case MantineActionType.INIT_STATE:
      return action.payload;
    default:
      return state;
  }
};

export const TTTMantineContext: ContextData<ITTTMantineContext, IAction<MantineActionType, MantineActionPayload>> =
  makeContext<ITTTMantineContext, IAction<MantineActionType, MantineActionPayload>>(reducer, {});