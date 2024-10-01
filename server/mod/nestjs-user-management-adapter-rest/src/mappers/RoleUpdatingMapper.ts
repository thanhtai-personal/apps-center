import {
  Permission as PermissionEntity,
  RoleCreate,
} from "@ttt-domain/user-management";
import { BaseMapper } from "@ttt-module/infra";
import { RoleUpdatingBody } from "~/models";

interface RoleCreationOption {
  permissions?: PermissionEntity[];
}

export class RoleUpdatingMapper extends BaseMapper<
  RoleUpdatingBody,
  RoleCreate,
  RoleCreationOption
> {
  map(source: RoleUpdatingBody, opts: RoleCreationOption): RoleCreate {
    return {
      permissions: opts.permissions ?? [],
      name: source.name,
    };
  }
}
