import { ICategoryCreation } from "@core-ui/jobs-listing-types"

export class CreateCategoryDto implements ICategoryCreation {
  name?: string;
  description?: string;
  image?: string;
  icon?: string;
  parentCategoryId?: number;
}