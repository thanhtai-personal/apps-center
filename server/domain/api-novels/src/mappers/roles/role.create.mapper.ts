import { RoleEntity } from "@/entities"
import { IRoleCreation } from "@core-ui/novals-types"

export class RoleCreateDTOToEntityMapper {
  public static map(source: IRoleCreation, options?: any): RoleEntity {
    const rsSource = source as RoleEntity;
    return rsSource as RoleEntity
  }
}