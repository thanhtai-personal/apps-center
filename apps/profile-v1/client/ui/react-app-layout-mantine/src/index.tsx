import { ReactNode } from "react";
import { ReactApplicationManager } from "@ttt-ui/react-core";
import { ILayoutContext, LayoutContext } from "./context";
import AppLayout from "./components";

export class LayoutManager {
  private config: ILayoutContext;

  constructor(config?: ILayoutContext) {
    this.config = config || {};
  }

  inject = (appManager: ReactApplicationManager) => {
    const _AppLayout = ({ children }: { children: ReactNode }) => {
      return (
        <LayoutContext.Provider>
          <AppLayout config={this.config}>{children}</AppLayout>
        </LayoutContext.Provider>
      );
    };
    appManager.addProviders([_AppLayout]);
    return appManager;
  };

  remove = (appManager: ReactApplicationManager) => {
    //Todo: @Tai
    return appManager;
  };
}
