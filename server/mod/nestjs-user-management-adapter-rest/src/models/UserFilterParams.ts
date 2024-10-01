import { ApiProperty } from "@nestjs/swagger";
import { Pageable } from "@ttt-module/nestjs-utils";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsPhoneNumber } from "class-validator";

export class UserFilterParams extends Pageable {
  @ApiProperty({ required: false, type: "integer" })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  lastName?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    enum: ["invited", "registered", "activated"],
    default: "registered",
  })
  @IsIn(["invited", "registered", "activated"])
  status?: string;

  @ApiProperty({ required: false })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;
}
