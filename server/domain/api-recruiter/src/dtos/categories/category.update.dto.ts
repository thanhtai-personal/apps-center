import { ICategoryUpdating } from '@core-ui/jobs-listing-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCategoryDto implements ICategoryUpdating {
  @IsNotEmpty()
  @IsNumber()
  id!: number;
  
  name?: string;
  description?: string;
  image?: string;
  icon?: string;
  parentCategoryId?: number;
}