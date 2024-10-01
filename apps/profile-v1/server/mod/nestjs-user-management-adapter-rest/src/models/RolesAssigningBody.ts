import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class RolesAssigningBody {
  @ApiProperty({ type: "array", items: { type: "integer" } })
  @IsNotEmpty()
  @IsInt({ each: true })
  roles: number[];
}
