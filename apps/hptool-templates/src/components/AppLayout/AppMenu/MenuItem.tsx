import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import SubMenu from "./SubMenu";
import _ from "lodash";

export type MenuItemType = {
  id?: string;
  key?: string;
  subItems?: Array<MenuItemType>;
  icon?: any;
  name?: string;
  isActive?: any;
};
interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem = (props: MenuItemProps) => {
  const { item } = props;
  return (
    <ListItem button key={item.id || item.key}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.name} />
      {item.subItems && !_.isEmpty(item.subItems) && (
        <SubMenu
          items={item.subItems}
          isActive={item.isActive && item.isActive(item)}
        />
      )}
    </ListItem>
  );
};

export default MenuItem;
