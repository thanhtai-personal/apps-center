import { ApiProperty } from "@nestjs/swagger";
import { Permission as PermissionEntity } from "@ttt-domain/user-management";
import { AutoMap } from "@ttt-module/infra";

const { MapTarget, MapValue } = AutoMap(PermissionEntity);

@MapTarget()
export class Permission {
  @ApiProperty()
  @MapValue()
  id: number;

  @ApiProperty()
  @MapValue()
  name: string;

  @ApiProperty({ required: false })
  @MapValue("description", { nullable: true })
  description?: string;
}
