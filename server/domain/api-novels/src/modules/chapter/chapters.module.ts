import { ChaptersController } from '@/controllers/chapter/chapters.controller';
import { ChapterEntity } from '@/entities/chapter.entity';
import { ModuleRefInterceptor } from '@/exceptions';
import { ChaptersService } from '@/services/chapters/chapters.service';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChapterEntity])
  ],
  providers: [
    ChaptersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [ChaptersController],
  exports: [ChaptersService],
})
export class ChaptersModule { }
