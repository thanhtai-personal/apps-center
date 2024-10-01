import { Thing } from "@ttt-domain/shared";
import { Permission } from "./Permission.js";
import { User } from "./User.js";

export interface IRoleData {
  id: number;
  name: string;
  description?: string;
  permissions?: Permission[];
  users?: User[];
}

export interface IRoleJSON {
  id: number;
  name: string;
  description?: string;
  permissions?: Permission[];
  users?: User[];
}

export class Role extends Thing {
  declare name: string;
  declare description?: string;
  declare permissions?: Permission[];
  declare users?: User[];

  constructor(data: IRoleData) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.permissions = data.permissions;
    this.users = data.users;
  }

  toJSON(): IRoleJSON {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      permissions: this.permissions,
      users: this.users,
    };
  }
}
