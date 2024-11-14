import { useStore } from "@/store/index";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core"
import { ReactNode } from "react"
import { Animates } from "@core-ui/react-animates";
import { ImageSlideBackground } from "@core-ui/react-viewframe";
import "@core-ui/react-viewframe/dist/styles.css"

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
// Content container component
const ContentContainer = observer(({ children }: { children: ReactNode }) => {
  const { uiStore } = useStore();
  return (
    <Animates.FadeAppear delay={0}>
      <Flex column
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
  return (
    <Flex fullWidth column>
      {children}
    </Flex>
  );
});

// Main PageLayout component
export const PageLayout = observer(({ children }: IPageLayoutProps) => {
  return (
    <MainContainer>
        <ContentContainer>
          <MainContent>
            {children}
          </MainContent>
        </ContentContainer>
    </MainContainer>
  )
});