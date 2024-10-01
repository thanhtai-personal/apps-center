import ProductDetailPresentation from "./presentation";
import ProductLayout from "src/components/ProductLayout";
import useSearchParams from "src/hooks/useSearchParams";
import { useEffect } from "react";
import { getDetailProduct } from "src/actions/product.actions";
import useSelector from "src/hooks/useSelector";

const ProductsScreen = (props) => {
  const params = useSearchParams();
  const { paging } = useSelector((state) => state.products);

  useEffect(() => {
    if (params.get("id")) {
      getDetailProduct(params.get("id"));
    }
  }, [params]);

  return (
    <ProductLayout>
      <ProductDetailPresentation />
    </ProductLayout>
  );
};

export default ProductsScreen;
