export interface ICategeryUpdating {
  id: number;
  name?: string;
  description?: string;
  image?: string;
  icon?: string;
  parentCategoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
  