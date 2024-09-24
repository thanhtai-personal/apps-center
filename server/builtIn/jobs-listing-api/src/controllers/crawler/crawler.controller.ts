

import {  Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AnyDayCrawlerService } from '@/services/anyDayCrawler/anyDayCrawler.service';
import { Response } from "express"

@Controller("/crawler")
export class CrawlerController {
  constructor(
    private readonly anyDayCrawlerService: AnyDayCrawlerService,
  ) { }

  @Post("/aniday")
  async exportAnydayJob(
    @Body() req: any,
    @Res()
    res: Response
  ) {
    try {
      const jobs = await this.anyDayCrawlerService.exportJobs(req.jobId, req.htmlString);
      return res.status(HttpStatus.OK).send(jobs)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
