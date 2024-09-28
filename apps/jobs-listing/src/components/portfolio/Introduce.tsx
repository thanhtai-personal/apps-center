import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";

export const Introduce = observer(() => {

  return (
    <Flex fullWidth center>
      <Flex fullWidth maxWidth={PAGE_MAX_WIDTH} column>
        
      </Flex>
    </Flex>
  )
})