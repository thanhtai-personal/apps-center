import { UserService } from "./UserService.js";
import { RoleService } from "./RoleService.js";
import { PermissionService } from "./PermissionService.js";
import { IService } from "@ttt-module/infra";
import { AnyClass } from "@ttt/utils";

export const serviceMapper: Record<string, AnyClass<IService>> = {
  IUserService: UserService,
  IRoleService: RoleService,
  IPermissionService: PermissionService,
};
