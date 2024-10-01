import {
  IconArrowsLeftRight,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
  IconTrash,
  Menu,
  rem,
} from "@ttt-ui/react-mantine-core";

export interface IAppMenuProps {}

export const AppMenu = ({}: IAppMenuProps) => {
  const pathname = window.location.pathname

  return (
    <div className="w-fit min-h-screen overflow-auto bg-white dark:bg-black">
      <Menu shadow="md" width={200}>
        <Menu.Label>User Management</Menu.Label>
        <Menu.Item
          className={`${pathname === "/admin/users" && "bg-item-active"}`}
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
        >
          <a href="/admin/users">User</a>
        </Menu.Item>
        <Menu.Item
          className={`${pathname === "/admin/roles" && "bg-item-active"}`}
          leftSection={
            <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
          }
        >
          <a href="/admin/roles">Role</a>
        </Menu.Item>
        <Menu.Item
          className={`${pathname === "/admin/permission" && "bg-item-active"}`}
          leftSection={
            <IconPhoto style={{ width: rem(14), height: rem(14) }} />
          }
        >
          <a href="/admin/permission">Permission</a>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Configuration</Menu.Label>
        <Menu.Item
          leftSection={
            <IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Form widget
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Email template
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Multi language support
        </Menu.Item>
      </Menu>
    </div>
  );
};
