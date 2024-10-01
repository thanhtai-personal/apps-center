import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class RoleUpdatingBody {
  @ApiProperty({ example: "SAMPLE_NAME" })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: false,
    type: "array",
    items: { type: "integer" },
    nullable: true,
  })
  @IsOptional()
  @IsInt({ each: true })
  permissions?: number[];
}
