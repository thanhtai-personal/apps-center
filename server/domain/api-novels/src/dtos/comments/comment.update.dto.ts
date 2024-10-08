import { ICommentUpdating } from '@core-ui/novals-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCommentDto implements ICommentUpdating {
  @IsNotEmpty()
  @IsNumber()
  id!: number;
  
  username?: string;
  email?: string;
  avatar?: string;
  userId?: number;
  novalId?: number;
  chapterId?: number;
  content?: string;
  htmlContent?: string;
}