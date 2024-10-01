import ProductPresentation from "./presentation";
import ProductLayout from "src/components/ProductLayout";
import useSearchParams from "src/hooks/useSearchParams";
import { useEffect, useMemo, useState } from "react";
import { searchProducts, updateProductData } from "src/actions/product.actions";
import useSelector from "src/hooks/useSelector";
import { searchCategories } from "src/actions/category.actions";

const ProductsScreen = (props) => {
  const params = useSearchParams();
  const { categories } = useSelector((state) => state.categories);
  const { paging } = useSelector((state) => state.products);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [activeCategory, setActiveCategory] = useState(params.get("category"));

  const categoriesTree: any = useMemo(() => {
    const rsObject = {};
    categories
      .filter((cate: any) => cate.level === 0)
      .forEach((element: any) => {
        rsObject[element.id] = { ...element };
        rsObject[element.id].subMenus = categories
          .filter((cate) => cate.parent === element.id)
          .map((cate) => ({
            ...cate,
            subMenus: categories.filter((c) => c.parent === cate.id),
          }));
      });
    () => {};
    return rsObject;
  }, [categories]);

  useEffect(() => {
    searchCategories({
      rowsPerPage: 1000,
    });
  }, []);

  useEffect(() => {
    const searchParams: any = {};
    if (params.get("category")) {
      searchParams.categories = {
        $in: [params.get("category")],
      };
    }
    if (params.get("branch")) {
      searchParams.branch = params.get("branch");
    }
    if (params.get("name")) {
      searchParams.name = {
        regex: params.get("name"),
      };
    }
    (async () => {
      try {
        setLoadingProducts(true);
        await searchProducts(searchParams);
      } catch (error) {
      } finally {
        setLoadingProducts(false);
      }
    })();
  }, [params, paging.page]);

  const handleUpdatePaging = (pageData) => {
    updateProductData({
      name: "paging",
      value: { ...paging, ...pageData },
    });
  };

  return (
    <ProductLayout>
      <ProductPresentation
        loadingProducts={loadingProducts}
        categoriesTree={categoriesTree}
        activeCategory={activeCategory}
        handleUpdatePaging={handleUpdatePaging}
        setActiveName={setActiveCategory}
      />
    </ProductLayout>
  );
};

export default ProductsScreen;
