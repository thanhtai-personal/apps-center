import { JobsController } from '@/controllers/job/jobs.controller';
import { JobEntity } from '@/entities/job.entity';
import { ModuleRefInterceptor } from '@/exceptions';
import { JobsService } from '@/services/jobs/jobs.service';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobEntity])
  ],
  providers: [
    JobsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [JobsController],
  exports: [JobsService],
})
export class JobsModule { }
