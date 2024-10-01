import { PermissionUpdate } from "@core-domain/user-management";
import { BaseMapper } from "@core-module/infra";
import { PermissionUpdatingBody } from "~/models";

export class PermissionUpdatingMapper extends BaseMapper<
  PermissionUpdatingBody,
  PermissionUpdate
> {
  map(source: PermissionUpdatingBody): PermissionUpdate {
    return {
      name: source.name,
      description: source.description,
    };
  }
}
