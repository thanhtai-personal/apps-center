import { useGlobalStyles } from "@/styles/globalStyle";
import { observer } from "@core-ui/react-mobx-state";
import { AppTheme, Flex, LazyImage, Text, useResponsive } from "@core-ui/react-mui-core";
import { makeStyles, createStyles } from "@core-ui/react-mui-core/style"

export const ProjectItem = observer(({
  data,
  getText
}: {
  data: any;
  getText: (key: string) => string;
}) => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const { tabletSizeDown } = useResponsive();

  return (
    <Flex fullSize p={2}>
      <Flex fullSize column
        p={3}
        bgcolor={"#000"}
        boxShadow={"0 2px 5px rgb(55, 120, 251,0.3)"}
        borderRadius={"16px"}
        overflow={"hidden"}
        className={styles.hoverCard}
      >
        <Flex center>
          {data.image && <Flex mr={2} width={tabletSizeDown ? 40 : 60}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            <LazyImage src={data.image} alt={data.name} style={{ width: tabletSizeDown ? 40 : 60 }}
              imgStyle={{ width: tabletSizeDown ? 40 : 60 }} />
          </Flex>}
          <Text className={tabletSizeDown ? globalStyles.textOrbiBold24
            : globalStyles.textOrbiBold32}>{getText(data.name)}</Text>
        </Flex>
        <Flex fullWidth mt={4}>
          <Text
            color={"#FFFFDD"}
            textAlign={"left"}
            className={tabletSizeDown ? globalStyles.textKanit24
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
        transform: "scaleX(1.01)"
      }
    }
  }))