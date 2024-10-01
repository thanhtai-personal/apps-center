import { AnyClass } from "@core/utils";
import { BaseEntity } from "@core-module/infra";
import { PermissionEntity, RoleEntity, UserEntity } from "~/entities/index.js";

export const entityMapper: Record<string, AnyClass<BaseEntity>> = {
  UserEntity,
  RoleEntity,
  PermissionEntity,
};
