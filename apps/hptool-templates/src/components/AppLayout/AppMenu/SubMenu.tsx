import { Collapse, List } from "@material-ui/core";
import MenuItem, { MenuItemType } from "./MenuItem";

interface SubMenuProps {
  items: Array<MenuItemType>;
  isActive?: boolean;
}

const SubMenu = (props: SubMenuProps) => {
  const { items = [], isActive } = props;
  return (
    <Collapse in={isActive}>
      <List>
        {items.map((item) => (
          <MenuItem item={item} key={item.id || item.key} />
        ))}
      </List>
    </Collapse>
  );
};

export default SubMenu;
