import { CategoryEntity } from "@/entities"
import { ICategoryCreation } from "@core-ui/novals-types"

export class CategoryCreateDTOToEntityMapper {
  public static map(source: ICategoryCreation, options?: any): CategoryEntity {
    const rsSource = source as CategoryEntity;
    return rsSource as CategoryEntity
  }
}