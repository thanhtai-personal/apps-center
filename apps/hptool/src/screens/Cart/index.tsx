import CartPresentation from "./presentation";
import ProductLayout from "src/components/ProductLayout";

const CartPage = (props) => {
  return (
    <ProductLayout>
      <CartPresentation />
    </ProductLayout>
  );
};

export default CartPage;
