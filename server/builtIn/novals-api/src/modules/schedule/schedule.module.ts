import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from '@/services/schedule/schedule.service';
import { AuthorEntity, CategoryEntity, ChapterEntity, CommentEntity, NovalEntity, UserEntity } from '@/entities';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity, AuthorEntity, NovalEntity, ChapterEntity, CommentEntity, CategoryEntity
    ]),
    ScheduleModule.forRoot(),
  ],
  providers: [ScheduleService],
})
export class AppScheduleModule { }
