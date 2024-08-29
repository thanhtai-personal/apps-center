import { Column, Entity } from "@core-api/nest-typeorm-postgres";
import { IUser } from "@core-ui/novals-types";
import { BaseEntity } from "./base.entity";

// UserEntity
@Entity('users')
export class UserEntity extends BaseEntity implements IUser {
  @Column({ name: "points", type: 'numeric', nullable: false, default: 0 })
  points?: number;

  @Column({ name: "username", type: 'varchar', nullable: false, default: 0 })
  username?: string;
}