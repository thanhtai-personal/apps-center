import { useEffect } from "react";
import { setActiveMenu } from "src/actions/layout.actions";
import AuthenProvider from "src/components/AuthenProvider";
import Flex from "src/components/common/Flex";

import useAdminMenus from "src/hooks/useAdminMenus";
import { SET_OF_ADMIN } from "src/utils/constants";

const ImagesPage = (props) => {
  useAdminMenus();

  useEffect(() => {
    setActiveMenu(["images"]);
    return () => setActiveMenu([]);
  }, []);

  return (
    <AuthenProvider roles={SET_OF_ADMIN}>
      <Flex>Images page</Flex>
    </AuthenProvider>
  );
};

export default ImagesPage;
