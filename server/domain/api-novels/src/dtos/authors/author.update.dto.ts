import { IAuthorUpdating } from '@core-ui/novals-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAuthorDto implements IAuthorUpdating {
  @IsNotEmpty()
  @IsNumber()
  id!: number;
  
  name?: string;
  description?: string;
  avatar?: string;
  userId?: number;
}