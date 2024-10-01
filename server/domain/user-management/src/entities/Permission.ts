import { Thing } from "@ttt-domain/shared";

export interface IPermissionData {
  name: string;
  id: number;
  description?: string;
}

export interface IPermissionJSON {
  id: number;
  name: string;
  description?: string;
}

export class Permission extends Thing {
  declare name: string;
  declare description?: string;

  constructor(data: IPermissionData) {
    super();
    this.name = data.name;
    this.id = data.id;
    this.description = data.description;
  }

  toJSON(): IPermissionJSON {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }
}
