import { IChapterUpdating } from "../interfaces";

export class UpdateChapterDto implements IChapterUpdating {
  id?: number;
  name?: string;
  description?: string;
}