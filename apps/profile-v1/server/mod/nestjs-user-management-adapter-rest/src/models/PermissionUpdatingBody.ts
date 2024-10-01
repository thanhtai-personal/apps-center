import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class PermissionUpdatingBody {
  @ApiProperty({ example: "SAMPLE_NAME" })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;
}
