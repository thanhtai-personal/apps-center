import { IMikroOrmRepository } from "@ttt-module/infra";
import { AnyClass } from "@ttt/utils";
import { UserRepository } from "./UserRepository.js";
import { RoleRepository } from "./RoleRepository.js";
import { PermissionRepository } from "./PermissionRepository.js";

export const repositoryMapper: Record<string, AnyClass<IMikroOrmRepository>> = {
  UserRepository,
  RoleRepository,
  PermissionRepository,
};
