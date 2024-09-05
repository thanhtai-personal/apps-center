import { observer } from "@core-ui/react-mobx-state";
import { Flex, useResponsive } from "@core-ui/react-mui-core";
import { useDeviceDetection } from "@core-ui/react-novals";

export const Header = observer(() => {

  const { tabletSizeDown } = useResponsive();

  if (tabletSizeDown) {
    return <Flex fullWidth>
      
    </Flex>
  }

  return (
    <Flex fullWidth>

    </Flex>
  )
})