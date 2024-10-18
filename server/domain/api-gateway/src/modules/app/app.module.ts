import { EnvironmentConfig } from "@/config";
import { allModule } from '..';
import { AppExceptionsFilter, NEST_COMMON, NEST_CORE, NEST_MICRO_SERVICE } from "@core-api/nest-core";

const { Module } = NEST_COMMON
const { APP_FILTER } = NEST_CORE

@Module({
  imports: [
    NEST_MICRO_SERVICE.ClientsModule.register([
      {
        name: 'GATEWAY_SERVICE',
        transport: NEST_MICRO_SERVICE.Transport.REDIS,
        options: {
          host: EnvironmentConfig.REDIS_HOST,
          port: Number(EnvironmentConfig.REDIS_PORT),
        }
      },
    ]),
    ...(allModule || {})
  ],
  providers: [{
    provide: APP_FILTER,
    useClass: AppExceptionsFilter,
  }],
})
export class AppModule {
  constructor() { }
}
