import "@core-ui/react-animates/dist/bgClouds.style.css"
// import "@core-ui/react-animates/dist/meteor/WaterMeteor.style.css"

import cloudBg1 from "@/assets/images/bg/clouds_1.png"
import cloudBg2 from "@/assets/images/bg/clouds_2.png"
import cloudBg3 from "@/assets/images/bg/clouds_3.png"
import skillsetPng from "@/assets/images/skillset.svg"
import smokePng from "@/assets/images/smoke.png"
import pageSpeedRsImg from "@/assets/images/performance-result.png"

import { Animates, GAME, Meteor } from "@core-ui/react-animates";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, LazyImage, Text, useResponsive } from "@core-ui/react-mui-core";
import { IntersectionObserverView } from "@core-ui/react-viewframe";
import { useGlobalStyles } from "@/styles/globalStyle";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "@core-ui/react-core";
import shootAudio from "@/assets/game/sound/shoot.mp3";
import pingAudio from "@/assets/game/sound/ping.mp3";
import waterAudio from "@/assets/game/sound/water.mp3";
import cavePng from "@/assets/game/images/cave.png";
import sonaPng from "@/assets/game/images/sonar.png";
import clamGif from "@/assets/game/images/clam.gif";
import urchinGif from "@/assets/game/images/urchin.gif";
import whaleGif from "@/assets/game/images/whale.gif";
import subGif from "@/assets/game/images/sub.gif";
import wall1Jpg from "@/assets/game/images/wall1.jpg";
// import universePng from "@/assets/game/images/universe.jpg";
import spacearoundGif from "@/assets/game/images/spacearound.gif";
import spacecraftGif from "@/assets/game/images/spacecraft.gif";
import meteorGif from "@/assets/game/images/meteor.gif";

export const Products = observer(() => {
  const { tabletSizeDown, md1160 } = useResponsive({ md1160: 1160 });
  const globalStyles = useGlobalStyles();
  const { getText } = useLanguage(productsTextObj)

  return (
    <Flex column fullSize position={"relative"}
      justifyContent={"flex-end"}
    >
      <Flex fullWidth height={350} position={"relative"}
        className="water-meteor-bg"
        style={{
          filter: "blur(0px)",
          fontSize: 40,
        }}
      >
        <GAME.Seabed resources={{
          audio: {
            ping: pingAudio,
            shoot: shootAudio,
            water: waterAudio
          },
          images: {
            cave: cavePng,
            sonar: sonaPng,
            clam: "",
            urchin: meteorGif,
            whale: meteorGif,
            sub: spacecraftGif,
            wall: spacearoundGif,//universePng
          }
        }} />
      </Flex>
      <Flex fullWidth>
        <Flex fullWidth centerY justifyContent={"space-between"} p={4}
          bgcolor={"#00000088"}
          borderRadius={2}
          column
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          position={"relative"}
        >
          <Flex fullWidth center my={10}>
            <IntersectionObserverView isInfinite={false}>
              <Animates.SlideRightAppear duration={2}>
                <LazyImage src={skillsetPng} className="ufo-animate" />
              </Animates.SlideRightAppear>
            </IntersectionObserverView>
          </Flex>

          <Flex fullWidth column>
            <Flex fullWidth center>
              <Text className={tabletSizeDown ? globalStyles.textOrbiBold24
                : globalStyles.textOrbiBold32}>{getText("Products")}</Text>
            </Flex>
            <Flex fullWidth column mb={tabletSizeDown ? 2 : 6} mt={4}>
              <Flex fullWidth px={2}>
                <Flex column
                  bgcolor={"#000"}
                  borderRadius={"16px"}
                  overflow={"hidden"}
                  p={1}
                  py={4}
                  fullWidth
                  style={{
                    backdropFilter: "blur(4px)"
                  }}
                  data-aos="fade-up"
                  data-aos-anchor-placement="center-center"
                  data-aos-duration="800"
                >
                  <Flex fullWidth center>
                    <Link to="https://pagespeed.web.dev/analysis/https-my-projects-delta-orcin-vercel-app-me/vcos3fthy7?form_factor=desktop">
                      <Text
                        color="#DD5599"
                        className={globalStyles.textKanitBold24} fontStyle={"italic"}
                        style={{
                          textDecoration: "underline",
                          textTransform: "uppercase",
                        }}
                      >
                        {getText("Page speed test result")}
                      </Text>
                    </Link>
                  </Flex>

                  <Flex fullWidth column={md1160} mt={4}>
                    <Flex flex={1} center p={1}>
                      <Text className={globalStyles.textKanitBold18}>
                        {getText("Good page performance")}
                      </Text>
                    </Flex>
                    <Flex flex={1} center p={1}>
                      <Text className={globalStyles.textKanitBold18}>
                        {getText("Best User Accessibility")}
                      </Text>
                    </Flex>
                    <Flex flex={1} center p={1}>
                      <Text className={globalStyles.textKanitBold18}>
                        {getText("Best Coding practices")}
                      </Text>
                    </Flex>
                    <Flex flex={1} center p={1}>
                      <Text className={globalStyles.textKanitBold18}>
                        {getText("Maximize SEO performance")}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex fullWidth mt={6}>
                    <LazyImage
                      src={pageSpeedRsImg} alt="page speed result"
                      style={{
                        borderRadius: "16px",
                        boxShadow: "rgba(127, 229, 247, 0.74) 0 0 0.15em 0.15em",
                      }}
                    />
                  </Flex>

                </Flex>
              </Flex>
            </Flex>
          </Flex>
          {!tabletSizeDown && <Flex position={"absolute"} fullSize bottom={0} left={0}
            style={{ pointerEvents: "none" }}
          >
            <Animates.Smoke2 id="smoke-bg"
              src={smokePng}
              style={{
                width: "100%",
              }}
              config={{
                x: window.innerWidth,
                y: 0,
                size: 70,
                particles: 180,
                speed: {
                  x: -3,
                  y: 9,
                  fade: 200,
                  acceleration: 200
                }
              }}
            />
          </Flex>}
          <Flex fullSize position={"absolute"} zIndex={999} >
            <Meteor.MouseEffect id={"product-moust-effect"} style={{ width: "100%", height: "100%" }} />
          </Flex>
        </Flex>
      </Flex>

      <Flex fullWidth height={350} position={"relative"}
        className="water-meteor-bg"
        style={{
          filter: "blur(0px)",
          fontSize: 40,
        }}
      >
        <GAME.Seabed resources={{
          audio: {
            ping: pingAudio,
            shoot: shootAudio,
            water: waterAudio
          },
          images: {
            cave: cavePng,
            sonar: sonaPng,
            clam: clamGif,
            urchin: urchinGif,
            whale: whaleGif,
            sub: subGif,
            wall: wall1Jpg
          }
        }} />
      </Flex>

      <Flex fullWidth height={400} position={"relative"} style={{
        pointerEvents: "none",
        opacity: 0.4,
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

const productsTextObj = {
  "VI": {
    Products: "Sản phẩm",
    "Page speed test result": "Kết quả đánh giá hiệu suất",
    "Good page performance": "Hiệu suất cao",
    "Best User Accessibility": "Truy cập dể dàng",
    "Best Coding practices": "Phương pháp tốt nhất",
    "Maximize SEO performance": "Tối đá hóa SEO"
  }
}