import { JobEntity } from "@/entities";
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { Injectable } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
import * as cheerio from 'cheerio';


@Injectable()
export class AnyDayCrawlerService {
  private isCrawling: boolean;

  constructor(
    @InjectRepository(JobEntity)
    private jobRepo: Repository<JobEntity>,
  ) {
    this.isCrawling = false;
  }

  async exportJobs(jobId: string, htmlString: string) {
    if (this.isCrawling) return;
    this.isCrawling = true;
    try {
      const $page = cheerio.load(htmlString);
      const thumb = $page("div.job-detail-header_job-detail-header div.my-image_my-image img.my-image_my-image")?.attr("src");
      const name = $page("h1.title-section_title-section")?.text()?.trim();
      
      const rewardElems = $page("div.job-detail-header_job-detail-header div.ant-space div.ant-space-item span.job-detail-header_job-detail-header") || [];
      const goldRef = $page((rewardElems?.[0] as any)?.children)?.text()?.trim();
      const goldItv = $page((rewardElems?.[2] as any)?.children)?.text()?.trim();

      const shareUrl = ""; //nope

      const jobDescriptionElems = $page("div.ant-row div.ant-col span.job-description_job-description");
      const cvInprogress = $page((jobDescriptionElems?.[0] as any)?.children)?.text()?.trim();
      const cvPassed = $page((jobDescriptionElems?.[1] as any)?.children)?.text()?.trim();
      
      const inforElements = $page("tr.ant-descriptions-row td.ant-descriptions-item div.ant-descriptions-item-container span.ant-descriptions-item-content div.edit-information-view_edit-information-view");
      const grossSalary = $page((inforElements?.[1] as any)?.children)?.text()?.trim();
      const number = $page((inforElements?.[3] as any)?.children)?.text()?.trim();
      const position = $page((inforElements?.[11] as any)?.children)?.text()?.trim();
      const jobType = $page((inforElements?.[13] as any)?.children)?.text()?.trim();
      const level = $page((inforElements?.[15] as any)?.children)?.text()?.trim();
      const engLevel = $page((inforElements?.[19] as any)?.children)?.text()?.trim();

      const jdElements = $page("div.edit-summary-view_edit-summary-view");
      const summary = $page(jdElements?.[0])?.html()?.toString();
      const skills = $page(jdElements?.[1])?.html()?.toString();
      const prioritySkills = $page(jdElements?.[2])?.html()?.toString();
      const profit = $page(jdElements?.[3])?.html()?.toString();

      const noteElements = $page("div.ant-alert-content div.ant-alert-message div.job-detail_job-detail");
      const note = $page(noteElements?.[1])?.html()?.toString();

      const htmlInfoElements = $page("div.ant-card.my-box_my-box div.ant-card-body div.ant-descriptions");
      const htmlInfo = `${$page(htmlInfoElements?.[0])?.html()?.toString()} ${$page(htmlInfoElements?.[1])?.html()?.toString()}`;

      const companyName = $page("h3.company-profile-view_company-profile-view a.my-link_my-link.company-profile-view_company-profile-view")?.text()?.trim();
      
      const newJob = {
        jobId,
        companyName,
        htmlInfo,
        name,
        thumb,
        goldRef,
        goldItv,
        shareUrl,
        cvInprogress,
        cvPassed,
        grossSalary,
        number,
        position,
        level,
        engLevel,
        jobType,
        summary,
        skills,
        prioritySkills,
        profit,
        itvProcess: "", //nope
        note,
      }

      let existingJob = await this.jobRepo.findOne({ where: { jobId } });
      if (existingJob) {
        existingJob = await this.jobRepo.save({ ...existingJob, ...newJob })
      } else {
        const newJobDt = this.jobRepo.create(newJob);
        existingJob = await this.jobRepo.save(newJobDt);
      }
      const jobs = await this.jobRepo.find({ where: { deletedAt: undefined } });
      console.log("SUCCESS - FINISHED CRAWLS DATA");

      return jobs;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    } finally {
      this.isCrawling = false;
    }
  }

}

