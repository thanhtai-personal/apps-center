import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { Animates, FireWorkMask } from "@core-ui/react-animates";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text, useResponsive } from "@core-ui/react-mui-core";
import reflectBg from "@/assets/images/hcm.png"
import { useGlobalStyles } from "@/styles/globalStyle";
import { Layers } from "@/styles/layers";
import { formatFullDate } from "@core-utils/utils-helpers";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "@core-ui/react-core";

export const Contact = observer(() => {
  const globalStyles = useGlobalStyles();
  const { tabletSizeDown } = useResponsive();
  const { getText } = useLanguage(contactLangObj)

  return (
    <Flex fullWidth mt={2} column center>
      <Flex fullWidth height={1000} position={"relative"}>
        {tabletSizeDown ? <Flex fullSize alignItems={"flex-end"}>
          <img src={reflectBg} alt="water reflect background" style={{
            width: "100%",
            height: "40%",
          }} />
        </Flex> : <FireWorkMask id="contact-fw" config={{}}>
          <Flex fullSize alignItems={"flex-end"}>
            <img src={reflectBg} alt="water reflect background" style={{
              width: "100%",
              height: "40%",
            }} />
          </Flex>
        </FireWorkMask>}
        <Flex position={"absolute"} fullSize zIndex={Layers.layer11} center>
          <Flex fullWidth maxWidth={PAGE_MAX_WIDTH} column justifyContent={"flex-end"} pb={200}>
            <Flex fullSize position={"relative"}>
              <Flex fullWidth position={"absolute"} px={2} column>
                <Flex fullWidth column
                  p={4}
                  bgcolor={"#000000DD"}
                  boxShadow={"0 2px 5px rgb(55, 120, 251,0.3)"}
                  borderRadius={2}
                  style={{
                    backdropFilter: "blur(2px)",
                    WebkitBackdropFilter: "blur(2px)"
                  }}
                  data-aos={"fade-up"}
                  data-aos-duration="400"
                >
                  <Flex fullWidth column center={tabletSizeDown}
                    justifyContent={tabletSizeDown ? "center" : "space-between"}
                  >
                    <Flex column center>
                      <Text className={globalStyles.textOrbiBold24} color={"#ffffff"}
                        textTransform={"uppercase"}
                        textAlign={"center"}
                      >
                        {getText("Projects")}
                      </Text>
                      <Flex fullWidth border={"solid 2px rgba(255,255,255, 0.1)"} mt={1} mb={2}></Flex>
                      <Flex fullWidth center column={tabletSizeDown}>
                        <Flex flex={1} px={2} column
                          alignItems={tabletSizeDown ? "center" : "flex-end"}>
                          {/* <Flex my={0.5}></Flex>
                          <Animates.RippleButton id="project-1"
                            style={{ padding: "8px 16px", borderRadius: "8px" }}
                          >
                            <Link to="https://www.taitran.dev/hptool" target="_blank">
                              <Text className={globalStyles.textKanit18} color={"#cccccc"}
                                textTransform={"uppercase"}
                              >
                                {getText("HP-Tools")}
                              </Text>
                            </Link>
                          </Animates.RippleButton>

                          <Flex my={0.5}></Flex>
                          <Animates.RippleButton id="project-2"
                            style={{ padding: "8px 16px", borderRadius: "8px" }}
                          >
                            <Link to="https://www.taitran.dev/me" target="_blank">
                              <Text className={globalStyles.textKanit18} color={"#cccccc"}
                                textTransform={"uppercase"}
                              >
                                {getText("Portfolio page")}
                              </Text>
                            </Link>
                          </Animates.RippleButton>

                          <Flex my={0.5}></Flex>
                          <Animates.RippleButton id="project-3"
                            style={{ padding: "8px 16px", borderRadius: "8px" }}
                          >
                            <Link to="https://www.taitran.dev/novels" target="_blank">
                              <Text className={globalStyles.textKanit18} color={"#cccccc"}
                                textTransform={"uppercase"}
                              >
                                {getText("Novels online page")}
                              </Text>
                            </Link>
                          </Animates.RippleButton> */}

                          <Flex my={0.5}></Flex>
                          <Animates.RippleButton id="project-4"
                            style={{ padding: "8px 16px", borderRadius: "8px" }}
                          >
                            <Link to="http://34.135.118.246:5173/jobs" target="_blank">
                              <Text className={globalStyles.textKanit18} color={"#cccccc"}
                                textTransform={"uppercase"}
                              >
                                {getText("Jobs Seeker online page")}
                              </Text>
                            </Link>
                          </Animates.RippleButton>

                          {/* <Flex my={0.5}></Flex>
                          <Animates.RippleButton id="project-5"
                            style={{ padding: "8px 16px", borderRadius: "8px" }}
                          >
                            <Link to="/soccer-scores" target="_blank">
                              <Text className={globalStyles.textKanit18} color={"#cccccc"}
                                textTransform={"uppercase"}
                              >
                                {getText("Soccer score online page")}
                              </Text>
                            </Link>
                          </Animates.RippleButton> */}
                        </Flex>

                        <Flex flex={1} px={2} column alignItems={tabletSizeDown ? "center" : "flex-start"}>

                          {/* <Flex my={0.5}></Flex>
                          <Animates.RippleButton id="project-8"
                            style={{ padding: "8px 16px", borderRadius: "8px" }}
                          >
                            <Link to="/smart-docs" target="_blank">
                              <Text className={globalStyles.textKanit18} color={"#cccccc"}
                                textTransform={"uppercase"}
                              >
                                {getText("Smart-docs")}
                              </Text>
                            </Link>
                          </Animates.RippleButton>

                          <Flex my={0.5}></Flex>
                          <Animates.RippleButton id="project-9"
                            style={{ padding: "8px 16px", borderRadius: "8px" }}
                          >
                            <Link to="/universe" target="_blank">
                              <Text className={globalStyles.textKanit18} color={"#cccccc"}
                                textTransform={"uppercase"}
                              >
                                {getText("Portfolio-v2")}
                              </Text>
                            </Link>
                          </Animates.RippleButton>

                          <Flex my={0.5}></Flex>
                          <Animates.RippleButton id="project-10"
                            style={{ padding: "8px 16px", borderRadius: "8px" }}
                          >
                            <Link to="/portfolio" target="_blank">
                              <Text className={globalStyles.textKanit18} color={"#cccccc"}
                                textTransform={"uppercase"}
                              >
                                {getText("Portfolio-v1")}
                              </Text>
                            </Link>
                          </Animates.RippleButton>

                          <Flex my={0.5}></Flex>
                          <Animates.RippleButton id="project-6"
                            style={{ padding: "8px 16px", borderRadius: "8px" }}
                          >
                            <Link to="/landing-templates" target="_blank">
                              <Text className={globalStyles.textKanit18} color={"#cccccc"}
                                textTransform={"uppercase"}
                              >
                                {getText("Landing page templates")}
                              </Text>
                            </Link>
                          </Animates.RippleButton> */}

                          <Flex my={0.5}></Flex>
                          <Animates.RippleButton id="project-7"
                            style={{ padding: "8px 16px", borderRadius: "8px" }}
                          >
                            <Link to="/dev-tech-landing" target="_blank">
                              <Text className={globalStyles.textKanit18} color={"#cccccc"}
                                textTransform={"uppercase"}
                              >
                                {getText("DEV.TECT Landing page")}
                              </Text>
                            </Link>
                          </Animates.RippleButton>
                        </Flex>
                      </Flex>
                    </Flex>

                    <Flex column center mt={16}>
                      <Text className={globalStyles.textOrbiBold24} color={"#ffffff"}
                        textTransform={"uppercase"}
                      >
                        {getText("Contact")}
                      </Text>
                      <Flex fullWidth border={"solid 2px rgba(255,255,255, 0.1)"} mt={1} mb={2}></Flex>

                      <Flex mt={2} column center>
                        <Text className={globalStyles.textKanit18} color={"#777777"}
                          textTransform={"uppercase"}
                        >
                          {getText("Address: Nhân Cơ - Đăk'R Lấp - Đăk Nông")}
                        </Text>
                        <Text className={globalStyles.textKanit18} color={"#777777"}
                          textTransform={"uppercase"}
                          textAlign={"center"}
                        >
                          {getText("TEL: 0972828264")}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex fullWidth border={"solid 1px rgba(255,255,255, 0.1)"} mt={6} mb={1}></Flex>
                  <Flex fullWidth centerY justifyContent={"space-between"}>
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
      </Flex>
      <Flex fullWidth position={"relative"} center minHeight={200} mt={2}>
        <Animates.WaterReflection bgImage={reflectBg} ratio={25} />
      </Flex>
    </Flex>
  )
})

const contactLangObj = {
  "VI": {
    "Contact": "Thông tin liên hệ",
    "Projects": "Dự án",
    "Address: Nhân Cơ - Đăk'R Lấp - Đăk Nông": "Địa chỉ: Nhân Cơ - Đăk'R Lấp - Đăk Nông",
    "Novels online page": "Trang đọc truyện trực tuyến",
    "Portfolio page": "Trang tiểu sử",
    "Soccer score online page": "Trang kết quả bóng đá online",
    "Landing page templates": "Mẫu thiết kế trang web",
    "Jobs Seeker online page": "Trang tìm kiếm việc làm online",
  }
}