import { Permission } from "~/entities";

export class RoleCreate {
  name!: string;
  permissions?: Permission[];
}
