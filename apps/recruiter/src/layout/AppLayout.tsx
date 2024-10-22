import { ReactNode, useEffect, useLayoutEffect } from "react";
import { useStore } from "../store";
import { observer } from "@core-ui/react-mobx-state";
import { Header } from "./Header";
import { ThemeProvider } from "@/styles/ThemeProvider";
import { MessageQueueBoundary } from "@/components/layout/MessageQueueBoundary";
import { AOS } from "@core-ui/react-animates";

export const AppLayout = observer(({ children }: { children: ReactNode }) => {
  const { uiStore } = useStore();

  useLayoutEffect(() => {
    AOS.init();
  }, [])

  return (
      <ThemeProvider>
        <MessageQueueBoundary>
          <>
            {uiStore.useHeader && <Header />}
            {children}
          </>
        </MessageQueueBoundary>
      </ThemeProvider>
  )
})