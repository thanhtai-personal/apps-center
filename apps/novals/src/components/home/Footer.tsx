import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text } from "@core-ui/react-mui-core";
import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { useNovalsStore } from "@core-ui/react-novals";
import { useGlobalStyles } from "@/styles/globalStyle";
import { useStore } from "@/store/index";
import { Animates } from "@core-ui/react-animates";

export const Footer = observer(() => {
  const { categoryStore } = useNovalsStore();
  const globalStyles = useGlobalStyles();
  const { uiStore } = useStore();

  return (
    <Flex fullWidth center>
      <Flex mt={1} py={2} fullWidth center borderTop={"solid 1px rgba(255,255,255, 0.1)"} maxWidth={PAGE_MAX_WIDTH}>
        <Flex fullWidth position={"relative"} center>
          <Text className={globalStyles.textKanit12}>
            @TTH là cửa sổ đọc truyện free cho cộng đồng fan kiếm hiệp, tiên hiệp, ngôn tình.
          </Text>
        </Flex>
      </Flex >
    </Flex>
  );
});