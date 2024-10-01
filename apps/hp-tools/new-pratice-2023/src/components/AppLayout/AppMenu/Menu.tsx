import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Alignment, AlignmentType } from "./index";
import clsx from "clsx";
import _ from "lodash";
import MenuItem from "./MenuItem";
import { listStyle } from "./styles";

interface MenuProps {
  alignment: Alignment;
  onClose: any;
  menus: Array<any>;
  classes?: any;
  dividerList?: Array<any>;
}

const Menu = (props: MenuProps) => {
  const intenalClasses = listStyle();
  const {
    onClose,
    alignment,
    classes = intenalClasses,
    dividerList,
    menus,
  } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={clsx(classes.list, {
        [classes.fullList]:
          alignment === AlignmentType.top || alignment === AlignmentType.bottom,
      })}
      role="presentation"
      onClick={handleClose}
      onKeyDown={handleClose}
    >
      <List>
        {(menus || []).map((item, index) => (
          <MenuItem key={item.id || item.key} item={item} />
        ))}
      </List>
      {dividerList && !_.isEmpty(dividerList) && <Divider />}
      {dividerList && !_.isEmpty(dividerList) && (
        <List>
          {dividerList.map((item, index) => (
            <MenuItem key={item.id || item.key} item={item} />
          ))}
        </List>
      )}
    </div>
  );
};

export default Menu;
