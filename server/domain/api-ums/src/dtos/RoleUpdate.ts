import { Permission } from "~/entities";

export class RoleUpdate {
  name!: string;
  description?: string;
  permissions?: Permission[];
}
