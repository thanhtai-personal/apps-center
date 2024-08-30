import { AuthorEntity, CategoryEntity, ChapterEntity, CommentEntity, NovalEntity, UserEntity } from '@/entities';
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { JSDOM  } from "jsdom"

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
  @Cron(CronExpression.EVERY_10_SECONDS)
  updateEveryNight() {
    this.crawlData();
  }

  async crawlData() {
    try {
      await this.crawlTangThuVien()
    } catch (error) {
      console.error('Error crawl data:', error);
    }
  }

  async crawlTangThuVien() {
    const origin = 'https://truyen.tangthuvien.vn';
    const htmlString: string = (await axios.get(origin))?.data;
    const dom = new JSDOM(htmlString);
    const document = dom.window.document;

    const classifies = document.querySelectorAll('#classify-list a span.info');

    if (classifies) {
      console.log("classifies", classifies)
    }
  }

}