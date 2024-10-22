import { observer } from "@core-ui/react-mobx-state";
import { Flex, LazyImage } from "@core-ui/react-mui-core";
import ZaloChat from "../ZaloChat";
import FacebookChat from "../FacebookChat";
import TelegramChat from "../TelegramChat";
import { Banner } from "./Banner";
import { IntersectionObserverView } from "@core-ui/react-viewframe";
import { Introduce } from "./Introduce";
import { Animates } from "@core-ui/react-animates";
import { useStore } from "@/store/index";
import { Projects } from "./Projects";
import { Contact } from "./Contact";
import { Layers } from "@/styles/layers";
import { Products } from "./Products";
import menuIcon from "@/assets/icons/menu.svg"
import { useGlobalStyles } from "@/styles/globalStyle";

export interface IPortfolioContentProps { }

export const PortfolioContent = observer(({ }: IPortfolioContentProps) => {
  const { uiStore } = useStore();
  const globalStyles = useGlobalStyles();

  return (
    <Flex fullWidth column position={"relative"} minHeight={"100vh"} bgcolor={"#000"}
      maxWidth={"100vw"}
      overflow={"hidden"}
    >
      {!!uiStore.triggerClickAnimation && <Flex
        position={"absolute"}
        top={5}
        left={"50%"}
        center
        width={5}
        height={5}
        className="bigger"
        zIndex={Layers.layer12}
      >
        <Flex fontSize={2}>
          <Animates.GlowingBallAnim id="bg-plasma" width={5} />
        </Flex>
      </Flex>}
      <Banner />
      <div id="section-introduce"></div>
      <Flex fullWidth minHeight={600}>
        <IntersectionObserverView>
          <Animates.GrowUpAppear>
            <Introduce />
          </Animates.GrowUpAppear>
        </IntersectionObserverView>
      </Flex>
      <div id="section-projects"></div>
      <Flex fullWidth minHeight={500} justifyContent={"flex-start"}>
        <IntersectionObserverView>
          <Animates.GrowUpAppear>
            <Flex fullWidth justifyContent={"flex-start"}>
              <Projects />
            </Flex>
          </Animates.GrowUpAppear>
        </IntersectionObserverView>
      </Flex>
      <div id="section-products"></div>
      <Flex fullWidth minHeight={800}>
        <IntersectionObserverView>
          <Flex fullWidth>
            <Products />
          </Flex>
        </IntersectionObserverView>
      </Flex>
      <div id="section-contact"></div>
      <Flex fullWidth minHeight={500}>
        <IntersectionObserverView>
          <Contact />
        </IntersectionObserverView>
      </Flex>
      <Flex position={"fixed"} zIndex={Layers.layer12} bottom={0} right={0} p={2} column>
        <Flex mr={2}
          className={globalStyles.hoveredBtn}
          onClick={() => {
            uiStore.openMobileMenu = !uiStore.openMobileMenu
          }}
          cursorPointer
          border={"solid 1px #0550a590"}
          p={1}
          borderRadius={"16px"}
          style={{
            transitionDuration: "1.25s"
          }}
        >
          <LazyImage src={menuIcon} style={{ width: 24, height: 24 }} />
        </Flex>
        {!uiStore.openMobileMenu && <>
          <Flex my={2}></Flex>
          <FacebookChat />
          <Flex my={1}></Flex>
          <ZaloChat />
          <Flex my={1}></Flex>
          <TelegramChat />
        </>}
      </Flex>
    </Flex>
  )
})