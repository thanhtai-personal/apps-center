import { AuthorEntity } from "@/entities"
import { IAuthorCreation } from "@core-ui/novals-types"

export class AuthorCreateDTOToEntityMapper {
  public static map(source: IAuthorCreation, options?: any): AuthorEntity {
    const rsSource = source as AuthorEntity;
    return rsSource as AuthorEntity
  }
}