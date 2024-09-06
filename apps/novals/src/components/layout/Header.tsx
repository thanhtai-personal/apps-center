import { observer } from "@core-ui/react-mobx-state";
import { Flex, LazyImage, OutlinedButton, Text, useResponsive } from "@core-ui/react-mui-core";
import logo from "@/assets/images/tth_logo.png"
import { Animates } from "@core-ui/react-animates";
import { useGlobalStyles } from "@/styles/globalStyle";
import { useStore } from "@/store/index";
import { Input } from "@core-ui/react-mui-core/materials"
import { PAGE_MAX_WIDTH } from "@/utils/constants";

export const Header = observer(() => {

  // const { tabletSizeDown } = useResponsive();
  const globalStyles = useGlobalStyles();
  const { uiStore } = useStore()

  // if (tabletSizeDown) {
  //   return <Flex fullWidth>

  //   </Flex>
  // }

  return (
    <Flex fullWidth centerX>
      <Flex maxWidth={PAGE_MAX_WIDTH} fullWidth justifyContent={"space-between"} p={2} centerY>
        <Flex>
          <Animates.RotateFromLeft duration={2}>
            <Flex centerY>
              <Flex width={110} height={110} overflow={"hidden"} borderRadius={"100%"}>
                <LazyImage src={logo} style={{
                  width: 100, height: 100, borderRadius: "100%"
                  , boxShadow: "rgba(237, 234, 234, 0.74) 0 0 0.25em 0.25em"
                }} />
              </Flex>
              <Flex>
                <Animates.ExpandUp delay={2.1}>
                  <Flex p={1} column>
                    <Text textAlign={"left"} color={uiStore.colors.red} className={globalStyles.textGeoBold32}
                      whiteSpace={"nowrap"}
                      style={{
                        fontStyle: "italic",
                        fontFamily: "Playwrite IT Trad"
                      }}
                    >TTH</Text>
                    <Text color={uiStore.colors.red} className={globalStyles.textOrbi14}
                      whiteSpace={"nowrap"}
                      style={{
                        fontStyle: "italic",
                      }}
                    >Nguồn truyện tổng hợp</Text>
                  </Flex>
                </Animates.ExpandUp>
              </Flex>
            </Flex>
          </Animates.RotateFromLeft>
        </Flex>

        <Flex p={1} centerY>
          <Animates.GrowUpAppear delay={2}>
            <Flex minWidth={500}>
              <Input placeholder="Nhập tên truyện hoặc tên tác giả" fullWidth />
            </Flex>
          </Animates.GrowUpAppear>
        </Flex>

        <Flex>
          <Animates.GrowUpAppear delay={2}>
            <Animates.DrawingBorderButton
              style={{
                borderRadius: "8px"
              }}
            >
              <Animates.RippleButton id="account"
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                }}
              >
                <Text className={globalStyles.text} whiteSpace={"nowrap"}>
                  Tài khoản
                </Text>
              </Animates.RippleButton>
            </Animates.DrawingBorderButton>
          </Animates.GrowUpAppear>
        </Flex>
      </Flex>
    </Flex>
  )
})