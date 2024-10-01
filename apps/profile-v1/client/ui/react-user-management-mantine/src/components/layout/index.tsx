import { ReactNode, useLayoutEffect } from "react";
import { UserManagementContext, IUserManagementContext, UserManagementActionType } from "../../context";

export interface IAppLayoutProps {
  children: ReactNode;
  config?: IUserManagementContext;
}

export const AppLayout = ({ children, config }: IAppLayoutProps) => {

  const userManagementDispatcher = UserManagementContext.useDataDispatchContext();

  useLayoutEffect(() => {
    userManagementDispatcher && userManagementDispatcher({
      type: UserManagementActionType.INIT_STATE,
      payload: { ...config },
    });
  }, [])

  return children;
};
