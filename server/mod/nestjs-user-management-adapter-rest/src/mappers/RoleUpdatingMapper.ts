import {
  Permission as PermissionEntity,
  RoleCreate,
} from "@core-domain/user-management";
import { BaseMapper } from "@core-module/infra";
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
