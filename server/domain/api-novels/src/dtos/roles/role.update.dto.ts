import { IRoleUpdating } from "@core-ui/novals-types"
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateRoleDto implements IRoleUpdating {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
  name?: string;
  description?: string;
}