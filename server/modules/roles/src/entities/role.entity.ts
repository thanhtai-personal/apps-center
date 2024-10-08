import { Column, Entity } from "@core-api/nest-typeorm-postgres";
import { IRole } from "../interfaces";
import { Thing } from "@core-modules/core"

@Entity('roles')
export class RoleEntity extends Thing implements IRole {
  @Column({ name: "name", type: 'varchar', nullable: true })
  name?: string;

  @Column({ name: "description", type: 'varchar', nullable: true })
  description?: string;
}