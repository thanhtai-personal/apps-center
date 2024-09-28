import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import ZaloChat from "../ZaloChat";
import FacebookChat from "../FacebookChat";
import TelegramChat from "../TelegramChat";
import { PAGE_MAX_WIDTH } from "@/utils/constants";

export interface IHomePageContentProps { }

export const HomePageContent = observer(({ }: IHomePageContentProps) => {


  return (
    <Flex fullWidth column position={"relative"} minHeight={"100vh"}>
      <Flex fullWidth maxWidth={PAGE_MAX_WIDTH} column>
        
      </Flex>
      <Flex position={"absolute"} bottom={0} right={0} p={2} column>
        <FacebookChat />
        <Flex my={1}></Flex>
        <ZaloChat />
        <Flex my={1}></Flex>
        <TelegramChat />
      </Flex>
    </Flex>
  )
})