import { PermissionCreate } from "@core-domain/user-management";
import { BaseMapper } from "@core-module/infra";
import { PermissionCreationBody } from "~/models";

export class PermissionCreationMapper extends BaseMapper<
  PermissionCreationBody,
  PermissionCreate
> {
  map(source: PermissionCreationBody): PermissionCreate {
    return {
      name: source.name,
      description: source.description,
    };
  }
}
