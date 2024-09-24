import { Module } from '@nestjs/common';
import { CategoryEntity, JobEntity, UserEntity } from '@/entities';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { CrawlerController } from "@/controllers/crawler/crawler.controller";
import { ScheduleModule } from "@nestjs/schedule";
import { AnyDayCrawlerService } from "@/services/anyDayCrawler/anyDayCrawler.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity, CategoryEntity, JobEntity
    ]),
    ScheduleModule.forRoot(),
  ],
  providers: [AnyDayCrawlerService],
  controllers: [CrawlerController],
  exports: [AnyDayCrawlerService],
})
export class CrawlerModule { }
