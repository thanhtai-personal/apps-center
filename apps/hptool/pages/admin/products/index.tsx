import { useEffect, useMemo } from "react";
import { setActiveMenu } from "src/actions/layout.actions";
import Flex from "src/components/common/Flex";
import useAdminMenus from "src/hooks/useAdminMenus";
import useSearchParams from "src/hooks/useSearchParams";
import ListProductsPage from "src/screens/Admin/Products/List";
import CreateProductPage from "src/screens/Admin/Products/Create";
import DetailProductPage from "src/screens/Admin/Products/Detail";
import AuthenProvider from "src/components/AuthenProvider";
import { SET_OF_ADMIN } from "src/utils/constants";
import { useGlobalStyle } from "src/styles";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflowY: "auto",
      overflowX: "hidden",
    },
  })
);

const ProductsPage = (props) => {
  const searchParams = useSearchParams();
  const subMenuKey = searchParams.get("sMenu");
  const globalClasses = useGlobalStyle(props);
  const classes = useStyles(props);

  useAdminMenus();

  useEffect(() => {
    setActiveMenu(["products", subMenuKey || "list-products"]);
    return () => setActiveMenu([]);
  }, [subMenuKey]);

  const contentElement = useMemo(() => {
    switch (subMenuKey) {
      case "list-products":
        return <ListProductsPage />;
      case "create-product":
        return <CreateProductPage />;
      case "detail-product":
        return <DetailProductPage />;
      default:
        return <ListProductsPage />;
    }
  }, [subMenuKey]);

  return (
    <AuthenProvider roles={SET_OF_ADMIN}>
      <Flex width={"100vw"} pl={"266px"} className={globalClasses.pageContent}>
        {contentElement}
      </Flex>
    </AuthenProvider>
  );
};

export default ProductsPage;
