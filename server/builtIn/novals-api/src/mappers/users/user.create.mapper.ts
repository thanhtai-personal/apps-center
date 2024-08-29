import { UserEntity } from "@/entities"
import { IUserCreation } from "@core-ui/novals-types"

export class UserCreateDTOToEntityMapper {
  public static map(source: IUserCreation, options?: any): UserEntity {
    const rsSource = source as UserEntity;
    return rsSource as UserEntity
  }
}