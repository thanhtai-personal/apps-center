import { INovalUpdating } from '@core-ui/novals-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateNovalDto implements INovalUpdating {
  @IsNotEmpty()
  @IsNumber()
  id!: number;
  
  name?: string;
  shortDescription?: string;
  fullDescription?: string;
  referrence?: string;
  thumb?: string;
  star?: number;
  view?: number;
  categories?: string[];
  categoryIds?: number[];
  tags?: string[];
  author?: string;
  isFull?: boolean;
  chaptersNumber?: number;
  authorId?: number;
}