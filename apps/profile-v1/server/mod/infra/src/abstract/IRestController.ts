import { IManyResult } from "./IManyResult.js";
import { IPaginationResult } from "./IPaginationResult.js";
import { ISingleResult } from "./ISingleResult.js";

export interface IRestController<Resource> {
  getOne: (...args: any[]) => Promise<ISingleResult<Resource>>;
  getMany: (...args: any[]) => Promise<IManyResult<Resource>>;
  getPaginated: (...args: any[]) => Promise<IPaginationResult<Resource>>;
  create: (...args: any[]) => Promise<ISingleResult<Resource>>;
  update: (...args: any[]) => Promise<ISingleResult<Resource>>;
  delete: (...args: any[]) => Promise<void>;
}

export type ResourceCRUD<
  Resource,
  Action extends "Read" | "ReadAll" | "Create" | "Update" | "Delete" = "Read",
> = Pick<
  IRestController<Resource>,
  Action extends "Read"
    ? "getOne" | "getPaginated"
    : Action extends "ReadAll"
      ? "getMany"
      : Action extends "Create"
        ? "create"
        : Action extends "Update"
          ? "update"
          : Action extends "Delete"
            ? "delete"
            : never
>;

export type ResourceAttrUpdate<
  Resource,
  Attribute extends string | number | symbol,
> = {
  [K in `update${Capitalize<string & Attribute>}`]: (
    ...args: any[]
  ) => Promise<ISingleResult<Resource>>;
};
