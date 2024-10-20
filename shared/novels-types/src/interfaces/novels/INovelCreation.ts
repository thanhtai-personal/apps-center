import { INovel } from "./INovel";

export interface INovelCreation extends Omit<
  INovel,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> { }
  