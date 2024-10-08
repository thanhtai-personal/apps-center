import { JobEntity } from "@/entities"

export class JobEntityToJobResponse {
  public static map(source: JobEntity, options?: any): any {
    return source
  }

  public static maps(sources: JobEntity[], options?: any): any[] {
    return sources.map((item) => JobEntityToJobResponse.map(item))
  }
}