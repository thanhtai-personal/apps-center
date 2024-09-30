export interface IUser {
  id: number;
  username?: string;
  password?: string;
  email?: string;
  avatar?: string;
  points?: number;
  token?: number;
  level?: number;
  role?: string;
  roleId?: number;
  salt?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
  