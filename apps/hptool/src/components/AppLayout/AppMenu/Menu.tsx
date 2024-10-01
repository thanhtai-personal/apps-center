import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Alignment, AlignmentType } from "./index";
import clsx from "clsx";
import _ from "lodash";
import MenuItem from "./MenuItem";
import { listStyle } from "./styles";
import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import { useGlobalStyle } from "src/styles";

interface MenuProps {
  alignment: Alignment;
  onClose: any;
  menus: Array<any>;
  classes?: any;
  dividerList?: Array<any>;
  activeMenus?: Array<any>;
}

const Menu = (props: MenuProps) => {
  const intenalClasses = listStyle();
  const {
    onClose,
    alignment,
    classes = intenalClasses,
    dividerList,
    menus,
    activeMenus,
  } = props;

  const globalClasses = useGlobalStyle();

  const handleClose = () => {
    onClose();
  };

  const handleClickMenu = () => {};

  return (
    <Flex
      column
      className={clsx(classes.list, {
        [classes.fullList]:
          alignment === AlignmentType.top || alignment === AlignmentType.bottom,
      })}
      role="presentation"
      onClick={handleClickMenu}
      onKeyDown={handleClose}
      height={"100%"}
    >
      <Flex
        width={"100%"}
        height={"70px"}
        center
        borderBottom={"solid 1px rgba(0,0,0, 0.12)"}
        boxShadow={`inset 3px 3px 6px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)`}
      >
        <Text className={globalClasses.textTitle}>TTT SERVICES</Text>
      </Flex>
      <Flex
        column
        alignItems={"space-between"}
        justifyContent={"space-between"}
        height={"100%"}
      >
        <List>
          {(menus || []).map((item, index) => (
            <MenuItem
              key={item.id || item.key}
              item={item}
              activeMenus={activeMenus}
            />
          ))}
        </List>
        <Flex column width={"100%"}>
          {dividerList && !_.isEmpty(dividerList) && <Divider />}
          {dividerList && !_.isEmpty(dividerList) && (
            <List>
              {dividerList.map((item, index) => (
                <MenuItem
                  key={item.id || item.key}
                  item={item}
                  activeMenus={activeMenus}
                />
              ))}
            </List>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Menu;
