import {
  Permission as PermissionEntity,
  RoleCreate,
} from "@core-domain/user-management";
import { BaseMapper } from "@core-module/infra";
import { RoleCreationBody } from "~/models";

interface IOptions {
  permissions?: PermissionEntity[];
}

export class RoleCreationMapper extends BaseMapper<
  RoleCreationBody,
  RoleCreate,
  IOptions
> {
  map(source: RoleCreationBody, opts: IOptions): RoleCreate {
    return {
      permissions: opts.permissions ?? [],
      name: source.name,
    };
  }
}
