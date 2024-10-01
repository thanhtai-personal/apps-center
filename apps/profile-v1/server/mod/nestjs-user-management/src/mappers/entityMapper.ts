import { AnyClass } from "@ttt/utils";
import { BaseEntity } from "@ttt-module/infra";
import { PermissionEntity, RoleEntity, UserEntity } from "~/entities/index.js";

export const entityMapper: Record<string, AnyClass<BaseEntity>> = {
  UserEntity,
  RoleEntity,
  PermissionEntity,
};
