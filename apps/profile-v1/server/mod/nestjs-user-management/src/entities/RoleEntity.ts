import { Permission, Role, User } from "@ttt-domain/user-management";
import { Entity, ManyToMany, Property, ThingEntity } from "@ttt-module/infra";
import { UserEntity } from "./UserEntity.js";
import { PermissionEntity } from "./PermissionEntity.js";

@Entity({ tableName: "roles" })
export class RoleEntity extends ThingEntity implements Role {
  @Property({ unique: true })
  name: string;

  @Property({ nullable: true })
  description?: string;

  @ManyToMany({
    entity: () => PermissionEntity,
    mappedBy: "roles",
    owner: true,
  })
  permissions: Permission[];

  @ManyToMany({ entity: () => UserEntity, mappedBy: "roles" })
  users: User[];

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      permissions: this.permissions,
      users: this.users,
    };
  }
}
