import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

export class EmailUpdatingBody {
  @ApiProperty({ example: "test@example.com" })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
