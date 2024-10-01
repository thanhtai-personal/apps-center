import { ApiProperty } from "@nestjs/swagger";
import { User as UserEntity } from "@ttt-domain/user-management";
import { AutoMap } from "@ttt-module/infra";
import { Role } from "./Role.js";

const { MapTarget, MapValue } = AutoMap(UserEntity);

@MapTarget()
export class User {
  @ApiProperty()
  @MapValue()
  id: number;

  @ApiProperty()
  @MapValue()
  email: string;

  @ApiProperty({ example: "John", required: false })
  @MapValue()
  firstName?: string;

  @ApiProperty({ example: "Doe", required: false })
  @MapValue()
  lastName?: string;

  @ApiProperty({
    enum: ["invited", "registered", "activated"],
    default: "registered",
  })
  @MapValue()
  status: string;

  @ApiProperty({
    type: [Role],
  })
  @MapValue((user) => user.toJSON().roles)
  roles: Role[];
}
