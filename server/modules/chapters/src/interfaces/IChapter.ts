import { IThingEntity } from "@core-modules/core"

export interface IChapter extends IThingEntity {
  name?: string;
  description?: string;
}