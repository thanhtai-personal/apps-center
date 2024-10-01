import Flex from "src/components/common/Flex";
import TopBar from "./components/TopBar";
import SearchBar from "./components/SearchBar";
import AppMenu from "./components/AppMenu";
import Footer from "./components/Footer";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const ProductsLayoutPresentation = (props) => {
  const { children } = props;

  return (
    <Flex width={"100%"} column position={"relative"} minHeight={"100vh"}>
      <div id={"scroll-top"}></div>
      <Flex width={"100%"}>
        <TopBar />
      </Flex>
      <Flex width={"100%"}>
        <SearchBar />
      </Flex>
      <Flex width={"100%"}>
        <AppMenu />
      </Flex>
      {children}
      <Flex width={"100%"}>
        <Footer />
      </Flex>
      <Flex
        position={"fixed"}
        bottom={60}
        right={10}
        cursor={"pointer"}
        onClick={() => {
          const topElem = document.getElementById("scroll-top");
          if (topElem)
            topElem.scrollIntoView({
              behavior: "smooth",
            });
        }}
        bgcolor={"#f62d3e"}
        p={2}
      >
        <KeyboardArrowUpIcon style={{ color: "#fff" }} />
      </Flex>
    </Flex>
  );
};

export default ProductsLayoutPresentation;
