import { DbModule } from "@/database";
import { UsersModule } from "./user/users.module";
import { AuthModule } from "./auth/auth.module";
import { RolesModule } from "./role/roles.module";
import { CategoriesModule } from "./category/categories.module";
import { CrawlerModule } from "./crawler/crawler.module";
import { JobsModule } from "./job/jobs.module";

export const allModule = [
  DbModule,
  AuthModule,
  UsersModule,
  RolesModule,
  CategoriesModule,
  CrawlerModule,
  JobsModule
]