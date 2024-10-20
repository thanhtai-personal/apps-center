import { IChapter } from "./IChapter";

export interface IChapterCreation extends Omit<
  IChapter,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> { }
  