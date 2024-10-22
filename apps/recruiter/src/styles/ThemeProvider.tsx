import { MuiActionType, MuiContext, MuiProvider } from "@core-ui/react-mui-core";
import { ReactNode, useEffect } from "react"
import { appTheme } from "./appTheme";
import { observer } from "@core-ui/react-mobx-state";
import { useStore } from "../store";

export const ThemeWrapper = observer(({ children }: {
  children: ReactNode;
}) => {
  const { uiStore } = useStore();
  const themeDispatcher = MuiContext.useDataDispatchContext();
  

  useEffect(() => {
    themeDispatcher && themeDispatcher({
      type: MuiActionType.ADD_THEME,
      payload: {
        newKey: "appTheme",
        newTheme: appTheme,
      }
    })
    themeDispatcher && themeDispatcher({
      type: MuiActionType.UPDATE_THEME,
      payload: {
        themeKey: "appTheme",
      }
    })
    uiStore.colors = appTheme.colors;
  }, [appTheme])

  return children
})

export const ThemeProvider = observer(({ children }: {
  children: ReactNode;
}) => {

  return <MuiProvider>
    <ThemeWrapper>
      {children}
    </ThemeWrapper>
  </MuiProvider>
})