import { ApiProperty } from "@nestjs/swagger";
import { ManyResult } from "./ManyResult.js";
import { IPaginationResult } from "@ttt-module/infra";

export class PaginationResult<T>
  extends ManyResult<T>
  implements IPaginationResult<T>
{
  @ApiProperty({ default: 0, type: "integer" })
  offset: number;

  @ApiProperty({ default: 10, type: "integer" })
  limit: number;

  constructor(data: T[], total: number, offset: number, limit: number) {
    super(data, total);
    this.offset = offset;
    this.limit = limit;
  }
}
