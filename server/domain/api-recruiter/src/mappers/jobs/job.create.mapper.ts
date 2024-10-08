import { JobEntity } from "@/entities"

export class JobCreateDTOToEntityMapper {
  public static map(source: any, options?: any): JobEntity {
    const rsSource = source as JobEntity;
    return rsSource as JobEntity
  }
}