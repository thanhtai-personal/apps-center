import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class RoleCreationBody {
  @ApiProperty({ example: "SAMPLE_NAME" })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: false,
    type: "integer",
    isArray: true,
    default: undefined,
  })
  @IsOptional()
  @IsInt({ each: true })
  permissions?: number[];
}
