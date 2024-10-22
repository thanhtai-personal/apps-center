import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IPagingFilter, IResponse, Pagination } from "@core-sdk/core";
import {
  CommentRoutes,
} from "../types";
import { ICommentCreation, ICommentFilter, ICommentResponse, ICommentUpdating } from "@core-ui/novels-types";

export class CommentService
  extends BaseService<CommentRoutes>
  implements IAbstractService<ICommentCreation, ICommentUpdating, ICommentResponse, IPagingFilter & ICommentFilter> {
  constructor(api: FetchApi<CommentRoutes>) {
    super(api);
  }
  create(createData: ICommentCreation): Promise<APIResult<IResponse<ICommentResponse>>> {
    return this.api.post("/comments", {}, createData) as Promise<
      APIResult<IResponse<ICommentResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: ICommentUpdating,
  ): Promise<APIResult<IResponse<ICommentResponse>>> {
    return this.api.put("/comments/{commentId}", { commentId: id }, updateData) as Promise<
      APIResult<IResponse<ICommentResponse>>
    >;
  }

  patchUpdate(
    commentId: string | number,
    updateData: Partial<ICommentUpdating>
  ): Promise<APIResult<IResponse<ICommentResponse>>> {
    return this.api.patch("/comments/{commentId}", { commentId }, updateData) as Promise<
      APIResult<IResponse<ICommentResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IResponse<ICommentResponse>>> {
    return this.api.get("/comments/{commentId}", { commentId: id }) as Promise<APIResult<IResponse<ICommentResponse>>>;
  }

  getMany(filter: IPagingFilter & ICommentFilter): Promise<APIResult<IResponse<Pagination<ICommentResponse>>>> {
    return this.api.get("/comments", filter) as Promise<
      APIResult<IResponse<Pagination<ICommentResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IResponse<void>>> {
    return this.api.delete("/comments/{commentId}", { commentId: id }) as Promise<
      APIResult<IResponse<void>>
    >;
  }
}
