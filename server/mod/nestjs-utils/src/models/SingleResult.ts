import { ApiProperty } from "@nestjs/swagger";
import { ISingleResult } from "@ttt-module/infra";

export class SingleResult<T> implements ISingleResult<T> {
  @ApiProperty({ type: Object })
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}
