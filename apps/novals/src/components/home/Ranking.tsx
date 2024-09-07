import { observer } from "@core-ui/react-mobx-state";
import { AppTheme, Flex, LazyImage, OutlinedButton, Text } from "@core-ui/react-mui-core";
import { PAGE_MAX_WIDTH } from "@/utils/constants";
import Carousel from 'react-material-ui-carousel';
import { useNovalsStore } from "@core-ui/react-novals";
import { Link } from "@core-ui/react-core";
import { useGlobalStyles } from "@/styles/globalStyle";
import clsx from "@core-ui/react-mui-core/clsx";
import { Grid } from "@core-ui/react-mui-core/materials";
import { useStore } from "@/store/index";
import { Animates } from "@core-ui/react-animates";
import sword2 from "@/assets/icons/sword2.png"
import { makeStyles, createStyles } from "@core-ui/react-mui-core/style"


export const Ranking = observer(() => {
  const { categoryStore } = useNovalsStore();
  const globalStyles = useGlobalStyles();
  const { uiStore } = useStore();

  return (
    <Flex fullWidth center>
      <Flex mt={1} py={2} fullWidth center borderTop={"solid 1px rgba(255,255,255, 0.1)"} maxWidth={PAGE_MAX_WIDTH}>
        <Flex flex={1} column></Flex>

        <Flex flex={1} column></Flex>

        <Flex flex={1} column></Flex>
        
        <Flex flex={1} column></Flex>
      </Flex >
    </Flex>
  );
});