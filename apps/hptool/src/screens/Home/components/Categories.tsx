import Flex from "src/components/common/Flex";
import useLocalize from "src/hooks/useLocalize";
import useSelector from "src/hooks/useSelector";
import { useCategoriesStyle } from "./styles";
import { useEffect, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import { searchCategories } from "src/actions/category.actions";
import { searchProducts } from "src/actions/product.actions";
import Text from "src/components/common/Text";
import ProductCard from "src/components/ProductCard";
import { Button } from "@material-ui/core";
import { useGlobalStyle } from "src/styles";
import { useRouter } from "next/router";
import ContentLoader from "react-content-loader";

const Categories = (props) => {
  const classes = useCategoriesStyle(props);
  const globalClasses = useGlobalStyle(props);
  const localizeState = useSelector((state) => state.localize);
  const { t } = useLocalize(localizeState.key);
  const [defaultCategories, setDetaultCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const { categoriesDataList } = useSelector((state) => state.home);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        setLoadingProducts(true);
        const dataRes = await searchProducts({
          categories: { $in: [selectedCategory] },
          rowsPerPage: 8,
          page: 0,
        });
        setProducts(dataRes || []);
      } catch (error) {
      } finally {
        setLoadingProducts(false);
      }
    })();
  }, [selectedCategory]);

  useEffect(() => {
    (async () => {
      try {
        setLoadingCategories(true);
        const dataRes = await searchCategories({
          page: 0,
          rowsPerPage: 9,
        });
        setDetaultCategories(dataRes || []);
      } catch (error) {
      } finally {
        setLoadingCategories(false);
      }
    })();
  }, []);

  const showingCategories = useMemo(() => {
    return categoriesDataList && !isEmpty(categoriesDataList)
      ? categoriesDataList
      : (defaultCategories && !isEmpty(defaultCategories)
          ? defaultCategories
          : []
        ).map((item) => ({
          name: item.name,
          id: item.name,
        }));
  }, [defaultCategories, categoriesDataList]);

  useEffect(() => {
    showingCategories &&
      showingCategories[0] &&
      setSelectedCategory(showingCategories[0].id);
  }, [showingCategories]);

  return (
    <Flex
      width={"100%"}
      className={classes.root}
      center
      my={10}
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
        <Flex width={"100%"} center mb={4}>
          <Text
            style={{
              fontSize: "26px",
              lineHeight: "36px",
              color: "#474c5f",
              fontWeight: "400",
              textTransform: "uppercase",
            }}
          >
            {t(`Dòng sản phẩm nổi bật`)}
          </Text>
        </Flex>
        <Flex width={"100%"} center flexWrap={"wrap"}>
          {loadingCategories ? (
            <ContentLoader
              speed={2}
              viewBox="0 0 360 40"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="10" y="5" width="60" height="20" />
              <rect x="80" y="5" width="60" height="20" />
              <rect x="150" y="5" width="60" height="20" />
              <rect x="220" y="5" width="60" height="20" />
              <rect x="300" y="5" width="60" height="20" />
            </ContentLoader>
          ) : (
            showingCategories.map((category: any) => (
              <Flex m={1} key={category.id}>
                <Flex
                  cursor={"pointer"}
                  className={
                    category.id === selectedCategory
                      ? classes.activeButton
                      : classes.button
                  }
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Flex>
              </Flex>
            ))
          )}
        </Flex>
        <Flex width={"100%"} center flexWrap={"wrap"}>
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
            products.map((product, idx) => {
              return <ProductCard product={product} key={product._id} />;
            })
          )}
        </Flex>
        <Flex width={"100%"} center mt={8}>
          <Button
            className={globalClasses.button}
            onClick={() =>
              router.push(`/products?category=${selectedCategory}`)
            }
          >
            {t(`Xem toàn bộ sản phẩm`)}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Categories;
