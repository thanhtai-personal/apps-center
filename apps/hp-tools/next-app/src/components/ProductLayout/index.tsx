import { useEffect } from "react";
import { updateLayout } from "src/actions/layout.actions";
import ProductLayoutPresentation from "./presentation";
import { searchUIconfigs } from "src/actions/home.actions";

const ProductLayout = (props) => {
  useEffect(() => {
    searchUIconfigs({
      name: "HOME",
    });
  }, []);

  return <ProductLayoutPresentation {...props} />;
};

export default ProductLayout;
