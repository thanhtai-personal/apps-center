import { Entity, OneToMany } from "@core-api/nest-typeorm-postgres";
import { IRole } from "@core-ui/jobs-listing-types";
import { RoleEntity as CoreRoleEntity } from "@core-modules/roles"
import { UserEntity } from "./user.entity";

@Entity('roles')
export class RoleEntity extends CoreRoleEntity implements IRole {
  @OneToMany(() => UserEntity, (user) => user.roleData, { cascade: false })
  users?: UserEntity[];
}