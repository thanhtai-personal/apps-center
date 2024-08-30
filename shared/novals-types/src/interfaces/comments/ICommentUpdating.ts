export interface ICommentUpdating {
  id: number;
  username?: string;
  email?: string;
  avatar?: string;
  userId?: number;
  novalId?: number;
  chapterId?: number;
  content?: string;
  htmlContent?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
  