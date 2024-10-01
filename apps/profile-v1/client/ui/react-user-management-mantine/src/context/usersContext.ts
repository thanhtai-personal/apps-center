import { ContextData, makeContext, IAction } from "@ttt-ui/react-context"

export enum UsersActionType {
  INIT_STATE = "init_state",
}

export interface UsersContext {
}

type UsersActionPayload = Partial<UsersContext> & {
  newKey?: string;
};

const reducer = (state: UsersContext, action: IAction<UsersActionType, UsersActionPayload>): UsersContext => {

  switch (action.type) {
    case UsersActionType.INIT_STATE:
      return action.payload;
    default:
      return state;
  }
};

export const UsersContext: ContextData<UsersContext, IAction<UsersActionType, UsersActionPayload>> =
  makeContext<UsersContext, IAction<UsersActionType, UsersActionPayload>>(reducer, {});