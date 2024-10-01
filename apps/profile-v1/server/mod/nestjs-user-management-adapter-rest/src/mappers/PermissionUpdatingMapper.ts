import { PermissionUpdate } from "@ttt-domain/user-management";
import { BaseMapper } from "@ttt-module/infra";
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
