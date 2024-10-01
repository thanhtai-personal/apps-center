import Flex from "src/components/common/Flex";
import useLocalize from "src/hooks/useLocalize";
import useSelector from "src/hooks/useSelector";
import { useCategoriesStyle } from "./styles";
import { useEffect, useMemo, useRef, useState } from "react";
import { isEmpty } from "lodash";
import { searchCategories } from "src/actions/category.actions";
import { searchProducts } from "src/actions/product.actions";
import Text from "src/components/common/Text";
import ProductCard from "src/components/ProductCard";
import { useGlobalStyle } from "src/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import { useMediaQuery, useTheme } from "@material-ui/core";
import ObserverLoadingContainer from "src/components/common/ObservableLoadingContainer";
import ContentLoader from "react-content-loader";

SwiperCore.use([Navigation]);

const MultilpleCategory = (props) => {
  const classes = useCategoriesStyle(props);
  const globalClasses = useGlobalStyle(props);
  const localizeState = useSelector((state) => state.localize);
  const { t } = useLocalize(localizeState.key);
  const [defaultCategories, setDetaultCategories] = useState([]);
  const [showingProducts, setShowingProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const { showing_categoriesDataList } = useSelector((state) => state.home);
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    (async () => {
      try {
        const dataRes = await searchCategories({
          page: 0,
          rowsPerPage: 5,
        });
        setDetaultCategories(dataRes || []);
      } catch (error) {}
    })();
  }, []);

  const showingCategories = useMemo(() => {
    return showing_categoriesDataList && !isEmpty(showing_categoriesDataList)
      ? showing_categoriesDataList
      : (defaultCategories && !isEmpty(defaultCategories)
          ? defaultCategories
          : []
        ).map((item) => ({
          name: item.name,
          id: item.name,
        }));
  }, [defaultCategories, showing_categoriesDataList]);

  useEffect(() => {
    (async () => {
      setLoadingProducts(true);
      const listPromises = [];
      (showingCategories || []).forEach((category) => {
        listPromises.push(
          searchProducts({
            categories: { $in: [category.name] },
            rowsPerPage: 8,
            page: 0,
          })
        );
      });
      try {
        const dataRes = await Promise.all(listPromises);
        setShowingProducts(dataRes);
        setLoadingProducts(false);
      } catch (error) {
        setLoadingProducts(false);
      }
    })();
  }, [showingCategories]);

  return (
    <Flex
      width={"100%"}
      className={classes.root}
      center
      position={"relative"}
      column
    >
      <Flex
        width={"100%"}
        height={"100%"}
        center
        overflow={"hidden"}
        maxWidth={1170}
        column
      >
        <Flex width={"100%"} center column>
          {showingCategories.map((category: any, index) => {
            return (
              <ObserverLoadingContainer once>
                <Flex
                  mt={8}
                  width={"100%"}
                  column
                  key={`${category._id}-${index}`}
                >
                  <Flex
                    width={"100%"}
                    justifyContent={"space-between"}
                    borderBottom={"solid 2px rgba(0,0,0, 0.4)"}
                  >
                    <Flex>
                      <Text className={globalClasses.textLinkHover}>
                        {category.name}
                      </Text>
                    </Flex>
                    <Text
                      style={{ cursor: "pointer" }}
                      className={globalClasses.buttonText}
                      onClick={() =>
                        window.location.replace(
                          `${window.location.origin}/products?category=${category.name}`
                        )
                      }
                    >
                      {t(`Xem tất cả`)}
                    </Text>
                  </Flex>
                  <Flex width={"100%"} center>
                    {loadingProducts ? (
                      <Flex width={"100%"} center minHeight={120}>
                        <ContentLoader
                          speed={2}
                          viewBox="0 0 360 80"
                          backgroundColor="#f3f3f3"
                          foregroundColor="#ecebeb"
                        >
                          <rect x="10" y="5" width="60" height="60" />
                          <rect x="80" y="5" width="60" height="60" />
                          <rect x="150" y="5" width="60" height="60" />
                          <rect x="220" y="5" width="60" height="60" />
                          <rect x="300" y="5" width="60" height="60" />
                        </ContentLoader>
                      </Flex>
                    ) : (
                      <Swiper
                        slidesPerView={smDown ? 1 : mdDown ? 3 : 4}
                        effect={"slide"}
                        navigation
                      >
                        {(showingProducts[index] || []).map((product, idx) => (
                          <SwiperSlide key={product._id}>
                            <Flex px={1} key={product._id}>
                              <ProductCard
                                product={product}
                                key={`${product._id}`}
                              />
                            </Flex>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )}
                  </Flex>
                </Flex>
              </ObserverLoadingContainer>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MultilpleCategory;
