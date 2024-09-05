import { useStore } from "@/store/index";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core"
import { ReactNode } from "react"
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MenuBar } from "./MenuBar";
import { NovalsProvider } from "@core-ui/react-novals";
import { ThemeProvider } from "@/styles/ThemeProvider";

export interface IPageLayoutProps {
  children: ReactNode;
}

export const PageLayout = observer(({
  children
}: IPageLayoutProps) => {
  const { uiStore } = useStore();
  return (
    <ThemeProvider>
      <NovalsProvider config={{
        apiConfig: {
          apiEndpoint: import.meta.env.VITE_API_URL
        }
      }}>
        <Flex fullWidth minHeight={"100vh"} bgcolor={uiStore.colors.appBgColor}>
          {uiStore.useHeader && <Header />}
          {uiStore.useMenuBar && <MenuBar />}
          {children}
          {uiStore.useFooter && <Footer />}
        </Flex>
      </NovalsProvider>
    </ThemeProvider>
  )
})