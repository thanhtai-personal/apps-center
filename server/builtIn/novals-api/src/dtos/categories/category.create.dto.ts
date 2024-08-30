import { ICategoryCreation } from "@core-ui/novals-types"

export class CreateCategoryDto implements ICategoryCreation {
  name?: string;
  description?: string;
  image?: string;
  icon?: string;
  parentCategoryId?: number;
}