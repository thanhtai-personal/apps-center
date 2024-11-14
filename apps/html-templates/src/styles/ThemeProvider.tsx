import { ReactNode, useEffect } from "react"
import { observer } from "@core-ui/react-mobx-state";
import { useMuiCoreStore } from "@core-ui/react-mui-core";
import { darkTheme } from "./darkTheme";


export const ThemeProvider = observer(({ children }: {
  children: ReactNode;
}) => {
  const { themeStore } = useMuiCoreStore();

  useEffect(() => {
    themeStore.themeMapper = {
      dark: darkTheme
    }
    themeStore.themeKey = "dark"
  }, [])

  return children
})