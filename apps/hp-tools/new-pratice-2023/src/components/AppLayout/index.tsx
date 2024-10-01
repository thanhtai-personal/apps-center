import Flex from "components/common/Flex";
import Header from "./Header";
import AppMenu from "./AppMenu";
import Footer from "./Footer";
import { appStyles } from "./styles";
import useSelector from "hooks/useSelector";

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
      />
      {props.children}
      {layoutState.useFooter && <Footer />}
    </Flex>
  );
};

export default AppLayout;
