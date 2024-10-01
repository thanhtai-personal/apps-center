import { User as UserEntity } from "@core-domain/user-management";
import { AutoMapper } from "@core-module/infra";
import { User } from "~/models";

export const UserMapper = new AutoMapper(UserEntity, User).ensure();
