import { Permission as PermissionEntity } from "@core-domain/user-management";
import { AutoMapper } from "@core-module/infra";
import { Permission } from "~/models";

export const PermissionMapper = new AutoMapper(
  PermissionEntity,
  Permission,
).ensure();
