import { IUserUpdating } from '@core-ui/novals-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserDto implements IUserUpdating {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @IsNumber()
  points?: number;

  username?: string;
}