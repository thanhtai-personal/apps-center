import { INonPagingQuery, BaseOrmService } from "@ttt-domain/shared";
import { Role } from "~/entities";
import { RoleCreate, RoleFilter, RoleUpdate } from "~/dtos";
import { IRoleService } from "~/interfaces";
import { ISearchQuery } from "@ttt-module/infra";

export class RoleService extends BaseOrmService<Role> implements IRoleService {
  /**
   * Create new role by given role name and list of permissions
   * @param {RoleCreate} payload - Include basic need detail for create new role
   * @returns {Role} - Created role include given role name and permission
   */
  createRole(payload: RoleCreate): Role {
    return this.repository.create(payload);
  }

  /**
   * Retrieve role detail by given roleId
   * @param {number} id - Id of role to retrieve
   * @return {Promise<Role | null>} Role data if existing, else NULL
   */
  async getRoleById(id: number): Promise<Role | null> {
    return await this.repository.findOne({ id }, { populate: ["permissions"] });
  }

  /**
   * Retrieve role detail by given roleName
   * @param {string} name - Name of role to retrieve
   * @return {Promise<Role | null>} Role data if existing, else NULL
   */
  async getRoleByName(name: string): Promise<Role | null> {
    return await this.repository.findOne({ name });
  }

  /**
   * Retrieve an array of Roles
   * @param {INonPagingQuery<RoleFilter>} query - INonPagingQuery receive property filter to filter available properties for get list of roles
   * property sort contains sort by which property and sort condition
   * @return {Promise<Role[]>} Array of Roles
   */
  async getManyRoles(query?: INonPagingQuery<RoleFilter>): Promise<Role[]> {
    return await this.repository.find(
      {
        ...query?.filter,
      },
      {
        sortBy: query?.sortBy,
        populate: query?.populate,
      },
    );
  }

  /**
   * Update role data given role and specified data
   *
   * @param {Role} role - Role entity to update data
   * @param {RoleUpdate} payload - Data fields to update into role
   * @returns {Role} - Updated role that includes the specified value in the payload
   */
  updateRole(role: Role, payload: RoleUpdate): Role {
    return this.repository.update(role, {
      ...payload,
    });
  }

  /**
   * Retrieve list of user from the repository based on the filter and option parameters
   * @param {ISearchQuery<RoleFilter>} query - Filter and sort condition of role
   * @description {ISearchQuery} ISearchQuery
   *  - `query.filter` - Filter condition to get list of role
   *  - `query.paging` - Pagination option of paginate role {cursor, limit}
   *  - `query.sort` - Sort direction and sort by field of role to paginated role
   * @returns {Promise<Pagination<Role>>}  Return an array `[data, total]` of users and total user found match filter
   *
   */
  async getPaginatedRoles(
    query?: ISearchQuery<RoleFilter>,
  ): Promise<[Role[], number]> {
    return await this.repository.findAndCount(
      { ...query?.filter },
      {
        ...query?.paging,
        sortBy: query?.sortBy,
        populate: query?.populate,
      },
    );
  }

  /**
   * @param {Role[]} roles loaded an collection of roles
   * @param {number[]} rolesIds list of roles id from payload
   * @returns {Boolean} true collection of roles includes all roles id from payload
   */
  isRolesExist(roles: Role[], rolesIds?: number[]): boolean {
    if (!rolesIds || !rolesIds.length) {
      return true;
    }

    if (rolesIds.length !== roles.length) {
      return false;
    }

    const hashMap = new Set(roles.map((obj) => obj.id));
    for (const id of rolesIds) {
      if (!hashMap.has(id)) {
        return false;
      }
    }
    return true;
  }

  async save(...roles: Role[]): Promise<void> {
    await this.repository.save(...roles);
  }

  remove(role: Role) {
    this.repository.remove(role);
  }
}
