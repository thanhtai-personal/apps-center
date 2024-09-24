import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IPagingFilter, IResponse, Pagination } from "@core-sdk/core";
import {
  CategoryRoutes,
} from "../types";
import { ICategoryCreation, ICategoryFilter, ICategoryResponse, ICategoryUpdating } from "@core-ui/jobs-listing-types";

export class CategoryService
  extends BaseService<CategoryRoutes>
  implements IAbstractService<ICategoryCreation, ICategoryUpdating, ICategoryResponse, IPagingFilter & ICategoryFilter> {
  constructor(api: FetchApi<CategoryRoutes>) {
    super(api);
  }
  create(createData: ICategoryCreation): Promise<APIResult<IResponse<ICategoryResponse>>> {
    return this.api.post("/categories", {}, createData) as Promise<
      APIResult<IResponse<ICategoryResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: ICategoryUpdating,
  ): Promise<APIResult<IResponse<ICategoryResponse>>> {
    return this.api.put("/categories/{categoryId}", { categoryId: id }, updateData) as Promise<
      APIResult<IResponse<ICategoryResponse>>
    >;
  }

  patchUpdate(
    categoryId: string | number,
    updateData: Partial<ICategoryUpdating>
  ): Promise<APIResult<IResponse<ICategoryResponse>>> {
    return this.api.patch("/categories/{categoryId}", { categoryId }, updateData) as Promise<
      APIResult<IResponse<ICategoryResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IResponse<ICategoryResponse>>> {
    return this.api.get("/categories/{categoryId}", { categoryId: id }) as Promise<APIResult<IResponse<ICategoryResponse>>>;
  }

  getMany(filter: IPagingFilter & ICategoryFilter): Promise<APIResult<IResponse<Pagination<ICategoryResponse>>>> {
    return this.api.get("/categories", filter) as Promise<
      APIResult<IResponse<Pagination<ICategoryResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IResponse<void>>> {
    return this.api.delete("/categories/{categoryId}", { categoryId: id }) as Promise<
      APIResult<IResponse<void>>
    >;
  }
}
