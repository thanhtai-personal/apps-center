import { NovalsController } from '@/controllers/noval/novals.controller';
import { NovalEntity } from '@/entities/noval.entity';
import { ModuleRefInterceptor } from '@/exceptions';
import { NovalsService } from '@/services/novals/novals.service';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([NovalEntity])
  ],
  providers: [
    NovalsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [NovalsController],
  exports: [NovalsService],
})
export class NovalsModule { }
