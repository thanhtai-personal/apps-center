export interface INovalFilter {
  name?: string;
  shortDescription?: string;
  fullDescription?: string;
  referrence?: string;
  thumb?: string;
  star?: number;
  view?: number;
  categories?: string[];
  categoryIds?: number[];
  tags?: string[];
  author?: string;
  isFull?: boolean;
  chaptersNumber?: number;
  authorId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
  