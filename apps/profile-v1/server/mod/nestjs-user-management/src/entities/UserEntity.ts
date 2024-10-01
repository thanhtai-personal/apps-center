import { Role, User } from "@ttt-domain/user-management";
import { Entity, ManyToMany, Property, ThingEntity } from "@ttt-module/infra";
import { RoleEntity } from "./RoleEntity.js";

@Entity({ tableName: "users" })
export class UserEntity extends ThingEntity implements User {
  @Property({ unique: true })
  email: string;

  @Property({ nullable: true })
  password?: string;

  @Property()
  status: string;

  @Property({ nullable: true })
  userName?: string;

  @Property({ nullable: true })
  phoneNumber?: string;

  @Property({ nullable: true })
  firstName?: string;

  @Property({ nullable: true })
  lastName?: string;

  @ManyToMany({ entity: () => RoleEntity, mappedBy: "users", owner: true })
  roles: Role[];

  toJSON(): {
    id: number;
    email: string;
    status: string;
    userName: string | undefined;
    phoneNumber: string | undefined;
    password: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    roles: Role[];
  } {
    return {
      id: this.id,
      email: this.email,
      status: this.status,
      userName: this.userName,
      phoneNumber: this.phoneNumber,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      roles: this.roles,
    };
  }

  isInRole(role: string) {
    return this.roles?.some((item) => item.name === role);
  }
}
