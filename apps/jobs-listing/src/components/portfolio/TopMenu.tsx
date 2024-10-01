import { useGlobalStyles } from "@/styles/globalStyle";
import { Flex, Text, useResponsive } from "@core-ui/react-mui-core";
import { goToSection } from "@/utils/index";
import { AppTheme } from "@core-ui/react-mui-core";
import { makeStyles, createStyles } from "@core-ui/react-mui-core/style"
import clsx from "@core-ui/react-mui-core/clsx";
import { Animates } from "@core-ui/react-animates";
import { useStore } from "@/store/index";
import { observer } from "@core-ui/react-mobx-state";
import { useEffect, useMemo } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Drawer, Box, List, ListItem
} from "@core-ui/react-mui-core/materials";
import closeIcon from "@/assets/icons/close.svg"
import FacebookChat from "../FacebookChat";
import ZaloChat from "../ZaloChat";
import TelegramChat from "../TelegramChat";

const menuItems = [{
  id: 1,
  label: 'Welcome',
  targetContent: "section-welcome"
}, {
  id: 2,
  label: 'Introduce',
  targetContent: "section-introduce"
}, {
  id: 3,
  label: 'Projects',
  targetContent: "section-projects"
}, {
  id: 4,
  label: 'Products',
  targetContent: "section-products"
}, {
  id: 5,
  label: 'Contact',
  targetContent: "section-contact"
},
]

const languageTexts = {
  VI: {
    Welcome: "Welcome",
    Introduce: "Giới thiệu",
    Projects: "Dự án",
    Products: "Sản phẩm",
    Contact: "Liên hệ",
  }
}

export const TopMenu = observer(() => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const { uiStore } = useStore();
  const { getText, setLanguage, language } = useLanguage(languageTexts);
  const { tabletSizeDown } = useResponsive();

  useEffect(() => {
    let toId;
    if (uiStore.triggerClickAnimation > 0) {
      toId = setTimeout(() => {
        uiStore.triggerClickAnimation = 0;
      }, 2000);
    }

    return () => {
      toId && clearTimeout(toId)
    }
  }, [uiStore.triggerClickAnimation])

  return (
    <Flex
      fullWidth
      maxWidth={800}
      centerY
      bgcolor={tabletSizeDown ? "unset" : "rgba(255,255,255,0.25)"}
      borderRadius={"16px"}
      style={{
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        overflow: "hidden"
      }}
    >
      {!!uiStore.triggerClickAnimation && <Flex
        position={"absolute"}
        top={5}
        right={0}
        center
        width={5}
        height={5}
        className="bigger"
      >
        <Flex fontSize={2}>
          <Animates.GlowingBallAnim id="bg-plasma" width={5} />
        </Flex>
      </Flex>}
      <Flex fullWidth centerY centerX={tabletSizeDown} position={"relative"}>
        {!tabletSizeDown && <Flex fullSize m={0} center style={{
          maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10.5%, rgb(0, 0, 0) 90.5%, rgba(0, 0, 0, 0) 100%)'
          , overflow: 'hidden'
        }}
          px={2}
          py={1}
        >
          <Flex fullSize center>
            {menuItems.map((item) => (
              <Flex className={styles.hoveredButton} mx={2} key={item.id} cursorPointer center
                onClick={() => {
                  goToSection(item.targetContent);
                }}
              >
                <Text className={clsx(globalStyles.textKanitBold16)}>{getText(item.label)}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>}
        {tabletSizeDown ?
          <Animates.RippleButton id="language"
            onClick={() => {
              if (uiStore.triggerClickAnimation > 0) return;
              uiStore.triggerClickAnimation = 1;
              setLanguage(language && language === "EN" ? "VI" : "EN");
            }}
            style={{
              padding: "8px 16px",
              minWidth: "150px",
              borderRadius: "16px",
              background: "rgba(99,99,199, 0.3)",
              borderColor: "rgba(99,99,199, 0.9)",
            }}>
            <Text className={clsx(globalStyles.textKanitBold16)}>
              {language || "EN"}
            </Text>
          </Animates.RippleButton>
          : <Flex cursorPointer onClick={() => {
            if (uiStore.triggerClickAnimation > 0) return;
            uiStore.triggerClickAnimation = 1;
            setLanguage(language && language === "VI" ? "EN" : "VI");
          }}
            position={tabletSizeDown ? "static" : "absolute"}
            right={0}
            fullHeight
            px={4}
            py={1}
            center
            borderRadius={4}
            bgcolor={"red"}
          >
            <Text className={clsx(globalStyles.textKanitBold16)}>
              {language || "EN"}
            </Text>
          </Flex>}
      </Flex>
      <Drawer open={!!uiStore.openMobileMenu} onClose={() => { uiStore.openMobileMenu = false }}
        anchor={"left"}
      >
        <Flex fullSize column bgcolor={"#000"} minWidth={278}>
          <Flex centerY fullWidth justifyContent={"space-between"} p={1}>
            <Flex></Flex>
            <Flex cursorPointer center p={0.5} onClick={() => { uiStore.openMobileMenu = false }}>
              <img src={closeIcon} alt="close icon" style={{ width: 24, height: 24 }} />
            </Flex>
          </Flex>

          <Box
            sx={{ width: 278, background: "#000" }}
            role="presentation"
          >
            <List sx={{ background: "#000" }}>
              {menuItems.map(menuItem => (
                <ListItem key={menuItem.id}>
                  <Flex fullWidth cursorPointer onClick={() => {
                    uiStore.activeMenu = menuItem.id;
                    goToSection(menuItem.targetContent)
                  }}
                    justifyContent={"flex-end"}
                  >
                    <Animates.RippleButton id={`${menuItem.id}`}
                      style={{
                        width: "100%",
                        maxWidth: 300,
                        borderRadius: "8px",
                        padding: "8px 16px",
                        color: "white",
                        textTransform: "uppercase",
                        fontWeight: 800,
                        fontSize: 14,
                        background: uiStore.activeMenu === menuItem.id
                          ? "rgba(99,99,199, 0.3)" : "rgba(99,99,99, 0.3)",
                        borderColor: menuItem.id
                          ? "rgba(99,99,199, 0.9)" : "rgba(99,99,99, 0.9)",
                      }}
                    >
                      <Text ml={1} className={uiStore.activeMenu === menuItem.id
                        ? globalStyles.textKanitBold14 : globalStyles.textKanit14}>
                        {getText(menuItem.label)}
                      </Text>
                    </Animates.RippleButton>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </Box>

          <Flex position={"absolute"} fullWidth bottom={10}
            centerY justifyContent={"flex-end"}
            px={2}
          >
            <FacebookChat />
            <Flex mx={1}></Flex>
            <ZaloChat />
            <Flex mx={1}></Flex>
            <TelegramChat />
          </Flex>
        </Flex>
      </Drawer>
    </Flex>

  )
})

const useStyles = makeStyles((_theme: AppTheme) =>
  createStyles({
    hoveredButton: {
      "&:hover>div>div": {
        color: "#FFAA00 !important"
      }
    }
  }))