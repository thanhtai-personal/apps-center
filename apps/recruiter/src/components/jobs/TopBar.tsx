import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, useResponsive } from "@core-ui/react-mui-core";

export const TopBar = observer(() => {
  const { tabletSizeDown } = useResponsive();

  return (
    <Flex fullWidth center py={2}>
      <Flex fullWidth maxWidth={PAGE_MAX_WIDTH} px={2} center>
        <Flex
          fullWidth
          maxWidth={800}
          minHeight={40}
          centerY
          bgcolor={tabletSizeDown ? "unset" : "rgba(255,255,255,0.25)"}
          borderRadius={"16px"}
          style={{
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            overflow: "hidden"
          }}
        ></Flex>
      </Flex>
    </Flex>
  )
})