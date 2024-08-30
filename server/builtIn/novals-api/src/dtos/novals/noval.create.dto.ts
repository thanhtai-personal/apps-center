import { INovalCreation } from "@core-ui/novals-types"

export class CreateNovalDto implements INovalCreation {
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
}