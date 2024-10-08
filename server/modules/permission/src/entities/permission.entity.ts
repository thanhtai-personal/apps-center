import { Column, Entity } from "@core-api/nest-typeorm-postgres";
import { IPermission } from "../interfaces";
import { Thing } from "@core-modules/core"

@Entity('permissions')
export class PermissionEntity extends Thing implements IPermission {
  @Column({ name: "name", type: 'varchar', nullable: true })
  name?: string;

  @Column({ name: "description", type: 'varchar', nullable: true })
  description?: string;
}