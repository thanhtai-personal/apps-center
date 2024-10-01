import { PermissionCreate } from "@ttt-domain/user-management";
import { BaseMapper } from "@ttt-module/infra";
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
