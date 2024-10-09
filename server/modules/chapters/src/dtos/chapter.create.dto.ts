import { IChapterCreation } from "../interfaces";

export class CreateChapterDto implements IChapterCreation {
  name?: string;
  description?: string;
}