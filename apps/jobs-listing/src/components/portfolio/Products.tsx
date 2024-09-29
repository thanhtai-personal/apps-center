import "@core-ui/react-animates/dist/bgClouds.style.css"

import cloudBg1 from "@/assets/images/bg/clouds_1.png"
import cloudBg2 from "@/assets/images/bg/clouds_2.png"
import cloudBg3 from "@/assets/images/bg/clouds_3.png"
import skillsetPng from "@/assets/images/skillset.svg"
import smokePng from "@/assets/images/smoke.png"
import pageSpeedRsImg from "@/assets/images/performance-result.png"

import { Animates } from "@core-ui/react-animates";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, LazyImage, Text, useResponsive } from "@core-ui/react-mui-core";
import { IntersectionObserverView } from "@core-ui/react-viewframe";
import { useGlobalStyles } from "@/styles/globalStyle";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "@core-ui/react-core";

export const Products = observer(() => {
  const { tabletSizeDown, md1160 } = useResponsive({ md1160: 1160 });
  const globalStyles = useGlobalStyles();
  const { getText } = useLanguage(productsTextObj)

  return (
    <Flex column fullSize position={"relative"}
      justifyContent={"flex-end"}
    >
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
              <Flex fullWidth minHeight={250}>
                <IntersectionObserverView>
                  <Flex fullWidth px={2}>
                    <Animates.GrowUpAppear>
                      <Flex column
                        bgcolor={"#000"}
                        boxShadow={"0 2px 5px rgb(55, 120, 251,0.3)"}
                        borderRadius={"16px"}
                        overflow={"hidden"}
                        minHeight={250}
                        p={1}
                        py={4}
                        fullWidth
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
                          />
                        </Flex>
                        
                      </Flex>
                    </Animates.GrowUpAppear>
                  </Flex>
                </IntersectionObserverView>
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
                  y: 3,
                  fade: 200,
                  acceleration: 200
                }
              }}
            />
          </Flex>}
        </Flex>
      </Flex>
      {<Flex fullWidth height={400} position={"relative"} style={{
        pointerEvents: "none",
        opacity: 0.4
      }}>
        <Animates.BgClouds cloudsImageUrl={[
          cloudBg1,
          cloudBg2,
          cloudBg3
        ]} />
      </Flex>}
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