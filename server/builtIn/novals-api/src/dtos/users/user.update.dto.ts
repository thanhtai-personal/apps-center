import { IUserUpdating } from '@core-ui/novals-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserDto implements IUserUpdating {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  username?: string;
  password?: string;
  email?: string;
  avatar?: string;

  @IsNumber()
  points?: number;
  
  @IsNumber()
  token?: number;

  @IsNumber()
  level?: number;

  role?: string;

  @IsNumber()
  roleId?: number;
}