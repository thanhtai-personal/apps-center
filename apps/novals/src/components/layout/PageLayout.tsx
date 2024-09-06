import { useStore } from "@/store/index";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core"
import { ReactNode } from "react"
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MenuBar } from "./MenuBar";
import { NovalsProvider } from "@core-ui/react-novals";
import { ThemeProvider } from "@/styles/ThemeProvider";
import { Animates } from "@core-ui/react-animates";
import { VideoBackground } from "@core-ui/react-viewframe";
import "@core-ui/react-viewframe/dist/styles.css"

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
        <Flex fullSize center width={"100vw"} height={"100vh"} overflow={"hidden"}>
          <Flex column fullWidth minHeight={"100vh"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}>
            <VideoBackground src={"https://www.youtube.com/embed/Hee7oQdNUpc?si=vFw776MODJeIrq0N"}
              id={"test"} preloadSrc={"https://picture.dzogame.vn/img/Tru-tien-1_pp_434.jpg"}>
              <Animates.FadeAppear delay={0}>
                <Flex column
                  bgcolor={`${uiStore.colors.appBgColor}fa`}
                  height={"100vh"}
                  width={"100vw"}
                  position={"fixed"}
                  overflow={"auto"}
                >
                  <Flex fullWidth column>
                    {uiStore.useHeader && <Header />}
                    {uiStore.useMenuBar && <Animates.GrowUpAppear delay={2.5}>
                      <MenuBar />
                    </Animates.GrowUpAppear>}
                    {children}
                    {uiStore.useFooter && <Footer />}
                  </Flex>
                </Flex>
              </Animates.FadeAppear>
            </VideoBackground>
          </Flex>
        </Flex>
      </NovalsProvider>
    </ThemeProvider >
  )
})