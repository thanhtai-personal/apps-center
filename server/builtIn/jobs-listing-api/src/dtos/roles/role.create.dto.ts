import { IRoleCreation } from "@core-ui/jobs-listing-types"

export class CreateRoleDto implements IRoleCreation {
  name?: string;
  description?: string;
}