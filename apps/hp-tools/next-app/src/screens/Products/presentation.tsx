import Flex from "src/components/common/Flex";
import useSelector from "src/hooks/useSelector";
import ProductCard from "src/components/ProductCard";
import Pagination from "@material-ui/lab/Pagination";
import { isEmpty } from "lodash";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import Text from "src/components/common/Text";
import { useTranslation } from "react-i18next";
import ContentLoader from "react-content-loader";
import CategoryMenu from "./CategoryMenu";
import { useDesktopFirstDesign } from "src/hooks/useMobileSize";

const ProductsPresentation = (props) => {
  const { products = [], paging } = useSelector((state) => state.products);
  const { openMobileCategoryMenu } = useSelector((state) => state.layout);
  const { t } = useTranslation();
  const { downSM } = useDesktopFirstDesign();

  const { handleUpdatePaging, loadingProducts } = props;

  const loadingElement = (
    <Flex width={"100%"} center minHeight={140} column>
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
  );

  return (
    <Flex width={"100%"} px={"16px"} py={"32px"} position={"relative"}>
      {!downSM && (
        <CategoryMenu
          categoriesTree={props.categoriesTree}
          activeCategory={props.activeCategory}
          setActiveName={props.setActiveName}
        />
      )}
      {openMobileCategoryMenu && downSM && (
        <Flex position={"absolute"} top={"20px"} zIndex={999}>
          <CategoryMenu
            categoriesTree={props.categoriesTree}
            activeCategory={props.activeCategory}
            setActiveName={props.setActiveName}
          />
        </Flex>
      )}
      <Flex width={"100%"}>
        <Flex column width={"100%"}>
          <Flex width={"100%"} flexWrap={"wrap"} center>
            {isEmpty(products) && !loadingProducts && (
              <Flex width={"100%"} center height={450} column>
                <HourglassEmptyIcon
                  style={{
                    width: 60,
                    height: 60,
                  }}
                />
                <Text>{t(`Không có dữ liệu`)}</Text>
              </Flex>
            )}
            {loadingProducts
              ? loadingElement
              : products.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
          </Flex>
          <Flex width={"100%"} justifyContent={"flex-end"} mt={4}>
            <Pagination
              count={
                parseInt(
                  (paging.total / (paging.rowsPerPage || 1)).toString()
                ) + 1
              }
              defaultPage={paging.page}
              variant="outlined"
              shape="rounded"
              onChange={(e, page) =>
                handleUpdatePaging({
                  page: page - 1,
                })
              }
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductsPresentation;
