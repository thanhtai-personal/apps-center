import { useEffect, useMemo } from "react";
import { setActiveMenu } from "src/actions/layout.actions";
import Flex from "src/components/common/Flex";
import useAdminMenus from "src/hooks/useAdminMenus";
import useSearchParams from "src/hooks/useSearchParams";
import ListBranchsPage from "src/screens/Admin/Branchs/List";
import CreateBranchPage from "src/screens/Admin/Branchs/Create";
import DetailBranchPage from "src/screens/Admin/Branchs/Detail";
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

const BranchsPage = (props) => {
  const searchParams = useSearchParams();
  const subMenuKey = searchParams.get("sMenu");
  const globalClasses = useGlobalStyle(props);
  const classes = useStyles(props);

  useAdminMenus();

  useEffect(() => {
    setActiveMenu(["branchs", subMenuKey || "list-branchs"]);
    return () => setActiveMenu([]);
  }, [subMenuKey]);

  const contentElement = useMemo(() => {
    switch (subMenuKey) {
      case "list-branchs":
        return <ListBranchsPage />;
      case "create-branch":
        return <CreateBranchPage />;
      case "detail-branch":
        return <DetailBranchPage />;
      default:
        return <ListBranchsPage />;
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

export default BranchsPage;
