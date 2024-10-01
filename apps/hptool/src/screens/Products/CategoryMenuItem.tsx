import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import { isEmpty } from "lodash";
import { Collapse } from "@material-ui/core";
import { useCallback, useMemo, useState } from "react";
import { searchProducts } from "src/actions/product.actions";
import { useProductsStyle } from "../Home/components/styles";
import { useGlobalStyle } from "src/styles";
import { useRouter } from "next/router";

const CategoryMenuItem = (props: any) => {
  const { item, activeName, setActiveName } = props;
  const [isExpand, setIsExpand] = useState(false);
  const classes = useProductsStyle(props);
  const globalClasses = useGlobalStyle(props);
  const router = useRouter();

  const handleClick = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    item.subMenus && !isEmpty(item.subMenus) && setIsExpand((prev) => !prev);
    searchProducts({
      categories: { $in: [item.name] },
    });
    router.push(`/products?category=${item.name}`);
    setActiveName(item.name);
  }, []);

  const isActive = useMemo(
    () => activeName === item.name,
    [activeName, item.name]
  );

  return (
    <Flex
      width={"100%"}
      paddingX={"16px"}
      paddingY={"8px"}
      key={item.id}
      className={
        isActive ? classes.categoryMenuItemActive : classes.categoryMenuItem
      }
      column
      onClick={handleClick}
      cursor="pointer"
    >
      <Text
        className={
          isActive ? globalClasses.textLink : globalClasses.textLinkHover
        }
      >
        {item.name}
      </Text>
      {item.subMenus && !isEmpty(item.subMenus) && (
        <Collapse in={isExpand}>
          <Flex
            style={{
              borderLeft: "solid 1px rgba(0,0,0, 0.125)",
              borderRight: "solid 1px rgba(0,0,0, 0.125)",
            }}
          >
            {item.subMenus.map((sMenu) => (
              <CategoryMenuItem
                item={sMenu}
                key={sMenu.id}
                activeName={activeName}
                setActiveName={setActiveName}
              />
            ))}
          </Flex>
        </Collapse>
      )}
    </Flex>
  );
};

export default CategoryMenuItem;
