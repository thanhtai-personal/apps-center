import { useEffect, useMemo } from "react";
import { setActiveMenu } from "src/actions/layout.actions";
import Flex from "src/components/common/Flex";
import useAdminMenus from "src/hooks/useAdminMenus";
import useSearchParams from "src/hooks/useSearchParams";
import ListUsersPage from "src/screens/Admin/Users/List";
import CreateUserPage from "src/screens/Admin/Users/Create";
import DetailUserPage from "src/screens/Admin/Users/Detail";
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

const UsersPage = (props) => {
  const searchParams = useSearchParams();
  const subMenuKey = searchParams.get("sMenu");
  const globalClasses = useGlobalStyle(props);
  const classes = useStyles(props);

  useAdminMenus();

  useEffect(() => {
    setActiveMenu(["users", subMenuKey || "list-users"]);
    return () => setActiveMenu([]);
  }, [subMenuKey]);

  const contentElement = useMemo(() => {
    switch (subMenuKey) {
      case "list-users":
        return <ListUsersPage />;
      case "create-user":
        return <CreateUserPage />;
      case "detail-user":
        return <DetailUserPage />;
      default:
        return <ListUsersPage />;
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

export default UsersPage;
