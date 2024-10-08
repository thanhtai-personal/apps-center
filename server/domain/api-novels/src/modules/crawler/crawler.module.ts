import { Module } from '@nestjs/common';
import { AuthorEntity, CategoryEntity, ChapterEntity, CommentEntity, NovalEntity, UserEntity } from '@/entities';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { CrawlerController } from "@/controllers/crawler/crawler.controller";
import { ScheduleModule } from "@nestjs/schedule";
import { TTVCrawlerService } from "@/services/ttvCrawler/ttvCrawler.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity, NovalEntity, ChapterEntity, AuthorEntity, CommentEntity, CategoryEntity
    ]),
    ScheduleModule.forRoot(),
  ],
  providers: [TTVCrawlerService],
  controllers: [CrawlerController],
  exports: [TTVCrawlerService],
})
export class CrawlerModule { }
