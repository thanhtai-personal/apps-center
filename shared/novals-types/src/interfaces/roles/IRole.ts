export interface IRole {
  id: number;
  name?: string;
  description?: string;
  // permissions?: IPermission[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
  