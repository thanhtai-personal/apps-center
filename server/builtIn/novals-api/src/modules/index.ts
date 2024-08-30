import { DbModule } from "@/database";
import { UsersModule } from "./user/users.module";
import { AuthModule } from "./auth/auth.module";
import { RolesModule } from "./role/roles.module";
import { NovalsModule } from "./noval/novals.module";
import { AuthorsModule } from "./author/authors.module";
import { CommentsModule } from "./comment/comments.module";
import { ChaptersModule } from "./chapter/chapters.module";
import { CategoriesModule } from "./category/categories.module";
import { AppScheduleModule } from "./schedule/schedule.module";

export const allModule = [
  DbModule,
  AuthModule,
  UsersModule,
  RolesModule,
  NovalsModule,
  AuthorsModule,
  CommentsModule,
  ChaptersModule,
  CategoriesModule,
  AppScheduleModule
]