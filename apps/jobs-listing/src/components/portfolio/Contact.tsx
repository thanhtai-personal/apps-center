import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { Animates, FireWorkMask } from "@core-ui/react-animates";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text, useResponsive } from "@core-ui/react-mui-core";
import reflectBg from "@/assets/images/hcm.png"
import { useGlobalStyles } from "@/styles/globalStyle";
import { Layers } from "@/styles/layers";
import { formatDate } from "date-fns";
import { formatFullDate } from "@core-utils/utils-helpers";

export const Contact = observer(() => {
  const globalStyles = useGlobalStyles();
  const { tabletSizeDown } = useResponsive();

  return (
    <Flex fullWidth mt={12} column center>
      <Flex fullWidth height={1200} position={"relative"}>
        {tabletSizeDown ? <Flex fullSize alignItems={"flex-end"}>
          <img src={reflectBg} style={{
            width: "100%",
            height: "40%",
          }} />
        </Flex> : <FireWorkMask id="contact-fw" config={{}}>
          <Flex fullSize alignItems={"flex-end"}>
            <img src={reflectBg} style={{
              width: "100%",
              height: "40%",
            }} />
          </Flex>
        </FireWorkMask>}
        <Flex position={"absolute"} fullSize zIndex={Layers.layer11} center>
          <Flex fullWidth maxWidth={PAGE_MAX_WIDTH} column justifyContent={"flex-end"} pb={100}>
            <Flex fullSize position={"relative"}>
              <Flex fullWidth position={"absolute"} px={2}>

                <Flex fullWidth centerY justifyContent={"space-between"} p={4}
                  alignItems={"flex-end"}
                  minHeight={350} bgcolor={"#000000DD"}
                  boxShadow={"0 2px 5px rgb(55, 120, 251,0.3)"}
                  borderRadius={2}
                  style={{
                    backdropFilter: "blur(2px)"
                  }}
                >
                  <Text className={globalStyles.textKanit14} color={"#999999"}>
                    Created by <span style={{ color: "#fff" }}>@Kai.R</span>
                  </Text>
                  <Text className={globalStyles.textKanit14} color={"#999999"}>
                    {formatFullDate(new Date(), {})}
                  </Text>
                </Flex>

              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex fullWidth position={"relative"} center minHeight={200} mt={2}>
        <Animates.WaterReflection bgImage={reflectBg} ratio={25} />
      </Flex>
    </Flex>
  )
})