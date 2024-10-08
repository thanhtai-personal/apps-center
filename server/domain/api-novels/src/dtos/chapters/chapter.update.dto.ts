import { IChapterUpdating } from '@core-ui/novals-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateChapterDto implements IChapterUpdating {
  @IsNotEmpty()
  @IsNumber()
  id!: number;
  
  name?: string;
  shortDescription?: string;
  fullDescription?: string;
  shortContent?: string;
  content?: string;
  htmlContent?: string;
  referrence?: string;
  thumb?: string;
  view?: number;
  chapterIndex?: number;
  novalId?: number;
}