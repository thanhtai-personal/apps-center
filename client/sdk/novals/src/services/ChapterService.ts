import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IPagingFilter, IResponse, Pagination } from "@core-sdk/core";
import {
  ChapterRoutes,
} from "../types";
import { IChapterCreation, IChapterFilter, IChapterResponse, IChapterUpdating } from "@core-ui/novals-types";

export class ChapterService
  extends BaseService<ChapterRoutes>
  implements IAbstractService<IChapterCreation, IChapterUpdating, IChapterResponse, IPagingFilter & IChapterFilter> {
  constructor(api: FetchApi<ChapterRoutes>) {
    super(api);
  }
  create(createData: IChapterCreation): Promise<APIResult<IResponse<IChapterResponse>>> {
    return this.api.post("/chapters", {}, createData) as Promise<
      APIResult<IResponse<IChapterResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: IChapterUpdating,
  ): Promise<APIResult<IResponse<IChapterResponse>>> {
    return this.api.put("/chapters/{chapterId}", { chapterId: id }, updateData) as Promise<
      APIResult<IResponse<IChapterResponse>>
    >;
  }

  patchUpdate(
    chapterId: string | number,
    updateData: Partial<IChapterUpdating>
  ): Promise<APIResult<IResponse<IChapterResponse>>> {
    return this.api.patch("/chapters/{chapterId}", { chapterId }, updateData) as Promise<
      APIResult<IResponse<IChapterResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IResponse<IChapterResponse>>> {
    return this.api.get("/chapters/{chapterId}", { chapterId: id }) as Promise<APIResult<IResponse<IChapterResponse>>>;
  }

  getMany(filter: IPagingFilter & IChapterFilter): Promise<APIResult<IResponse<Pagination<IChapterResponse>>>> {
    return this.api.get("/chapters", filter) as Promise<
      APIResult<IResponse<Pagination<IChapterResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IResponse<void>>> {
    return this.api.delete("/chapters/{chapterId}", { chapterId: id }) as Promise<
      APIResult<IResponse<void>>
    >;
  }
}
