import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IPagingFilter, IResponse, Pagination } from "@core-sdk/core";
import {
  NovelRoutes,
} from "../types";
import { INovelCreation, INovelFilter, INovelResponse, INovelUpdating } from "@core-ui/novels-types";

export class NovelService
  extends BaseService<NovelRoutes>
  implements IAbstractService<INovelCreation, INovelUpdating, INovelResponse, IPagingFilter & INovelFilter> {
  constructor(api: FetchApi<NovelRoutes>) {
    super(api);
  }
  create(createData: INovelCreation): Promise<APIResult<IResponse<INovelResponse>>> {
    return this.api.post("/novels", {}, createData) as Promise<
      APIResult<IResponse<INovelResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: INovelUpdating,
  ): Promise<APIResult<IResponse<INovelResponse>>> {
    return this.api.put("/novels/{novelId}", { novelId: id }, updateData) as Promise<
      APIResult<IResponse<INovelResponse>>
    >;
  }

  patchUpdate(
    novelId: string | number,
    updateData: Partial<INovelUpdating>
  ): Promise<APIResult<IResponse<INovelResponse>>> {
    return this.api.patch("/novels/{novelId}", { novelId }, updateData) as Promise<
      APIResult<IResponse<INovelResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IResponse<INovelResponse>>> {
    return this.api.get("/novels/{novelId}", { novelId: id }) as Promise<APIResult<IResponse<INovelResponse>>>;
  }

  getMany(filter: IPagingFilter & INovelFilter): Promise<APIResult<IResponse<Pagination<INovelResponse>>>> {
    return this.api.get("/novels", filter) as Promise<
      APIResult<IResponse<Pagination<INovelResponse>>>
    >;
  }

  getRanking(filter: IPagingFilter): Promise<APIResult<IResponse<{
    topVote: INovelResponse[];
    topView: INovelResponse[];
    topLike: INovelResponse[];
    topFollow: INovelResponse[];
  }>>> {
    return this.api.get("/novels/ranking", filter) as Promise<
      APIResult<IResponse<{
        topVote: INovelResponse[];
        topView: INovelResponse[];
        topLike: INovelResponse[];
        topFollow: INovelResponse[];
      }>>
    >;
  }

  delete(
    id: string | number,
  ): Promise<APIResult<IResponse<void>>> {
    return this.api.delete("/novels/{novelId}", { novelId: id }) as Promise<
      APIResult<IResponse<void>>
    >;
  }
}
