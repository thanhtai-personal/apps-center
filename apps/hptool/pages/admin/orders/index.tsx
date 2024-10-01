import { useEffect, useMemo } from "react";
import { setActiveMenu } from "src/actions/layout.actions";
import Flex from "src/components/common/Flex";
import useAdminMenus from "src/hooks/useAdminMenus";
import useSearchParams from "src/hooks/useSearchParams";
import ListOrdersPage from "src/screens/Admin/Orders/List";
import CreateOrderPage from "src/screens/Admin/Orders/Create";
import DetailOrderPage from "src/screens/Admin/Orders/Detail";
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

const OrdersPage = (props) => {
  const searchParams = useSearchParams();
  const subMenuKey = searchParams.get("sMenu");
  const globalClasses = useGlobalStyle(props);
  const classes = useStyles(props);

  useAdminMenus();

  useEffect(() => {
    setActiveMenu(["orders", subMenuKey || "list-orders"]);
    return () => setActiveMenu([]);
  }, [subMenuKey]);

  const contentElement = useMemo(() => {
    switch (subMenuKey) {
      case "list-orders":
        return <ListOrdersPage />;
      case "create-order":
        return <CreateOrderPage />;
      case "detail-order":
        return <DetailOrderPage />;
      default:
        return <ListOrdersPage />;
    }
  }, [subMenuKey]);

  return (
    <AuthenProvider roles={SET_OF_ADMIN}>
      <Flex width={"100%"} pl={"266px"} className={globalClasses.pageContent}>
        {contentElement}
      </Flex>
    </AuthenProvider>
  );
};

export default OrdersPage;
