import { IAuthorCreation } from "@core-ui/novals-types"

export class CreateAuthorDto implements IAuthorCreation {
  name?: string;
  description?: string;
  avatar?: string;
  userId?: number;
}