import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class PermissionsAssigningBody {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt({ each: true })
  permissions: number[];
}
