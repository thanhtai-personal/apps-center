import { ContextData, makeContext, IAction } from "@ttt-ui/react-context"

export enum RolesActionType {
  INIT_STATE = "init_state",
}

export interface RolesContext {
}

type RolesActionPayload = Partial<RolesContext> & {
  newKey?: string;
};

const reducer = (state: RolesContext, action: IAction<RolesActionType, RolesActionPayload>): RolesContext => {

  switch (action.type) {
    case RolesActionType.INIT_STATE:
      return action.payload;
    default:
      return state;
  }
};

export const RolesContext: ContextData<RolesContext, IAction<RolesActionType, RolesActionPayload>> =
  makeContext<RolesContext, IAction<RolesActionType, RolesActionPayload>>(reducer, {});