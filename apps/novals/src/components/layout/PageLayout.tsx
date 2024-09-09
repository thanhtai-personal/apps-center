import { useStore } from "@/store/index";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core"
import { ReactNode } from "react"
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MenuBar } from "./MenuBar";
import { ThemeProvider } from "@/styles/ThemeProvider";
import { Animates } from "@core-ui/react-animates";
import { ImageSlideBackground } from "@core-ui/react-viewframe";
import "@core-ui/react-viewframe/dist/styles.css"
import { MessageQueueBoundary } from "./MessageQueueBoundary";

// Interface for PageLayout props
export interface IPageLayoutProps {
  children: ReactNode;
}

// Main container component
const MainContainer = ({ children }: { children: ReactNode }) => (
  <Flex fullSize center width={"100vw"} height={"100vh"} overflow={"hidden"} position={"relative"}>
    <Flex column fullWidth minHeight={"100vh"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}>
      {children}
    </Flex>
  </Flex>
);

// Video background component
const BackgroundImageSlide = ({ children }: { children: ReactNode }) => (
  <ImageSlideBackground
    id={"test"}
    images={[
      "https://picture.dzogame.vn/img/Tru-tien-1_pp_434.jpg",
      "https://trutien.gamota.com/wp-content/uploads/2018/03/28619123_1971107369806596_3472030111921659591_o.jpg",
      "https://animevietsubvn.com/storage/images/tru-tien-2021/tru-tien-2021-poster.jpg",
    ]}>
    {children}
  </ImageSlideBackground>
);

// Content container component
const ContentContainer = observer(({ children }: { children: ReactNode }) => {
  const { uiStore } = useStore();
  return (
    <Animates.FadeAppear delay={0}>
      <Flex column
        bgcolor={`${uiStore.colors.appBgColor}ee`}
        height={"100vh"}
        width={"100vw"}
        position={"absolute"}
        overflow={"auto"}
        style={{
          overflowX: "hidden",
          scrollbarWidth: "thin"
        }}
      >
        {children}
      </Flex>
    </Animates.FadeAppear>
  );
});

// Main content component
const MainContent = observer(({ children }: { children: ReactNode }) => {
  const { uiStore } = useStore();
  return (
    <Flex fullWidth column>
      {uiStore.useHeader && <Header />}
      {uiStore.useMenuBar && (
        <Animates.GrowUpAppear delay={2.5}>
          <MenuBar />
        </Animates.GrowUpAppear>
      )}
      {children}
      {uiStore.useFooter && <Footer />}
    </Flex>
  );
});

// Main PageLayout component
export const PageLayout = observer(({ children }: IPageLayoutProps) => {
  return (
    <ThemeProvider>
      <MessageQueueBoundary>
        <MainContainer>
          <BackgroundImageSlide>
            <ContentContainer>
              <MainContent>
                {children}
              </MainContent>
            </ContentContainer>
          </BackgroundImageSlide>
        </MainContainer>
      </MessageQueueBoundary>
    </ThemeProvider>
  )
});