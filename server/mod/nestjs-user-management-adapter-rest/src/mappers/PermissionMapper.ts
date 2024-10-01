import { Permission as PermissionEntity } from "@ttt-domain/user-management";
import { AutoMapper } from "@ttt-module/infra";
import { Permission } from "~/models";

export const PermissionMapper = new AutoMapper(
  PermissionEntity,
  Permission,
).ensure();
