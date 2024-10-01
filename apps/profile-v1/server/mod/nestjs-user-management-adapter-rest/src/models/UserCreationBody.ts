import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from "class-validator";

export class UserCreationBody {
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

  @ApiProperty({ enum: ["invited", "registered"], default: "registered" })
  @IsNotEmpty()
  @IsIn(["invited", "registered"])
  status: string;

  @ApiProperty({
    example: [],
    type: "array",
    items: { type: "integer" },
    required: false,
  })
  @IsOptional()
  @IsInt({ each: true })
  roles?: number[];
}
