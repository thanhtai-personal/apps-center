import { Animates } from "@core-ui/react-animates";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, LazyImage } from "@core-ui/react-mui-core";
import cloudBg1 from "@/assets/images/bg/clouds_1.png"
import cloudBg2 from "@/assets/images/bg/clouds_2.png"
import cloudBg3 from "@/assets/images/bg/clouds_3.png"
import skillsetPng from "@/assets/images/skillset.svg"
import "@core-ui/react-animates/dist/bgClouds.style.css"

export const Products = observer(() => {

  return (
    <Flex column fullSize position={"relative"}
      justifyContent={"flex-end"}
    >
      <Flex fullWidth>
        <Flex fullWidth centerY justifyContent={"space-between"} p={4}
          bgcolor={"#00000088"}
          borderRadius={2}
          style={{
            backdropFilter: "blur(8px)",
          }}
          position={"relative"}
        >
          <Flex fullWidth center my={10}>
            <LazyImage src={skillsetPng} className="ufo-animate" />
          </Flex>
          <Flex position={"absolute"} fullSize bottom={0} left={0}>
            <Animates.Smoke2 id="smoke-bg" style={{
              width: "100%",
            }} />
          </Flex>
        </Flex>
      </Flex>
      <Flex fullWidth height={400} position={"relative"} style={{
        pointerEvents: "none",
        opacity: 0.4
      }}>
        <Animates.BgClouds cloudsImageUrl={[
          cloudBg1,
          cloudBg2,
          cloudBg3
        ]} />
      </Flex>
    </Flex>
  )
})