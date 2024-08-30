export interface IUserResponse {
  id: number;
  username?: string;
  password?: string;
  email?: string;
  avatar?: string;
  token?: number;
  points?: number;
  level?: number;
  role?: string;
  roleId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
  