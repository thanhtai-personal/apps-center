import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IPagingFilter, IResponse, Pagination } from "@core-sdk/core";
import {
  AuthorRoutes,
} from "../types";
import { IAuthorCreation, IAuthorFilter, IAuthorResponse, IAuthorUpdating } from "@core-ui/novels-types";

export class AuthorService
  extends BaseService<AuthorRoutes>
  implements IAbstractService<IAuthorCreation, IAuthorUpdating, IAuthorResponse, IPagingFilter & IAuthorFilter> {
  constructor(api: FetchApi<AuthorRoutes>) {
    super(api);
  }
  create(createData: IAuthorCreation): Promise<APIResult<IResponse<IAuthorResponse>>> {
    return this.api.post("/authors", {}, createData) as Promise<
      APIResult<IResponse<IAuthorResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: IAuthorUpdating,
  ): Promise<APIResult<IResponse<IAuthorResponse>>> {
    return this.api.put("/authors/{authorId}", { authorId: id }, updateData) as Promise<
      APIResult<IResponse<IAuthorResponse>>
    >;
  }

  patchUpdate(
    authorId: string | number,
    updateData: Partial<IAuthorUpdating>
  ): Promise<APIResult<IResponse<IAuthorResponse>>> {
    return this.api.patch("/authors/{authorId}", { authorId }, updateData) as Promise<
      APIResult<IResponse<IAuthorResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IResponse<IAuthorResponse>>> {
    return this.api.get("/authors/{authorId}", { authorId: id }) as Promise<APIResult<IResponse<IAuthorResponse>>>;
  }

  getMany(filter: IPagingFilter & IAuthorFilter): Promise<APIResult<IResponse<Pagination<IAuthorResponse>>>> {
    return this.api.get("/authors", filter) as Promise<
      APIResult<IResponse<Pagination<IAuthorResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IResponse<void>>> {
    return this.api.delete("/authors/{authorId}", { authorId: id }) as Promise<
      APIResult<IResponse<void>>
    >;
  }
}
