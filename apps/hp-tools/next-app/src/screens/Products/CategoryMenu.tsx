import Flex from "src/components/common/Flex";
import { useProductsStyle } from "../Home/components/styles";
import CategoryMenuItem from "./CategoryMenuItem";
import { useGlobalStyle } from "src/styles";

const CategoryMenu = (props: any) => {
  const classes = useProductsStyle(props);
  const globalClasses = useGlobalStyle();
  return (
    <Flex
      column
      minWidth={"280px"}
      maxWidth={"50vw"}
      maxHeight={"1000px"}
      className={[classes.categoryMenu, globalClasses.scrollable].join(" ")}
      bgcolor={"white"}
    >
      {Object.keys(props.categoriesTree).map((key) => (
        <CategoryMenuItem
          key={key}
          activeName={props.activeCategory}
          item={props.categoriesTree[key]}
          setActiveName={props.setActiveName}
        />
      ))}
    </Flex>
  );
};

export default CategoryMenu;
