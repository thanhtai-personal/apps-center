import { useGlobalStyles } from "@/styles/globalStyle";
import { AOS } from "@core-ui/react-animates";
import { observer } from "@core-ui/react-mobx-state";
import { AppTheme, Flex, LazyImage, Text, useResponsive } from "@core-ui/react-mui-core";
import { makeStyles, createStyles } from "@core-ui/react-mui-core/style"
import { useEffect } from "react";

export const ProjectItem = observer(({
  data,
  getText,
  index
}: {
  data: any;
  getText: (key: string) => string;
  index: number;
}) => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const { tabletSizeDown } = useResponsive();

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <Flex fullSize p={2}
      data-aos={index % 2 === 0 ? "zoom-in-right" : "zoom-in-left"}
      data-aos-anchor-placement="top-center"
      data-aos-duration="800"
    >
      <Flex fullSize column
        p={tabletSizeDown ? 1 : 3}
        bgcolor={"#000000bb"}
        boxShadow={"0 2px 5px rgb(55, 120, 251,0.3)"}
        borderRadius={"16px"}
        overflow={"hidden"}
        className={styles.hoverCard}
        style={{
          backdropFilter: "blur(4px)"
        }}
      >
        <Flex px={tabletSizeDown ? 0 : 4} fullWidth center>
          <Flex
            data-aos={index % 2 === 0 ? "flip-right" : "flip-left"}
            data-aos-anchor-placement="top-center"
            data-aos-duration="400"
          >
            {data.iframe ? data.iframe(tabletSizeDown) :
              <LazyImage src={data.image} alt={data.name} style={{ height: "250px" }}
                imgStyle={{ height: "250px" }} />
            }
          </Flex>
        </Flex>

        <Flex center mt={4}>
          <Text className={tabletSizeDown ? globalStyles.textOrbiBold24
            : globalStyles.textOrbiBold32}>{getText(data.name)}</Text>
        </Flex>
        <Flex fullWidth mt={4}>
          <Text
            color={"#FFFFDD"}
            textAlign={"left"}
            className={tabletSizeDown ? globalStyles.textKanit16
              : globalStyles.textKanit18}
            whiteSpace={"pre-line"}
            style={{
              lineHeight: "125%"
            }}>{getText(data.description)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
})

const useStyles = makeStyles((_theme: AppTheme) =>
  createStyles({
    hoverCard: {
      transitionDuration: "0.25s",
      "&:hover": {
        transitionDuration: "0.25s",
        transform: "scaleX(1.05)"
      }
    }
  }))