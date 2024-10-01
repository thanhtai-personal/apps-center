import Drawer from "@material-ui/core/Drawer";
import { updateActiveAlimentMenu } from "actions/layout.actions";
import useSelector from "hooks/useSelector";
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
}

const AppMenu = (props: AppMenuProps) => {
  const { menus, dividerList } = props;
  const layoutState = useSelector((state) => state.layout);

  const handleCloseAppMenu = () => {
    updateActiveAlimentMenu([]);
  };

  return (
    <div id={"menu-wrapper"}>
      {Object.keys(AlignmentType)
        .map((key) => AlignmentType[key])
        .map((alignment) => (
          <Drawer
            key={alignment}
            anchor={alignment}
            open={layoutState.menuAlignment.includes(alignment)}
            onClose={handleCloseAppMenu}
          >
            <Menu
              alignment={alignment}
              onClose={handleCloseAppMenu}
              menus={(menus || []).filter((m) => m.alignment === alignment)}
              dividerList={(dividerList || []).filter(
                (m) => m.alignment === alignment
              )}
            />
          </Drawer>
        ))}
    </div>
  );
};

export default AppMenu;
