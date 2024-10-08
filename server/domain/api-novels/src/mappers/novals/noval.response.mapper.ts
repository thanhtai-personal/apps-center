import { NovalEntity } from "@/entities"
import { INovalResponse } from "@core-ui/novals-types"

export class NovalEntityToNovalResponse {
  public static map(source: NovalEntity, options?: any): INovalResponse {
    return source
  }

  public static maps(sources: NovalEntity[], options?: any): INovalResponse[] {
    return sources.map((item) => NovalEntityToNovalResponse.map(item))
  }
}