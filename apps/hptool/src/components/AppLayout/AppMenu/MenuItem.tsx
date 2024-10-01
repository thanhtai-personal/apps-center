import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import SubMenu from "./SubMenu";
import _ from "lodash";
import { menuItemStyle } from "./styles";
import { useRouter } from "next/router";

export type MenuItemType = {
  id?: string;
  key?: string;
  subItems?: Array<MenuItemType>;
  icon?: any;
  name?: string;
  isActive?: any;
  alignment?: any;
  onClick?: any;
};
interface MenuItemProps {
  item: MenuItemType;
  activeMenus?: Array<string>;
}

const MenuItem = (props: MenuItemProps) => {
  const { item, activeMenus = [] } = props;
  const router = useRouter();
  const classes = menuItemStyle(props);
  return (
    <>
      <ListItem
        className={classes.item}
        onClick={() => item.onClick && item.onClick(router, item)}
        selected={item.isActive && item.isActive(item, activeMenus)}
        button
        key={item.id || item.key}
        disableGutters
        alignItems={"flex-start"}
        classes={{
          selected: classes.itemActive,
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItem>
      {item.subItems && !_.isEmpty(item.subItems) && (
        <ListItem>
          <SubMenu
            items={item.subItems}
            activeMenus={activeMenus}
            isActive={item.isActive && item.isActive(item, activeMenus)}
          />
        </ListItem>
      )}
    </>
  );
};

export default MenuItem;
