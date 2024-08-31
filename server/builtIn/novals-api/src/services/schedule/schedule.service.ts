import { AuthorEntity, CategoryEntity, ChapterEntity, CommentEntity, NovalEntity, UserEntity } from '@/entities';
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import * as cheerio from 'cheerio';

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
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
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
    const novalsPage = 'https://truyen.tangthuvien.vn/tong-hop?ctg=1'
    try {
      // Fetch the HTML content of the page
      const htmlString: string = (await axios.get(origin)).data;
      const $ = cheerio.load(htmlString);

      // Select the anchor tags inside the classify list
      const classifies = $('div.classify-list a');
      const categories: { name: string; url: string; count?: number; icon: string; }[] = [];
      const savedCategories: any = []

      // Iterate over each anchor element to extract data
      for (const element of classifies) {
        const name = $(element).find('i').text().trim();
        const url = $(element).attr('href') || '';
        const icon = $(element).find('.iconfont').text();
        const countText = $(element).find('b').text().trim();
        const count = countText ? parseInt(countText, 10) : 0;

        // Push the extracted data into the categories array
        categories.push({ name, url, count, icon });
        console.log("===HANDLE CATEGORY", name);
        try {
          const findExisting = await this.categoryRepo.findOne({ where: { name: name } })
          if (!findExisting) {
            const savedCategory = await this.categoryRepo.create({
              name,
              icon,
              description: url,
            })
            await this.categoryRepo.save(savedCategory)
            savedCategories.push(savedCategory)
          }
        } catch (error) {
          console.log("===SAVE CATEGORY FAILED", name);
        }
      }

      const novalsgoryHtmlString: string = (await axios.get(novalsPage)).data;
      const $novals = cheerio.load(novalsgoryHtmlString);
      const pageNumberElements: any = $novals("ul.pagination li a");
      const totalPages = parseInt(pageNumberElements[pageNumberElements.length - 2]?.children?.[0]?.data, 10);
      const pageUrls = [];
      for (let page = 1; page <= totalPages; page++) {
        pageUrls.push(`${novalsPage}&page=${page}`);
      }

      for (const pageUrl of pageUrls) {
        console.log("===HANDLE PAGINATION", pageUrl);
        const pageHtmlString: string = (await axios.get(pageUrl)).data;
        const $page = cheerio.load(pageHtmlString);
        const novalElements: any = $page("div.book-img-text ul li");
        for (const element of novalElements) {
          const name = $page(element).find('h4 a').text().trim();
          const author = $page(element).find('p.author a.name').text().trim();
          const category = ($page(element).find('p.author a')?.[1] as any)?.children?.[0]?.data;
          const intro = $page(element).find('p.intro').text().trim();
          const updatedTime = $page(element).find('p.update span').text().trim();
          const thumb = ($page(element).find('img.lazy')?.[0] as any)?.attribs?.src;
          const url = ($page(element).find('h4 a')?.[0] as any)?.attribs?.href;
          console.log("===HANDLE Noval", {
            name, author, category, intro, updatedTime, thumb, url
          });
          
          let existingAuthor = await this.authorRepo.findOne({ where: { name: author } });
          if (!existingAuthor) {
            existingAuthor = await this.authorRepo.create({
              name: author,
            })
            existingAuthor = await this.authorRepo.save(existingAuthor);
          }

          let existingCategory = await this.authorRepo.findOne({ where: { name: category } });
          if (!existingCategory) {
            existingCategory = this.authorRepo.create({
              name: category,
            })
            existingCategory = await this.authorRepo.save(existingAuthor);
          }

          const existingNoval = await this.novalRepo.findOne({ where: { name } });
          if (!existingNoval) {
            try {
              const newNoval = this.novalRepo.create({
                name,
                shortDescription: intro,
                thumb,
                referrence: url,
                authorData: existingAuthor,
                categoriesData: [existingCategory],
                // updatedTime: new Date(updatedTime),
              });
              await this.novalRepo.save(newNoval);
              console.log("Saved Noval", name)
            } catch (error) {
              console.log("FAILED", error)
            }
          } else {
            console.log("IGNORE - Exist noval name")
          }
        }
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

}