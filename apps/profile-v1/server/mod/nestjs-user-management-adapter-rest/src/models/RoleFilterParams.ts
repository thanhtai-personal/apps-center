import { ApiProperty } from "@nestjs/swagger";
import { Pageable } from "@ttt-module/nestjs-utils";
import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class RoleFilterParams extends Pageable {
  @ApiProperty({ required: false, type: "integer" })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  name?: string;
}
