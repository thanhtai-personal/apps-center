import { Menu, MenuItem } from "@material-ui/core";

interface AccountMenuProps {
  alignment: any;
  menuId: string;
  isMenuOpen: boolean;
  handleMenuClose: any;
}

const AccountMenu = (props: AccountMenuProps) => {
  const { alignment, menuId, isMenuOpen, handleMenuClose } = props;

  return (
    <Menu
      anchorEl={alignment}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
};

export default AccountMenu;
