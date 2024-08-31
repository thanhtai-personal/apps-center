export interface ICategoryUpdating {
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
  