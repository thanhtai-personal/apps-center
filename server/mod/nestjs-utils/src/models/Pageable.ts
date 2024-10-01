import { ApiProperty } from "@nestjs/swagger";
import { IPageable, SortField } from "@ttt-module/infra";
import { Transform, Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class Pageable implements IPageable {
  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  offset: number;

  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number;

  @ApiProperty({ required: false, example: ["foo:asc", "bar:desc"] })
  @Transform(({ value }: { value: string | string[] }) =>
    Array.isArray(value) ? value : Array(value),
  )
  @IsOptional()
  sortBy?: SortField[];
}
