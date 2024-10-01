import Drawer from "@material-ui/core/Drawer";
import { updateActiveAlimentMenu } from "src/actions/layout.actions";
import useSelector from "src/hooks/useSelector";
import Menu from "./Menu";

export const AlignmentType = {
  top: "top",
  left: "left",
  bottom: "bottom",
  right: "right",
};

export type Alignment = "top" | "left" | "bottom" | "right";

interface AppMenuProps {
  menus?: Array<any>; //add menu items via this props
  classes?: any;
  dividerList?: Array<any>; //add menu items under divider via this props
  menuAlignment: Array<string>;
  activeMenus?: Array<string>;
  disabledOutSiteClick?: boolean;
  isPermanent?: boolean;
}

const AppMenu = (props: AppMenuProps) => {
  const {
    menus,
    dividerList,
    menuAlignment,
    activeMenus,
    disabledOutSiteClick = false,
    isPermanent,
  } = props;

  const handleCloseAppMenu = () => {
    if (disabledOutSiteClick) return;
    updateActiveAlimentMenu([]);
  };

  return (
    <div id={"menu-wrapper"}>
      {Object.keys(AlignmentType)
        .map((key) => AlignmentType[key])
        .filter((alignment) => menuAlignment.includes(alignment))
        .map((alignment) => (
          <Drawer
            key={alignment}
            anchor={alignment}
            open={menuAlignment.includes(alignment)}
            onClose={handleCloseAppMenu}
            BackdropProps={{ invisible: disabledOutSiteClick }}
            variant={isPermanent ? "permanent" : "temporary"}
          >
            <Menu
              alignment={alignment}
              onClose={handleCloseAppMenu}
              menus={(menus || []).filter((m) => m.alignment === alignment)}
              dividerList={(dividerList || []).filter(
                (m) => m.alignment === alignment
              )}
              activeMenus={activeMenus}
            />
          </Drawer>
        ))}
    </div>
  );
};

export default AppMenu;
