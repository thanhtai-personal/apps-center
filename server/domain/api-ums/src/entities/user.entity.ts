import { Entity, JoinColumn, ManyToOne } from "@core-api/nest-typeorm-postgres";
import { IUser } from "@core-ui/jobs-listing-types";
import { RoleEntity } from "./role.entity";
import { UserEntity as CoreUserEntity } from "@core-modules/users"

@Entity('users')
export class UserEntity extends CoreUserEntity implements IUser {
  @ManyToOne(() => RoleEntity, (role) => role.users, { cascade: true })
  @JoinColumn({ name: 'roleId' })
  roleData?: RoleEntity; 
}