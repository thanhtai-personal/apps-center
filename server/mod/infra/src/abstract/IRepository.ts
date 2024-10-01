import { IOrmConfig } from "./IOrmConfig.js";

type DeepPartial<T> =
  | T
  | (T extends Array<infer U>
      ? DeepPartial<U>[]
      : T extends Map<infer K, infer V>
        ? Map<DeepPartial<K>, DeepPartial<V>>
        : T extends Set<infer M>
          ? Set<DeepPartial<M>>
          : T extends object
            ? {
                [K in keyof T]?: DeepPartial<T[K]>;
              }
            : T);
type PrimitiveType = number | string | Date | boolean;

export type EntityData<T> = {
  [K in keyof T]?: T[K] extends PrimitiveType ? T[K] : EntityData<T[K]>;
};
export type RequiredEntityData<T> = Omit<EntityData<T>, "id">;

type ValueOrArray<T> = T extends PrimitiveType ? T | T[] : T;

export type FilterQuery<T> = DeepPartial<{
  [K in keyof T]: ValueOrArray<T[K]>;
}>;

export type SortDirection = "asc" | "desc";

export interface IFindOneOptions {
  populate?: string[];
}
export type SortField = `${string}:${SortDirection}`;
export type PopulatePaths = string[];
export interface IFindOptions {
  populate?: PopulatePaths;
  limit?: number;
  offset?: number;
  sortBy?: SortField[];
}
export type Loaded<T> = T & {
  toJSON(): Record<string, unknown> | null;
};
export interface IRepository<T = any, C = IOrmConfig> {
  create(data: RequiredEntityData<T>): T;
  findOne(
    filter: FilterQuery<T>,
    options?: IFindOneOptions,
  ): Promise<Loaded<T> | null>;
  find(filter: FilterQuery<T>, options?: IFindOptions): Promise<Loaded<T>[]>;
  findAndCount(
    filter: FilterQuery<T>,
    options?: IFindOptions,
  ): Promise<[Loaded<T>[], number]>;
  findAll(options: IFindOptions): Promise<Loaded<T>[]>;
  update(entity: T, data: EntityData<T>): T;
  remove(entity: T): void;
  save(...entities: T[]): Promise<void>;
  init(ormConfig: C): Promise<void>;
}
