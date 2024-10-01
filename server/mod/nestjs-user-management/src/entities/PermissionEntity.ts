import { Permission, IPermissionJSON, Role } from "@core-domain/user-management";
import { Entity, ManyToMany, Property, ThingEntity } from "@core-module/infra";
import { RoleEntity } from "./RoleEntity.js";

@Entity({ tableName: "permissions" })
export class PermissionEntity extends ThingEntity implements Permission {
  @Property({ unique: true })
  name: string;

  @Property({ nullable: true })
  description?: string;

  @ManyToMany({ entity: () => RoleEntity, mappedBy: "permissions" })
  roles: Role[];

  toJSON(): IPermissionJSON {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }
}
