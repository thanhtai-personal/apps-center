import { useEffect, useState } from "react";
import Presentation from "./presentation";

interface ImagesSelectorProps {
  item: any;
  viewMode?: boolean;
  height?: number | string;
}

const ProductSelector = (props: ImagesSelectorProps) => {
  const { item } = props;
  const [searchText, setSearchText] = useState("");
  const { searchProductAction, label, height, products } = item;

  useEffect(() => {
    searchProductAction && searchProductAction();
  }, [searchProductAction]);

  return (
    <Presentation
      height={height}
      label={label}
      searchText={searchText}
      setSearchText={setSearchText}
      products={products}
    />
  );
};

export default ProductSelector;
