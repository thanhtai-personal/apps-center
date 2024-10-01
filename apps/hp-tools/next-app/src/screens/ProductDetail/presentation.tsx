import Flex from "src/components/common/Flex";
import useSelector from "src/hooks/useSelector";
import { Button, ButtonGroup, CircularProgress } from "@material-ui/core";
import LazyLoadImage from "src/components/common/LazyImage";
import Text from "src/components/common/Text";
import { useGlobalStyle } from "src/styles";
import { addToCart, formatMoney } from "src/utils/helpers";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import AlarmIcon from "@material-ui/icons/Alarm";
import PaymentIcon from "@material-ui/icons/Payment";
import PhoneIcon from "@material-ui/icons/Phone";
import ContentLoader from "react-content-loader";

const ProductsPresentation = (props) => {
  const productData = useSelector((state) => state.products);
  const homeData = useSelector((state) => state.home);
  const globalClasses = useGlobalStyle(props);
  const [selectedThumb, setSelectedThumb] = useState(productData.thumbObj?.url);
  const [selectedTab, setSelectedTab] = useState("info");
  const { t } = useTranslation();

  useEffect(() => {
    setSelectedThumb(productData.thumbObj?.url);
  }, [productData.thumbObj]);

  const loadingElement = (
    <Flex width={"100%"} mt={4} center minHeight={820} column>
      <ContentLoader
        speed={2}
        viewBox="0 0 1170 220"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="10" y="10" width="470" height="350" />
        <rect x="490" y="10" width="690" height="30" />
        <rect x="490" y="50" width="690" height="20" />
        <rect x="490" y="110" width="690" height="20" />
        <rect x="490" y="140" width="690" height="20" />
        <rect x="490" y="170" width="690" height="20" />
        <rect x="490" y="200" width="690" height="20" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        viewBox="0 0 1170 600"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="10" y="10" width="1170" height="600" />
      </ContentLoader>
    </Flex>
  );

  return (
    <>
      {productData.loading ? (
        loadingElement
      ) : (
        <Flex width={"100%"} center>
          <Flex maxWidth={1170} column width={"100%"} mt={4}>
            <Flex width={"100%"} flexWrap={"wrap"}>
              <Flex flex={3} column>
                <Flex flexWrap={"wrap"} center>
                  <Flex column>
                    <LazyLoadImage
                      src={selectedThumb}
                      style={{ width: 360, height: 270 }}
                    />
                    <Flex
                      width={360}
                      mt={4}
                      style={{
                        overflowX: "auto",
                      }}
                    >
                      {[...(productData.imagesDataList || [])].map(
                        (item, index) => (
                          <Flex
                            key={item._id}
                            width={60}
                            height={60}
                            cursor={"pointer"}
                            center
                            mx={1}
                            onClick={() => setSelectedThumb(item.url)}
                          >
                            <LazyLoadImage
                              src={item.url}
                              style={{ width: 60, height: 60 }}
                            />
                          </Flex>
                        )
                      )}
                    </Flex>
                  </Flex>
                  <Flex ml={4} column>
                    <Text className={globalClasses.textTitle}>
                      {productData.name}
                    </Text>
                    <Text
                      mt={2}
                      fontSize={12}
                      style={{ textTransform: "uppercase" }}
                    >
                      {`Nhà sản xuất: ${productData.branch || ""}`}
                    </Text>
                    <Text
                      color={"#f62d3e"}
                      fontSize={18}
                      mt={4}
                      fontWeight={900}
                      style={{ textTransform: "uppercase" }}
                    >
                      {formatMoney(productData.price)}
                    </Text>
                    <Text fontSize={14} mt={12}>
                      {`Mã sản phẩm: ${productData.code || ""}`}
                    </Text>
                    <Text fontSize={14} mt={2}>
                      {`Thương hiệu: ${productData.branch || ""}`}
                    </Text>
                    <Text fontSize={14} mt={2}>
                      {`Xuất xứ: ${productData.orginal || ""}`}
                    </Text>
                    <Text fontSize={14} mt={2}>
                      {`Thời gian bảo hành: ${productData.warranty_time || ""}`}
                    </Text>
                    <Flex
                      className={globalClasses.button}
                      onClick={() => addToCart(productData)}
                      style={{
                        marginTop: 32,
                        width: "fit-content",
                      }}
                    >
                      {t(`Thêm vào giỏ hàng`)}
                    </Flex>
                  </Flex>
                </Flex>

                <Flex mt={8} column>
                  <ButtonGroup>
                    <Button
                      style={{
                        background:
                          selectedTab === "info" ? "#f62d3e" : "white",
                      }}
                      onClick={() => setSelectedTab("info")}
                    >
                      <Text
                        fontWeight={700}
                        style={{ textTransform: "uppercase" }}
                        color={selectedTab === "info" ? "#fff" : "#000"}
                      >
                        {t(`Thông tin chi tiết`)}
                      </Text>
                    </Button>
                    <Button
                      style={{
                        background:
                          selectedTab === "technique" ? "#f62d3e" : "white",
                      }}
                      onClick={() => setSelectedTab("technique")}
                    >
                      <Text
                        fontWeight={700}
                        style={{ textTransform: "uppercase" }}
                        color={selectedTab === "technique" ? "#fff" : "#000"}
                      >
                        {t(`THÔNG SỐ KỸ THUẬT`)}
                      </Text>
                    </Button>
                    <Button
                      style={{
                        background:
                          selectedTab === "videos" ? "#f62d3e" : "white",
                      }}
                      onClick={() => setSelectedTab("videos")}
                    >
                      <Text
                        fontWeight={700}
                        style={{ textTransform: "uppercase" }}
                        color={selectedTab === "videos" ? "#fff" : "#000"}
                      >
                        {t(`Video`)}
                      </Text>
                    </Button>
                  </ButtonGroup>
                  {selectedTab === "info" && (
                    <Flex mt={4}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: productData.description,
                        }}
                      ></div>
                    </Flex>
                  )}
                  {selectedTab === "technique" && (
                    <Flex mt={4}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: productData.technique,
                        }}
                      ></div>
                    </Flex>
                  )}
                  {selectedTab === "videos" && (
                    <Flex column mt={4} style={{ display: "none" }}>
                      {(productData.videos || []).map((video, index) => (
                        <div
                          key={index}
                          dangerouslySetInnerHTML={{ __html: video }}
                        ></div>
                      ))}
                    </Flex>
                  )}
                </Flex>
              </Flex>
              <Flex
                flex={1}
                height={"fit-content"}
                border={"solid 1px #f62d3e"}
                column
              >
                <Flex
                  width={"100%"}
                  borderBottom={"solid 1px rgba(0,0,0, 0.25)"}
                  p={2}
                  py={3}
                  centerY
                >
                  <Flex p={1}>
                    <VerifiedUserIcon
                      style={{
                        width: 36,
                        height: 36,
                        color: "orange",
                      }}
                    />
                  </Flex>
                  <Flex column>
                    <Text>
                      {t(`Giao hàng miễn phí nội thành bán kính 3km`)}
                    </Text>
                    <Text>{t(`Với đơn hàng trên 3.000.000đ`)}</Text>
                  </Flex>
                </Flex>
                <Flex
                  width={"100%"}
                  borderBottom={"solid 1px rgba(0,0,0, 0.25)"}
                  p={2}
                  py={3}
                  centerY
                >
                  <Flex p={1}>
                    <AlarmIcon
                      style={{
                        width: 36,
                        height: 36,
                        color: "green",
                      }}
                    />
                  </Flex>
                  <Flex column>
                    <Text>
                      {t(`Giao hàng miễn phí nội thành bán kính 3km`)}
                    </Text>
                    <Text>{t(`Với đơn hàng trên 3.000.000đ`)}</Text>
                  </Flex>
                </Flex>
                <Flex
                  width={"100%"}
                  borderBottom={"solid 1px rgba(0,0,0, 0.25)"}
                  p={2}
                  py={3}
                  centerY
                >
                  <Flex p={1}>
                    <PaymentIcon
                      style={{
                        width: 36,
                        height: 36,
                        color: "orange",
                      }}
                    />
                  </Flex>
                  <Flex column>
                    <Text>{t(`Hình thức thanh toán`)}</Text>
                    <Text>{t(`Thanh toán khi nhận hàng`)}</Text>
                  </Flex>
                </Flex>
                <Flex width={"100%"} p={2} py={3} centerY>
                  <Flex p={1}>
                    <PhoneIcon
                      style={{
                        width: 36,
                        height: 36,
                        color: "green",
                      }}
                    />
                  </Flex>
                  <Flex column>
                    <Text>{t(`Đặt mua hàng online`)}</Text>
                    <Text className={globalClasses.textTitle}>
                      {homeData.hot_line}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default ProductsPresentation;
