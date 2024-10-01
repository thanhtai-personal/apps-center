import { useEffect, useMemo } from "react";
import { setActiveMenu } from "src/actions/layout.actions";
import Flex from "src/components/common/Flex";
import useAdminMenus from "src/hooks/useAdminMenus";
import useSearchParams from "src/hooks/useSearchParams";
import ListCategoriesPage from "src/screens/Admin/Categories/List";
import CreateCategoryPage from "src/screens/Admin/Categories/Create";
import DetailCategoryPage from "src/screens/Admin/Categories/Detail";
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

const CategoriesPage = (props) => {
  const searchParams = useSearchParams();
  const subMenuKey = searchParams.get("sMenu");
  const globalClasses = useGlobalStyle(props);
  const classes = useStyles(props);

  useAdminMenus();

  useEffect(() => {
    setActiveMenu(["categories", subMenuKey || "list-categories"]);
    return () => setActiveMenu([]);
  }, [subMenuKey]);

  const contentElement = useMemo(() => {
    switch (subMenuKey) {
      case "list-categories":
        return <ListCategoriesPage />;
      case "create-category":
        return <CreateCategoryPage />;
      case "detail-category":
        return <DetailCategoryPage />;
      default:
        return <ListCategoriesPage />;
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

export default CategoriesPage;
