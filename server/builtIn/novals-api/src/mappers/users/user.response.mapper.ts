import { UserEntity } from "@/entities"
import {IUserResponse } from "@core-ui/novals-types"

export class UserEntityToUserResponse {
  public static map(source: UserEntity, options?: any): IUserResponse {
    return {
      id: source.id,
      points: source.points,
    }
  }

  public static maps(sources: UserEntity[], options?: any): IUserResponse[] {
    return sources.map((item) => UserEntityToUserResponse.map(item))
  }
}