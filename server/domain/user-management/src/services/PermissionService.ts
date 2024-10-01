import { BaseOrmService, INonPagingQuery } from "@ttt-domain/shared";
import { ISearchQuery } from "@ttt-module/infra";
import { PermissionCreate, PermissionFilter, PermissionUpdate } from "~/dtos";
import { Permission } from "~/entities";
import { IPermissionService } from "~/interfaces";

export class PermissionService
  extends BaseOrmService<Permission>
  implements IPermissionService
{
  /**
   * Retrieve permissions by its filter with limit and cursor (used for paginated result)
   * @param {ISearchQuery<PermissionFilter>} query - Include filter and paging options
   * @returns {Promise<Permission[]>} - Permissions
   */
  getPaginatedPermissions(
    query?: ISearchQuery<PermissionFilter>,
  ): Promise<[Permission[], number]> {
    return this.repository.findAndCount(
      { ...query?.filter },
      {
        ...query?.paging,
        sortBy: query?.sortBy,
        populate: query?.populate,
      },
    );
  }
  /**
   * Retrieve permissions by its filter
   * @param {INonPagingQuery<PermissionFilter, Permission>} query - Include filter and sort
   *
   * @returns {Promise<Permission[]>} - Permissions
   */
  getManyPermissions(
    query?: INonPagingQuery<PermissionFilter>,
  ): Promise<Permission[]> {
    return this.repository.find(
      { ...query?.filter },
      { sortBy: query?.sortBy, populate: query?.populate },
    );
  }
  /**
   * Retrieve permission by id
   * @param {number}id - Permission ID
   *
   * @returns {Promise<Permission | null>} - Permission
   */
  getPermissionById(id: number): Promise<Permission | null> {
    return this.repository.findOne({ id });
  }
  /**
   * Retrieve permission by name
   * @param {string}name - Permission Name
   *
   * @returns {Promise<Permission | null>} - Permission
   */
  getPermissionByName(name: string): Promise<Permission | null> {
    return this.repository.findOne({ name });
  }
  /**
   * Create Permission by payload
   * @param {PermissionCreate}payload - Permission create DTO
   *
   * @throws {@link PermissionExisted}  throw If any permission existed with the same name function will throw exception
   *
   * @returns {Promise<Permission>} - create and return permission.
   */
  createPermission(payload: PermissionCreate): Permission {
    return this.repository.create({ ...payload });
  }
  /**
   * Update Permission by payload
   * @param {PermissionUpdate} payload: - Permission update DTO
   * @param {number}payload - permissionId to update
   * @returns {Promise<Permission >} - update and return permission.
   */
  updatePermission(permission: Permission, payload: PermissionUpdate) {
    return this.repository.update(permission, {
      ...payload,
    });
  }

  /**
   * @param {Permission[]} permissions loaded an collection of permissions
   * @param {number[]} permissionIds list of permissions id from payload
   * @returns {Boolean} true collection of permissions includes all permissions id from payload
   */
  isPermissionsExist(
    permissions: Permission[],
    permissionIds?: number[],
  ): boolean {
    if (!permissionIds || !permissionIds.length) {
      return true;
    }
    if (permissionIds.length !== permissions.length) {
      return false;
    }

    const hashMap = new Set(permissions.map((obj) => obj.id));
    for (const id of permissionIds) {
      if (!hashMap.has(id)) {
        return false;
      }
    }
    return true;
  }

  async save(...permissions: Permission[]): Promise<void> {
    await this.repository.save(...permissions);
  }
  remove(permission: Permission) {
    this.repository.remove(permission);
  }
}
