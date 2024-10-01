import { ReactNode, useLayoutEffect } from "react";
import {
  LayoutContext,
  ILayoutContext,
  LayoutActionType,
  AuthContext,
} from "../context";
import { Header } from "./Header";
import { AppMenu } from "./AppMenu";
import { Footer } from "./Footer";
import { Container } from "@ttt-ui/react-mantine-core";

export interface IAppLayoutProps {
  children: ReactNode;
  config?: ILayoutContext;
}

const AppLayout = ({ children, config }: IAppLayoutProps) => {
  const userManagementDispatcher = LayoutContext.useDataDispatchContext();

  useLayoutEffect(() => {
    userManagementDispatcher &&
      userManagementDispatcher({
        type: LayoutActionType.INIT_STATE,
        payload: {
          ...config,
          appMenu: {
            opened: true,
          },
        },
      });
  }, []);

  return (
    <AuthContext.Provider>
      <Header />
      <Container size={"lg"} className={"w-full mt-4"}>
        <div className="flex flex-row">
          <AppMenu />
          {children}
        </div>
      </Container>
      <Footer />
    </AuthContext.Provider>
  );
};

export default AppLayout;
