import { Column, Entity, OneToMany } from "@core-api/nest-typeorm-postgres";
import { IRole } from "@core-ui/jobs-listing-types";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity('roles')
export class RoleEntity extends BaseEntity implements IRole {
  @Column({ name: "name", type: 'varchar', nullable: false })
  name?: string;

  @Column({ name: "description", type: 'varchar', nullable: true })
  description?: string;
  
  @OneToMany(() => UserEntity, (user) => user.roleData, { cascade: false })
  users?: UserEntity[];
}