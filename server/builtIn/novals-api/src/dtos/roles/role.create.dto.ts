import { IRoleCreation } from "@core-ui/novals-types"

export class CreateRoleDto implements IRoleCreation {
  name?: string;
  description?: string;
}