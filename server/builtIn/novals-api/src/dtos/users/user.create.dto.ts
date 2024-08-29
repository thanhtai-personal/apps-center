import { IsNumber } from 'class-validator';
import { IUserCreation } from "@core-ui/novals-types"

export class CreateUserDto implements IUserCreation {
  @IsNumber()
  points?: number;

  username?: string;
}