import { Role as RoleEntity } from "@core-domain/user-management";
import { AutoMapper } from "@core-module/infra";
import { Role } from "~/models";

export const RoleMapper = new AutoMapper(RoleEntity, Role).ensure();
