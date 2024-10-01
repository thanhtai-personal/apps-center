import { INonPagingQuery } from "@ttt-domain/shared";
import { ISearchQuery } from "@ttt-module/infra";
import { PermissionCreate, PermissionFilter, PermissionUpdate } from "~/dtos";
import { Permission } from "~/entities";

export interface IPermissionService {
  getPaginatedPermissions(
    query?: ISearchQuery<PermissionFilter>,
  ): Promise<[Permission[], number]>;

  getManyPermissions(
    query?: INonPagingQuery<PermissionFilter>,
  ): Promise<Permission[]>;

  getPermissionById(id: number): Promise<Permission | null>;

  getPermissionByName(name: string): Promise<Permission | null>;

  createPermission(payload: PermissionCreate): Permission;

  updatePermission(
    permission: Permission,
    payload: PermissionUpdate,
  ): Permission;

  remove(permission: Permission): void;
  save(...permissions: Permission[]): Promise<void>;
}
