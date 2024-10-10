import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IPagingFilter, IResponse, Pagination } from "@core-sdk/core";
import {
  RoleRoutes,
} from "../types";
import { IRoleCreation, IRoleFilter, IRoleResponse, IRoleUpdating } from "@core-ui/novels-types";

export class RoleService
  extends BaseService<RoleRoutes>
  implements IAbstractService<IRoleCreation, IRoleUpdating, IRoleResponse, IPagingFilter & IRoleFilter> {
  constructor(api: FetchApi<RoleRoutes>) {
    super(api);
  }
  create(createData: IRoleCreation): Promise<APIResult<IResponse<IRoleResponse>>> {
    return this.api.post("/roles", {}, createData) as Promise<
      APIResult<IResponse<IRoleResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: IRoleUpdating,
  ): Promise<APIResult<IResponse<IRoleResponse>>> {
    return this.api.put("/roles/{roleId}", { roleId: id }, updateData) as Promise<
      APIResult<IResponse<IRoleResponse>>
    >;
  }

  patchUpdate(
    roleId: string | number,
    updateData: Partial<IRoleUpdating>
  ): Promise<APIResult<IResponse<IRoleResponse>>> {
    return this.api.patch("/roles/{roleId}", { roleId }, updateData) as Promise<
      APIResult<IResponse<IRoleResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IResponse<IRoleResponse>>> {
    return this.api.get("/roles/{roleId}", { roleId: id }) as Promise<APIResult<IResponse<IRoleResponse>>>;
  }

  getMany(filter: IPagingFilter & IRoleFilter): Promise<APIResult<IResponse<Pagination<IRoleResponse>>>> {
    return this.api.get("/roles", filter) as Promise<
      APIResult<IResponse<Pagination<IRoleResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IResponse<void>>> {
    return this.api.delete("/roles/{roleId}", { roleId: id }) as Promise<
      APIResult<IResponse<void>>
    >;
  }
}
