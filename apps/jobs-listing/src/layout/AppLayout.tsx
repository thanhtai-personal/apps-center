import { ReactNode } from "react";
import { useStore } from "../store";
import { observer } from "@core-ui/react-mobx-state";
import { Header } from "./Header";
import { ThemeProvider } from "@/styles/ThemeProvider";
import { MessageQueueBoundary } from "@/components/layout/MessageQueueBoundary";

export const AppLayout = observer(({ children }: { children: ReactNode }) => {
  const { uiStore } = useStore();

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