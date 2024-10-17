import { allModule } from '..';
import { AppExceptionsFilter, NEST_COMMON, NEST_CORE } from "@core-api/nest-core";

const { Module } = NEST_COMMON
const { APP_FILTER } = NEST_CORE

@Module({
  imports: allModule,
  providers: [{
    provide: APP_FILTER,
    useClass: AppExceptionsFilter,
  }],
})
export class AppModule {
  constructor() { }
}
