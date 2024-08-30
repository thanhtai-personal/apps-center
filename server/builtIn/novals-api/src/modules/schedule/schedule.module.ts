import { Module } from '@nestjs/common';
import { ScheduleService } from '@/services/schedule/schedule.service';
import { AuthorEntity, CategoryEntity, ChapterEntity, CommentEntity, NovalEntity, UserEntity } from '@/entities';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { ScheduleController } from "@/controllers/schedule/schedule.controller";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity, NovalEntity, ChapterEntity, AuthorEntity, CommentEntity, CategoryEntity
    ]),
    ScheduleModule.forRoot(),
  ],
  providers: [ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class AppScheduleModule { }
