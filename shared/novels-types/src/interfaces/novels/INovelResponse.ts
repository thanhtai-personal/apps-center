export interface INovelResponse {
  id?: number;
  name?: string;
  shortDescription?: string;
  fullDescription?: string;
  referrence?: string;
  thumb?: string;
  star?: number;
  view?: number;
  like?: number;
  follow?: number;
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
  