import { useGlobalStyles } from "@/styles/globalStyle";
import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text } from "@core-ui/react-mui-core";
import { Popover } from "@core-ui/react-mui-core/materials";
import clsx from "@core-ui/react-mui-core/clsx";
import menuIcon from "@/assets/icons/home/endless.svg"
import { useStore } from "@/store/index";
import { useNovalsStore } from "@core-ui/react-novals";
import { Link } from "@core-ui/react-core";
import { useState } from "react";

// Tách thành phần MenuItem
const MenuItem = observer(({ text, icon, to, className, onClick }: any) => {
  const globalStyles = useGlobalStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Link to={to}>
        <Flex p={1} centerY cursorPointer
          className={clsx(globalStyles.hoverUnderLine, globalStyles.hoverTransition)}
          onClick={handleClick}
        >
          {icon && <img src={icon} alt={text} style={{ height: 24 }} />}
          <Text ml={1} className={className || globalStyles.textCharka14}>{text}</Text>
        </Flex>
      </Link>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <CategoryList />
      </Popover>
    </>
  );
});

// Thêm component CategoryList
const CategoryList = observer(() => {
  const { categoryStore } = useNovalsStore();
  const globalStyles = useGlobalStyles();

  return (
    <Flex flexDirection="column" p={2}>
      {(categoryStore.categories?.data || []).map((category) => (
        <Link key={category.id} to={`/the-loai/${category.name}`}>
          <Text className={clsx(globalStyles.hoverUnderLine, globalStyles.textCharka14)} mb={1}>{category.name}</Text>
        </Link>
      ))}
    </Flex>
  );
});

// Tách thành phần CenterMenu
const CenterMenu = observer(() => {
  const menuItems = [
    { name: "Bảng xếp hạng", to: "/bang-xep-hang" },
    { name: "Bộ lọc", to: "/bo-loc" },
    { name: "Reviews", to: "/reviews" }
  ];

  return (
    <Flex center flex={3}>
      {menuItems.map((item, index) => (
        <MenuItem key={index} text={item.name} to={item.to} icon={null} />
      ))}
    </Flex>
  );
});

// Tách thành phần MenuBarContainer
const MenuBarContainer = observer(({ children }) => {
  const { uiStore } = useStore();

  return (
    <Flex fullWidth center>
      <Flex fullWidth justifyContent="space-between" maxWidth={PAGE_MAX_WIDTH}
        border="solid 1px rgba(255,255,255, 0.2)"
        bgcolor={uiStore.colors.background1}
        p={1}
        style={{
          borderLeft: "none",
          borderRight: "none",
          borderRadius: "8px",
          boxShadow: "rgba(127, 229, 247, 0.74) 0 0 0.15em 0.15em"
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
});

// Thành phần MenuBar chính
export const MenuBar = observer(() => {
  const globalStyles = useGlobalStyles();

  return (
    <MenuBarContainer>
      <MenuItem text="Thể loại" icon={menuIcon} to="#" />
      <CenterMenu />
      <Flex flex={1} centerY justifyContent="flex-end">
        <MenuItem text="Cửa hàng" icon={menuIcon} to="/store" className={globalStyles.textOrbi14} />
      </Flex>
    </MenuBarContainer>
  );
});