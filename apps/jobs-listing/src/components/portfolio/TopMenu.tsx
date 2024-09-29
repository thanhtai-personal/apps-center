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
      bgcolor={"rgba(255,255,255,0.25)"}
      borderRadius={"16px"}
      style={{
        backdropFilter: "blur(4px)",
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
      <Flex fullWidth centerY position={"relative"}>
        <Flex fullSize m={0} center style={{
          maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10.5%, rgb(0, 0, 0) 90.5%, rgba(0, 0, 0, 0) 100%)'
          , overflow: 'hidden'
        }}
          px={2}
          py={1}
        >
          {!tabletSizeDown && <Flex fullSize center>
            {menuItems.map((item) => (
              <Flex className={styles.hoveredButton} mx={2} key={item.id} cursorPointer center
                onClick={() => {
                  goToSection(item.targetContent);
                }}
              >
                <Text className={clsx(globalStyles.textKanitBold16)}>{getText(item.label)}</Text>
              </Flex>
            ))}
          </Flex>}
        </Flex>
        <Flex cursorPointer onClick={() => {
          if (uiStore.triggerClickAnimation > 0) return;
          uiStore.triggerClickAnimation = 1;
          setLanguage(language && language === "EN" ? "VI" : "EN");
        }}
          position="absolute"
          right={0}
          fullHeight
          px={4}
          center
          borderRadius={4}
          bgcolor={"red"}
        >
          <Text className={clsx(globalStyles.textKanitBold16)}>
            {language || "EN"}
          </Text>
        </Flex>
      </Flex>
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