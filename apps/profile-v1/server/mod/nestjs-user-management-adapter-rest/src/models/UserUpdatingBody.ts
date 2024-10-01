import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsStrongPassword,
} from "class-validator";

export class UserUpdatingBody {
  @ApiProperty({ example: "test@example.com" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "John" })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: "Doe" })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: "123@Aa" })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @ApiProperty({ required: false, example: "+840987654321" })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;
}
