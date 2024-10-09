import { AppController } from '@/controllers/app/app.controller';
import { AppService } from '@/services/app/app.service';
import { allModule } from '..';
import { DataSource } from '@core-api/nest-typeorm-postgres';
import { AppExceptionsFilter, NEST_COMMON, NEST_CORE } from "@core-api/nest-core";

@NEST_COMMON.Module({
  imports: allModule,
  controllers: [AppController],
  providers: [AppService, {
    provide: NEST_CORE.APP_FILTER,
    useClass: AppExceptionsFilter,
  }],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
