import Flex from "src/components/common/Flex";
import Header from "./Header";
import AppMenu from "./AppMenu";
import Footer from "./Footer";
import { appStyles } from "./styles";
import useSelector from "src/hooks/useSelector";
import LoadingFallback from "../LoadingFallback";

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout = (props: LayoutProps) => {
  const layoutState = useSelector((state) => state.layout);
  const classes = appStyles(props);

  return (
    <Flex width={"100vw"} height="100vh" column className={classes.appRoot}>
      {layoutState.useHeader && <Header />}
      <AppMenu
        menus={layoutState.menus}
        dividerList={layoutState.dividerList}
        menuAlignment={layoutState.menuAlignment}
        activeMenus={layoutState.activeMenus}
        disabledOutSiteClick={layoutState.disabledOutSiteClick}
        isPermanent={layoutState.isPermanent}
      />
      {layoutState.isGlobalLoading ? <LoadingFallback /> : props.children}
      {layoutState.useFooter && <Footer />}
    </Flex>
  );
};

export default AppLayout;
