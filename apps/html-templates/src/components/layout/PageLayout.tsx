import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core"
import { ReactNode } from "react"
import { Animates } from "@core-ui/react-animates";
import "@core-ui/react-viewframe/dist/styles.css"

// Interface for PageLayout props
export interface IPageLayoutProps {
  children: ReactNode;
}

// Main PageLayout component
export const PageLayout = observer(({ children }: IPageLayoutProps) => {
  return (<Flex fullSize center width={"100vw"} height={"100vh"} overflow={"hidden"} position={"relative"}>
    <Flex column fullWidth minHeight={"100vh"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}>
      <Animates.FadeAppear delay={0}>
        <Flex column
          height={"100vh"}
          width={"100vw"}
          position={"absolute"}
          overflow={"auto"}
          style={{
            overflowX: "hidden",
          }}
        >
          <Flex fullWidth column>
            {children}
          </Flex>
        </Flex>
      </Animates.FadeAppear>
    </Flex>
  </Flex>
  )
});