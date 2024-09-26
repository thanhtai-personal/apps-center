import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IPagingFilter, IResponse, Pagination } from "@core-sdk/core";
import {
  JobRoutes,
} from "../types";

export class JobService
  extends BaseService<JobRoutes>
  implements IAbstractService<any, any, any, IPagingFilter & any> {
  constructor(api: FetchApi<JobRoutes>) {
    super(api);
  }
  create(createData: any): Promise<APIResult<IResponse<any>>> {
    return this.api.post("/jobs", {}, createData) as Promise<
      APIResult<IResponse<any>>
    >;
  }
  update(
    id: string | number,
    updateData: any,
  ): Promise<APIResult<IResponse<any>>> {
    return this.api.put("/jobs/{jobId}", { jobId: id }, updateData) as Promise<
      APIResult<IResponse<any>>
    >;
  }

  patchUpdate(
    jobId: string | number,
    updateData: Partial<any>
  ): Promise<APIResult<IResponse<any>>> {
    return this.api.patch("/jobs/{jobId}", { jobId }, updateData) as Promise<
      APIResult<IResponse<any>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IResponse<any>>> {
    return this.api.get("/jobs/{jobId}", { jobId: id }) as Promise<APIResult<IResponse<any>>>;
  }

  getMany(filter: IPagingFilter & any): Promise<APIResult<IResponse<Pagination<any>>>> {
    return this.api.get("/jobs", filter) as Promise<
      APIResult<IResponse<Pagination<any>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IResponse<void>>> {
    return this.api.delete("/jobs/{jobId}", { jobId: id }) as Promise<
      APIResult<IResponse<void>>
    >;
  }

  exportAnydayJob(jobId: string, categoryId: number, htmlString: string) {
    return this.api.post("/crawler/aniday", {}, { htmlString, categoryId, jobId }) as Promise<
      APIResult<IResponse<any>>
    >;
  }
}
