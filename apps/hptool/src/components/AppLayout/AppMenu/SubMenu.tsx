import { Collapse, List } from "@material-ui/core";
import MenuItem, { MenuItemType } from "./MenuItem";
import { subMenusStyle } from "./styles";

interface SubMenuProps {
  items: Array<MenuItemType>;
  isActive?: boolean;
  activeMenus: Array<string>;
}

const SubMenu = (props: SubMenuProps) => {
  const { items = [], isActive, activeMenus = [] } = props;
  const classes = subMenusStyle(props);
  return (
    <Collapse in={isActive} className={classes.root}>
      <List className={classes.root}>
        {items.map((item) => (
          <MenuItem
            item={item}
            key={item.id || item.key}
            activeMenus={activeMenus}
          />
        ))}
      </List>
    </Collapse>
  );
};

export default SubMenu;
