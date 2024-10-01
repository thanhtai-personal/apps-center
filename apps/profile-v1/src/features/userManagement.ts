import { ReactApplicationManager } from "@core-ui/react-core";
import { UserManagementManager } from "@core-ui/react-user-management-mantine";

export const injectUserManagement = (reactApp: ReactApplicationManager) => {
  const usermanagementManager = new UserManagementManager({
    languageKey: "en",
    languages: { "en" : {}},
    themeKey: "light",
  });
  return usermanagementManager.inject(reactApp);
}