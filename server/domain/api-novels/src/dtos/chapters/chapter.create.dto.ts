import { IChapterCreation } from "@core-ui/novals-types"

export class CreateChapterDto implements IChapterCreation {
  name?: string;
  shortDescription?: string;
  fullDescription?: string;
  chapterIndex?: number;
  shortContent?: string;
  content?: string;
  htmlContent?: string;
  referrence?: string;
  thumb?: string;
  view?: number;
  novalId?: number;
}