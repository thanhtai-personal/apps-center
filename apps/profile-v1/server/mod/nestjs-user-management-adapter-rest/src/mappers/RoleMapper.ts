import { Role as RoleEntity } from "@ttt-domain/user-management";
import { AutoMapper } from "@ttt-module/infra";
import { Role } from "~/models";

export const RoleMapper = new AutoMapper(RoleEntity, Role).ensure();
