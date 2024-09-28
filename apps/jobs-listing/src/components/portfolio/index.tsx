import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import ZaloChat from "../ZaloChat";
import FacebookChat from "../FacebookChat";
import TelegramChat from "../TelegramChat";
import { Banner } from "./Banner";
import { IntersectionObserverView } from "@core-ui/react-viewframe";
import { Introduce } from "./Introduce";

export interface IPortfolioContentProps { }

export const PortfolioContent = observer(({ }: IPortfolioContentProps) => {


  return (
    <Flex fullWidth column position={"relative"} minHeight={"100vh"} bgcolor={"#000"}
      maxWidth={"100vw"}
      overflow={"hidden"}
    >
      <Banner />
      <div id="section-introduce"></div>
      <Flex fullWidth minHeight={500}>
        <IntersectionObserverView>
          <Introduce />
        </IntersectionObserverView>
      </Flex>
      <div id="section-experience"></div>
      <Flex fullWidth minHeight={500}>
        {/* <IntersectionObserverView>
          <Introduce />
        </IntersectionObserverView> */}
      </Flex>
      <div id="section-projects"></div>
      <Flex fullWidth minHeight={500}>
        {/* <IntersectionObserverView>
          <Introduce />
        </IntersectionObserverView> */}
      </Flex>
      <div id="section-contact"></div>
      <Flex fullWidth minHeight={500}>
        {/* <IntersectionObserverView>
          <Introduce />
        </IntersectionObserverView> */}
      </Flex>
      <Flex position={"fixed"} bottom={0} right={0} p={2} column>
        <FacebookChat />
        <Flex my={1}></Flex>
        <ZaloChat />
        <Flex my={1}></Flex>
        <TelegramChat />
      </Flex>
    </Flex>
  )
})