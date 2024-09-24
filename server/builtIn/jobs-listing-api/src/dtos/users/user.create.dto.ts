import { IsNumber } from 'class-validator';
import { IUserCreation } from "@core-ui/jobs-listing-types"

export class CreateUserDto implements IUserCreation {
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