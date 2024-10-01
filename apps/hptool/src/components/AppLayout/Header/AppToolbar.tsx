import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { updateActiveAlimentMenu } from "src/actions/layout.actions";
import { AlignmentType } from "../AppMenu";
import { toolBarStyles } from "./styles";

interface AppToolbarProps {
  children?: any;
}

const AppToolbar = (props: AppToolbarProps) => {
  const {} = props;

  const classes = toolBarStyles();

  const handleOpenDrawer = () => {
    updateActiveAlimentMenu([AlignmentType.left]);
  };

  return (
    <Toolbar>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
        onClick={handleOpenDrawer}
      >
        <MenuIcon />
      </IconButton>
      {props.children && props.children}
    </Toolbar>
  );
};
export default AppToolbar;
