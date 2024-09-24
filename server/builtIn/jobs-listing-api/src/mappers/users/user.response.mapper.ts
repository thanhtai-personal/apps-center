import { UserEntity } from "@/entities"
import { IUserResponse } from "@core-ui/jobs-listing-types"

export class UserEntityToUserResponse {
  public static map(source: UserEntity, options?: any): IUserResponse {
    return source
  }

  public static maps(sources: UserEntity[], options?: any): IUserResponse[] {
    return sources.map((item) => UserEntityToUserResponse.map(item))
  }
}