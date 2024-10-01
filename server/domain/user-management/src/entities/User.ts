import { Thing } from "@ttt-domain/shared";
import { Permission } from "./Permission.js";
import { Role } from "./Role.js";

export interface IUserData {
  id: number;
  email: string;
  status: string;
  userName?: string;
  phoneNumber?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  roles: Role[];
  permissions?: Permission[];
}

export interface IUserJSON {
  id: number;
  email: string;
  status: string;
  userName?: string;
  phoneNumber?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  roles: Role[];
  permissions?: Permission[];
}

export class User extends Thing {
  declare email: string;
  declare userName?: string;
  declare phoneNumber?: string;
  declare password?: string;
  declare firstName?: string;
  declare lastName?: string;
  declare status: string;
  declare roles: Role[];

  constructor(userData: IUserData) {
    super();
    this.id = userData.id;
    this.email = userData.email;
    this.status = userData.status;
    this.userName = userData.userName;
    this.phoneNumber = userData.phoneNumber;
    this.password = userData.password;
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.roles = userData.roles;
  }

  toJSON(): IUserJSON {
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
