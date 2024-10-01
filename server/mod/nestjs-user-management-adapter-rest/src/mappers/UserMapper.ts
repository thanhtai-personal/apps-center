import { User as UserEntity } from "@ttt-domain/user-management";
import { AutoMapper } from "@ttt-module/infra";
import { User } from "~/models";

export const UserMapper = new AutoMapper(UserEntity, User).ensure();
