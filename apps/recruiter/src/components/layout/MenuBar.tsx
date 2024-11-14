import { useGlobalStyles } from "@/styles/globalStyle";
import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text } from "@core-ui/react-mui-core";
import { Popover } from "@core-ui/react-mui-core/dist/base/materials";
import clsx from "@core-ui/react-mui-core/dist/base/clsx";
import menuIcon from "@/assets/icons/home/endless.svg"
import { useStore } from "@/store/index";
import { useRecruiterStore } from "@core-logic-hooks/react-recruiter";
import { Link } from "@core-ui/react-core";
import { useState } from "react";

// Tách thành phần MenuItem
const MenuItem = observer(({ text, icon, to, className, onClick, target }: any) => {
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
      <Link to={to} target={target || "_self"}>
        <Flex p={1} centerY cursorPointer
          className={clsx(globalStyles.hoverUnderLine, globalStyles.hoverTransition)}
          onClick={handleClick}
        >
          {icon && <img src={icon} alt={ text || "missing-alt"} style={{ height: 24 }} />}
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
  const { categoryStore } = useRecruiterStore();
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
    <Flex fullWidth center mt={4}>
      <Flex fullWidth center maxWidth={PAGE_MAX_WIDTH} px={2}>
        <Flex fullWidth justifyContent="space-between"
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
    </Flex>
  );
});

// Thành phần MenuBar chính
export const MenuBar = observer(() => {
  const globalStyles = useGlobalStyles();

  return (
    <MenuBarContainer>
      <Flex flex={1} centerY>
        <MenuItem text="Thể loại" icon={menuIcon} to="#" />
      </Flex>
      <CenterMenu />
      <Flex flex={1} centerY justifyContent="flex-end">
        <MenuItem text="Cửa hàng" target="_blank" icon={menuIcon}
          to="https://shopeefood.vn/ho-chi-minh/an-vat-113-banh-trang-lui-com-chay-tuoi-113-26-duong-so-1"
          className={globalStyles.textOrbi14}
        />
      </Flex>
    </MenuBarContainer>
  );
});