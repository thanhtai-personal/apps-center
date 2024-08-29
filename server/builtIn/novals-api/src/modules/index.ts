import { DbModule } from "@/database";
import { UsersModule } from "./user/users.module";
import { AuthModule } from "./auth/auth.module";

export const allModule = [
  DbModule,
  AuthModule,
  UsersModule,
]