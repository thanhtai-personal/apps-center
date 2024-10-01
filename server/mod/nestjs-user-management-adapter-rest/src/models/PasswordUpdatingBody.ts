import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsStrongPassword } from "class-validator";

export class PasswordUpdatingBody {
  @ApiProperty()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({ example: "123@Aa" })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  newPassword: string;
}
