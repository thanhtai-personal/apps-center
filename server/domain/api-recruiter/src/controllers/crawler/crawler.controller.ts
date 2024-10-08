

import {  Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AnyDayCrawlerService } from '@/services/anyDayCrawler/anyDayCrawler.service';
import { Response } from "express"

@Controller("/crawler")
export class CrawlerController {
  constructor(
    private readonly anyDayCrawlerService: AnyDayCrawlerService,
  ) { }

  @Get("/")
  async crawler(
    @Res()
    res: Response
  ) {
    try {
      return res.status(HttpStatus.OK).send({})
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("/aniday")
  async exportAnydayJob(
    @Body() req: {
      jobId: string;
      categoryId: number;
      htmlString: string;
    },
    @Res()
    res: Response
  ) {
    try {
      const jobs = await this.anyDayCrawlerService.exportJobs(req.jobId, req.categoryId, req.htmlString);
      return res.status(HttpStatus.OK).send(jobs)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
