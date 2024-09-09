import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IPagingFilter, IResponse, Pagination } from "@core-sdk/core";
import {
  NovalRoutes,
} from "../types";
import { INovalCreation, INovalFilter, INovalResponse, INovalUpdating } from "@core-ui/novals-types";

export class NovalService
  extends BaseService<NovalRoutes>
  implements IAbstractService<INovalCreation, INovalUpdating, INovalResponse, IPagingFilter & INovalFilter> {
  constructor(api: FetchApi<NovalRoutes>) {
    super(api);
  }
  create(createData: INovalCreation): Promise<APIResult<IResponse<INovalResponse>>> {
    return this.api.post("/novals", {}, createData) as Promise<
      APIResult<IResponse<INovalResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: INovalUpdating,
  ): Promise<APIResult<IResponse<INovalResponse>>> {
    return this.api.put("/novals/{novalId}", { novalId: id }, updateData) as Promise<
      APIResult<IResponse<INovalResponse>>
    >;
  }

  patchUpdate(
    novalId: string | number,
    updateData: Partial<INovalUpdating>
  ): Promise<APIResult<IResponse<INovalResponse>>> {
    return this.api.patch("/novals/{novalId}", { novalId }, updateData) as Promise<
      APIResult<IResponse<INovalResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IResponse<INovalResponse>>> {
    return this.api.get("/novals/{novalId}", { novalId: id }) as Promise<APIResult<IResponse<INovalResponse>>>;
  }

  getMany(filter: IPagingFilter & INovalFilter): Promise<APIResult<IResponse<Pagination<INovalResponse>>>> {
    return this.api.get("/novals", filter) as Promise<
      APIResult<IResponse<Pagination<INovalResponse>>>
    >;
  }

  getRanking(filter: IPagingFilter): Promise<APIResult<IResponse<{
    topVote: INovalResponse[];
    topView: INovalResponse[];
    topLike: INovalResponse[];
    topFollow: INovalResponse[];
  }>>> {
    return this.api.get("/novals/ranking", filter) as Promise<
      APIResult<IResponse<{
        topVote: INovalResponse[];
        topView: INovalResponse[];
        topLike: INovalResponse[];
        topFollow: INovalResponse[];
      }>>
    >;
  }

  delete(
    id: string | number,
  ): Promise<APIResult<IResponse<void>>> {
    return this.api.delete("/novals/{novalId}", { novalId: id }) as Promise<
      APIResult<IResponse<void>>
    >;
  }
}
