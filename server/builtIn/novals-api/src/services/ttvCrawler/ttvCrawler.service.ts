import { AuthorEntity, CategoryEntity, ChapterEntity, CommentEntity, NovalEntity, UserEntity } from '@/entities';
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { Injectable } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import * as cheerio from 'cheerio';

const waitMs = (msDuration: number) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(null);
    }, msDuration);
  });
};

@Injectable()
export class TTVCrawlerService {
  private isCrawling: boolean;

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
  ) {
    this.isCrawling = false;
  }

  // @Cron("0 */2 * * * *") //2 mins
  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  // updateEveryNight() {
  //   this.crawlData();
  // }

  async crawlData() {
    try {
      await this.crawlTTV(true)
    } catch (error) {
      console.error('Error crawl data:', error);
    }
  }

  async crawlTTV(isUpdateOnly: boolean = false) {
    if (this.isCrawling) return;
    this.isCrawling = true;
    try {
      if (isUpdateOnly) {
        console.log("========Crawl update only=====");
      }
      if (!isUpdateOnly) await this.ttvClassifies();

      let listNovals = await this.novalRepo.find({ relations: ['authorData', 'categoryData'] });
      if (!isUpdateOnly) {
        listNovals = (await this.crawlTTVNovals()).listNovals
      }

      console.log("====START CRAWL NOVALS DETAIL");
      for (const noval of listNovals) {
        if (!noval || !noval.referrence) continue;
        if (noval.isFull) {
          console.log("Noval is full, skip crawl chapters: ", noval.name);
          continue;
        }
        console.log("Current noval is: ", noval.name);
        const pageHtmlString: string = (await axios.get(noval.referrence!)).data;
        console.log("URL crawling", noval.referrence);
        const $noval = cheerio.load(pageHtmlString);
        const novalId = $noval('meta[name="book_detail"]')?.attr('content')?.trim();
        console.log("novalId", novalId)
        if (!novalId) {
          console.log("Noval id not found")
          continue;
        }
        noval.originalNovalId = novalId;
        await this.crawlTTVNovalData($noval, noval)
      }

      console.log("SUCCESS - FINISHED CRAWLS DATA")
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    } finally {
      this.isCrawling = false;
    }
  }

  async ttvClassifies() {
    const origin = 'https://truyen.tangthuvien.vn';
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
        const findExisting = await this.categoryRepo.findOne({ where: { name: name }, relations: ['categories'] })
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

    return {
      savedCategories,
      categories
    }
  }

  async crawlTTVNovals(): Promise<any> {
    const novalsPage = 'https://truyen.tangthuvien.vn/tong-hop?ctg=1'
    console.log("URL crawling", novalsPage);
    try {
      const novalsHtmlString: string = (await axios.get(novalsPage)).data;
      const $novals = cheerio.load(novalsHtmlString);
      const pageNumberElements: any = $novals("ul.pagination li a");
      const totalPages = parseInt(pageNumberElements[pageNumberElements.length - 2]?.children?.[0]?.data, 10);
      const pageUrls = [];
      const listNovals = [];
      for (let page = 1; page <= totalPages; page++) {
        pageUrls.push(`${novalsPage}&page=${page}`);
      }

      for (const pageUrl of pageUrls) {
        console.log("URL crawling", pageUrl);
        const pageHtmlString: string = (await axios.get(pageUrl)).data;
        const $page = cheerio.load(pageHtmlString);
        const novalElements: any = $page("div.book-img-text ul li");
        for (const element of novalElements) {
          const name = $page(element).find('h4 a').text().trim();
          const author = $page(element).find('p.author a.name').text().trim();
          const category = ($page(element).find('p.author a')?.[1] as any)?.children?.[0]?.data;
          const intro = $page(element).find('p.intro').text().trim();
          // const updatedTime = $page(element).find('p.update span').text().trim();
          const thumb = ($page(element).find('img.lazy')?.[0] as any)?.attribs?.src;
          const url = ($page(element).find('h4 a')?.[0] as any)?.attribs?.href;
          console.log("===HANDLE Noval", name);

          let existingAuthor = await this.authorRepo.findOne({ where: { name: author } });
          if (!existingAuthor) {
            existingAuthor = await this.authorRepo.create({
              name: author,
            })
            existingAuthor = await this.authorRepo.save(existingAuthor);
          }

          let existingCategory = await this.categoryRepo.findOne({ where: { name: category }, relations: ['categories'] });
          if (!existingCategory) {
            existingCategory = this.categoryRepo.create({
              name: category,
            })
            existingCategory = await this.categoryRepo.save(existingCategory);
          }

          let existingNoval = await this.novalRepo.findOne({ where: { name }, relations: ['authorData', 'categoryData', 'chaptersData'] });
          if (!existingNoval) {
            try {
              existingNoval = await this.novalRepo.create({
                name,
                shortDescription: intro,
                thumb,
                referrence: url,
                authorData: existingAuthor,
                categoryData: existingCategory,
              });
              existingNoval = await this.novalRepo.save(existingNoval);
              console.log("Saved Noval", name)
            } catch (error: any) {
              console.log("FAILED", error.message)
            }
          } else {
            console.log("IGNORE - Exist noval name")
          }
          listNovals.push(existingNoval);
        }
      }
      console.log("SUCCESS - FINISHED CRAWLS NOVALS DATA");
      return {
        listNovals
      }
    } catch (error: any) {
      console.log("====Get list novals error =====", error.message);
    }
  }

  async crawlTTVNovalData($noval: cheerio.Root, noval: NovalEntity) {
    try {
      const fullIntro = $noval('.book-info-detail .book-intro p').text().trim();
      noval.fullDescription = fullIntro;
      const bookIntro = $noval('.book-info');
      const contentElements: any = $noval(bookIntro).find('p em span');
      noval.view = Number(contentElements?.[0]?.children?.[0]?.data);
      noval.like = Number(contentElements?.[1]?.children?.[0]?.data)
      noval.follow = Number(contentElements?.[2]?.children?.[0]?.data)
      noval.suggest = Number(contentElements?.[3].children?.[0]?.data)
      await this.novalRepo.save(noval);
      await this.crawlTTVChapters(noval);
    } catch (error: any) {
      console.log("save noval id error", error.message)
    }
  }

  async crawlTTVChapters(noval: NovalEntity) {
    const chapterUrl = `https://truyen.tangthuvien.vn/doc-truyen/page/${noval.originalNovalId}?page=0&limit=99999999999&web=1`
    console.log("URL crawling", chapterUrl);
    const chaptersHtmlString: string = (await axios.get(chapterUrl)).data;
    const $chapters = cheerio.load(chaptersHtmlString);
    const listChapterElements = $chapters("ul li");
    let currentIndex = 0;
    const countChapters = await this.chapterRepo.count({ where: { novalData: { id: noval.id } } });
    if (countChapters > 0) {
      console.log("Chapters already exist for Noval", noval.name);
      if (listChapterElements.length <= countChapters) {
        console.log("All chapters existed");
        return;
      } else {
        currentIndex = countChapters;
      }
    }
    console.log("currentIndex", currentIndex)
    for (const chapterElementIdx in listChapterElements) {
      if (Number(chapterElementIdx) < currentIndex) continue;
      try {
        const chapterElement = listChapterElements[chapterElementIdx];
        const chapterUrl2 = $chapters(chapterElement).find("a").attr("href");
        if (!chapterUrl2) {
          console.log("No chapter url found")
          continue;
        }
        const existingChapter = await this.chapterRepo.findOne({
          where: {
            referrence: chapterUrl2,
          }
        })
        if (!!existingChapter) {
          console.log("Existed chapter: ", chapterUrl2)
          continue;
        }
        await this.crawlTTVChapterData($chapters, chapterElement, noval, chapterElementIdx, chapterUrl2)
      } catch (error: any) {
        console.log("save chapter error", chapterElementIdx, error.message);
      }
    }
  }

  async crawlTTVChapterData($chapters: cheerio.Root, chapterElement: cheerio.Element | undefined
    , noval: NovalEntity, chapterElementIdx: string | number, chapterUrl2: string,
  ) {
    const chapterName = $chapters(chapterElement).find("a").attr("title");
    let existingChapter = await this.chapterRepo.findOne({
      where: {
        referrence: chapterUrl2,
        name: chapterName
      },
      relations: ['novalData', 'comments']
    })
    if (!existingChapter) {
      existingChapter = await this.chapterRepo.create({
        referrence: chapterUrl2,
        name: chapterName,
        novalData: noval,
        chapterIndex: Number(chapterElementIdx) + 1,
      })
    }

    if (!existingChapter.content && chapterUrl2) {
      const chaptersHtmlString: string = (await axios.get(chapterUrl2)).data;
      console.log("URL crawling", chapterUrl2);
      waitMs(10);
      const $chapterContent = cheerio.load(chaptersHtmlString);
      const chapterContent = $chapterContent("div.box-chap").text().trim();
      existingChapter.content = chapterContent;
    }
    if (!existingChapter.novalData?.id) {
      console.log("Failed. Update chapter without noval id", chapterUrl2);
      return;
    }
    await this.chapterRepo.save(existingChapter);
    console.log("save chapter success", existingChapter.name);
  }

}