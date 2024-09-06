import { useGlobalStyles } from "@/styles/globalStyle";
import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text } from "@core-ui/react-mui-core";
import clsx from "@core-ui/react-mui-core/clsx";
import menuIcon from "@/assets/icons/home/endless.svg"
import { useStore } from "@/store/index";

export const MenuBar = observer(() => {

  const globalStyles = useGlobalStyles();
  const { uiStore } = useStore();

  return (
    <Flex fullWidth center>
      <Flex fullWidth justifyContent={"space-between"} maxWidth={PAGE_MAX_WIDTH}
        border="solid 1px rgba(255,255,255, 0.2)"
        bgcolor={uiStore.colors.background1}
        p={1}
        style={{
          borderLeft: "none",
          borderRight: "none",
          borderRadius: "8px",
          boxShadow: "rgba(127, 229, 247, 0.74) 0 0 0.15em 0.15em"
        }}
      >
        <Flex flex={1} p={1} centerY cursorPointer
          className={clsx(globalStyles.hoverUnderLine, globalStyles.hoverTransition)}
        >
          <img src={menuIcon} style={{ height: 24 }} />
          <Text ml={1} className={globalStyles.textOrbi14}>Thể loại</Text>
        </Flex>

        <Flex center flex={3}>
          <Flex p={1} centerY cursorPointer
            className={clsx(globalStyles.hoverUnderLine, globalStyles.hoverTransition)}
          >
            <Text ml={1} className={globalStyles.textCharka14}>Bảng xếp hạng</Text>
          </Flex>
          <Flex p={1} centerY cursorPointer
            className={clsx(globalStyles.hoverUnderLine, globalStyles.hoverTransition)}
          >
            <Text ml={1} className={globalStyles.textCharka14}>Bộ lọc</Text>
          </Flex>
          <Flex p={1} centerY cursorPointer
            className={clsx(globalStyles.hoverUnderLine, globalStyles.hoverTransition)}
          >
            <Text ml={1} className={globalStyles.textCharka14}>Reviews</Text>
          </Flex>
        </Flex>

        <Flex flex={1} centerY justifyContent={"flex-end"}>
          <Flex p={1} centerY cursorPointer
            className={clsx(globalStyles.hoverUnderLine, globalStyles.hoverTransition)}
          >
            <img src={menuIcon} style={{ height: 24 }} />
            <Text ml={1} className={globalStyles.textOrbi14}>Cửa hàng</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
})