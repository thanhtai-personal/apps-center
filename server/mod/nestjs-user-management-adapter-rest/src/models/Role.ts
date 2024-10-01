import { ApiProperty } from "@nestjs/swagger";
import { Role as RoleEntity } from "@core-domain/user-management";
import { AutoMap } from "@core-module/infra";
import { Permission } from "./Permission.js";

const { MapTarget, MapValue } = AutoMap(RoleEntity);

@MapTarget()
export class Role {
  @ApiProperty({ required: true })
  @MapValue()
  id: number;

  @ApiProperty({ required: true })
  @MapValue()
  name: string;

  @ApiProperty({ required: false })
  @MapValue("description", { nullable: true })
  description?: string;

  @ApiProperty({
    required: false,
    type: [Permission],
    nullable: true,
  })
  @MapValue((role) => role.toJSON().permissions)
  permissions?: Permission[];
}
