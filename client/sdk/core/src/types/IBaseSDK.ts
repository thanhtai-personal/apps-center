import { TokenMethod } from "@core-ui/api-client";
import { Pagination } from "./Pagination";

export interface IBaseControl<ICreationRequest, IUpdatingRequest, IDataResponse, IFilterRequest> {
  create: (createData: ICreationRequest) => Promise<IDataResponse | undefined>;
  update: (
    id: string | number,
    updateData: IUpdatingRequest,
  ) => Promise<IDataResponse | undefined>;
  patchUpdate: (
    id: string | number,
    updateData: Partial<IUpdatingRequest>,
  ) => Promise<IDataResponse | undefined>;
  getOne: (id: string | number) => Promise<IDataResponse | undefined>;
  getMany: (filter: IFilterRequest) => Promise<Pagination<IDataResponse> | undefined>;
  delete: (
    id: string | number,
  ) => Promise<void | undefined>;
}

export interface IBaseSDK {
  setAccessToken: (token: string, tokenMethod: TokenMethod) => void;
}