import { NovalEntity } from "@/entities"
import { INovalCreation } from "@core-ui/novals-types"

export class NovalCreateDTOToEntityMapper {
  public static map(source: INovalCreation, options?: any): NovalEntity {
    const rsSource = source as NovalEntity;
    return rsSource as NovalEntity
  }
}