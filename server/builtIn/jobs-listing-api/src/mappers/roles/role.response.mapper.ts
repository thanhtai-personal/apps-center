import { RoleEntity } from "@/entities"
import { IRoleResponse } from "@core-ui/jobs-listing-types"

export class RoleEntityToRoleResponse {
  public static map(source: RoleEntity, options?: any): IRoleResponse {
    return source
  }

  public static maps(sources: RoleEntity[], options?: any): IRoleResponse[] {
    return sources.map((item) => RoleEntityToRoleResponse.map(item))
  }
}