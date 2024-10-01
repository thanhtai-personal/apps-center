import { INonPagingQuery } from "@ttt-domain/shared";
import { ISearchQuery } from "@ttt-module/infra";
import { UserCreate, UserFilter, UserPropertyUpdate, UserUpdate } from "~/dtos";
import { Role, User } from "~/entities";

export interface IUserService {
  getById(userId: number): Promise<User | null>;

  getByEmail(email: string): Promise<User | null>;

  getPaginatedUsers(
    query?: ISearchQuery<UserFilter>,
  ): Promise<[User[], number]>;

  getManyUsers(query?: INonPagingQuery<UserFilter>): Promise<User[]>;

  createUser(payload: UserCreate): Promise<User>;

  updateUser(user: User, payload: UserUpdate): Promise<User>;

  updateUserProperty(user: User, property: UserPropertyUpdate): Promise<User>;

  updateRoles(user: User, roles: Role[]): User;

  save(...users: User[]): Promise<void>;
}
