import { ContextData, makeContext, IAction } from "@ttt-ui/react-context"

export enum PermissionsActionType {
  INIT_STATE = "init_state",
}

export interface PermissionsContext {
}

type PermissionsActionPayload = Partial<PermissionsContext> & {
  newKey?: string;
};

const reducer = (state: PermissionsContext, action: IAction<PermissionsActionType, PermissionsActionPayload>): PermissionsContext => {

  switch (action.type) {
    case PermissionsActionType.INIT_STATE:
      return action.payload;
    default:
      return state;
  }
};

export const PermissionsContext: ContextData<PermissionsContext, IAction<PermissionsActionType, PermissionsActionPayload>> =
  makeContext<PermissionsContext, IAction<PermissionsActionType, PermissionsActionPayload>>(reducer, {});