import { INonPagingQuery } from "@ttt-domain/shared";
import { ISearchQuery } from "@ttt-module/infra";
import { RoleCreate, RoleFilter, RoleUpdate } from "~/dtos";
import { Role } from "~/entities";

export interface IRoleService {
  getPaginatedRoles(
    query?: ISearchQuery<RoleFilter>,
  ): Promise<[Role[], number]>;

  getManyRoles(query?: INonPagingQuery<RoleFilter>): Promise<Role[]>;

  getRoleById(id: number): Promise<Role | null>;

  getRoleByName(name: string): Promise<Role | null>;

  createRole(payload: RoleCreate): Role;

  updateRole(role: Role, payload: RoleUpdate): Role;

  save(...roles: Role[]): Promise<void>;

  remove(...roles: Role[]): void;
}
