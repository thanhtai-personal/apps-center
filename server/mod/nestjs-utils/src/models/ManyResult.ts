import { ApiProperty } from "@nestjs/swagger";
import { IManyResult } from "@ttt-module/infra";

export class ManyResult<T> implements IManyResult<T> {
  @ApiProperty({ type: [Object] })
  data: T[];

  @ApiProperty({ type: "integer" })
  total: number;

  constructor(data: T[], total: number) {
    this.data = data;
    this.total = total;
  }
}
