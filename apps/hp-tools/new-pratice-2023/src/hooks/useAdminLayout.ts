import { setAppMenu } from "actions/layout.actions";
import { useEffect } from "react";

const useAdminLayout = () => {
  useEffect(() => {
    setAppMenu({
      menus: [],
      dividerList: [],
    });
    return () => {};
  }, []);
};

export default useAdminLayout;
