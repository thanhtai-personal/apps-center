import { AuthorEntity, CategoryEntity, ChapterEntity, CommentEntity, NovalEntity, UserEntity } from '@/entities';
import { InjectRepository, LessThan, MoreThan, Repository } from '@core-api/nest-typeorm-postgres';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(NovalEntity)
    private novalRepo: Repository<NovalEntity>,
    @InjectRepository(ChapterEntity)
    private chapterRepo: Repository<ChapterEntity>,
    @InjectRepository(AuthorEntity)
    private authorRepo: Repository<AuthorEntity>,
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) { }

  // @Cron("0 */2 * * * *") //2 mins
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  updateEveryNight() {
    this.crawlData();
  }

  async crawlData() {

  }

}