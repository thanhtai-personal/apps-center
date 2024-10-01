import { BaseOrmService, INonPagingQuery } from "@ttt-domain/shared";
import { ISearchQuery } from "@ttt-module/infra";
import { UserCreate, UserFilter, UserPropertyUpdate, UserUpdate } from "~/dtos";
import { Role, User } from "~/entities";
import { EmailAlreadyInUseException } from "~/exceptions";
import { IUserService } from "~/interfaces";

export class UserService extends BaseOrmService<User> implements IUserService {
  /**
   * Retrieve an user by their unique identifier.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<User | null>} A Promise of user which get form repository with the specified ID, or null if not found.
   */
  async getById(id: number): Promise<User | null> {
    return await this.repository.findOne({ id }, { populate: ["roles"] });
  }

  /**
   * Retrieve an user by their email address.
   * @param {string} email - The email address of the user to retrieve.
   * @throws {@link EmailInvalidFormat}
   * @returns {Promise<User | null>} A Promise of user get form repository with the specified email, or null if not found.
   */
  async getByEmail(email: string): Promise<User | null> {
    //check if given email in payload is valid email format
    return await this.repository.findOne({ email }, { populate: ["roles"] });
  }

  /**
   * Create new user.
   * @param  {UserCreate} payload Contain user mandatory fields for create new user.
   * @returns {Promise<User>} Return a promise created user base on given payload that load from repository must have role is User and status is Registered.
   * @throws {@link EmailAlreadyInUse}
   *
   */
  async createUser(payload: UserCreate): Promise<User> {
    //Get user by email to check that if email is used
    const user = await this.getByEmail(payload.email);
    if (user) {
      throw new EmailAlreadyInUseException("Email is already in use");
    }

    return this.repository.create(payload);
  }

  /**
   * Retrieve list of user from the repository based on the filter and option parameters
   * @param {ISearchQuery<UserFilter>} query - Filter and sort condition of user
   * @param query.filter - Filter condition to get list of user
   * @param query.paging - Pagination option of paginate role {cursor, limit}
   * @param query.sort - Sort direction and sort by field of role to paginated user
   * @returns {Promise<Pagination<User>>} Return an array `[data, total]` of users and total user found match filter
   *
   */
  async getPaginatedUsers(
    query?: ISearchQuery<UserFilter>,
  ): Promise<[User[], number]> {
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
   * @param {INonPagingQuery<UserFilter>} query - INonPagingQuery receive property filter to filter available properties for get list of users
   * property sort contains sort by which property and sort condition
   * @returns {Promise<User[]>} Retrieve the list of users along with the total number of users existing in the database
   */
  async getManyUsers(query?: INonPagingQuery<UserFilter>): Promise<User[]> {
    return await this.repository.find(
      { ...query?.filter },
      {
        sortBy: query?.sortBy,
        populate: query?.populate,
      },
    );
  }

  /**
   * Update user profile by given user entity and user's data to update
   * @param {User} user
   * @param {IUserProfileUpdate} payload
   * @returns {User} Updated user that includes the specified value in the payload
   */
  async updateUser(user: User, payload: UserUpdate): Promise<User> {
    const existedUser = await this.getByEmail(payload.email);
    if (existedUser) {
      throw new EmailAlreadyInUseException("Email is already in use");
    }

    return this.repository.update(user, payload);
  }

  /**
   * Update role of user by given use entity and list roles
   * @param {UserEntity} user - User to update new role.
   * @param {RoleEntity[]} roles - The role list need to update for user.
   * @returns {UserEntity} Updated user that includes the role value in the payload
   */
  updateRoles(user: User, roles: Role[]): User {
    return this.repository.update(user, {
      roles: [...roles, ...user.roles],
    });
  }

  /**
   * Update property of user by given user entity and property to update
   * @param {User} user - Entity of user
   * @param {UserPropertyUpdate} payload - User's property to update
   * @throws {EmailAlreadyInUseException} - Throw when user attempting to update email already in use
   * @returns {User} - User entity updated given property
   *
   */
  async updateUserProperty(
    user: User,
    payload: UserPropertyUpdate,
  ): Promise<User> {
    if (payload.property === "email") {
      const user = await this.getByEmail(payload.value.toString());
      if (user) {
        throw new EmailAlreadyInUseException("Email already in use");
      }
    }
    return this.repository.update(user, {
      [payload.property]: payload.value,
    });
  }

  async save(...users: User[]): Promise<void> {
    await this.repository.save(...users);
  }
  remove(user: User) {
    this.repository.remove(user);
  }
}
