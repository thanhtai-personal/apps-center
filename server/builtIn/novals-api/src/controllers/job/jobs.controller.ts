

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { JobsService } from '@/services/jobs/jobs.service';
import { Response } from "express"
import { IPagination, IPagingFilter } from "@core-ui/novals-types";

@Controller("/jobs")
export class JobsController {
  constructor(private readonly jobService: JobsService) { }

  @Get("/:jobId")
  async getOne(
    @Param("jobId")
    jobId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!jobId) throw new HttpException("No job Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const job = await this.jobService.findOne(jobId);
      return res.status(HttpStatus.OK).send(job)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getMany(
    @Query() query: IPagingFilter & any,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagination<any> = await this.jobService.findAll({
        ...(query || []),
        limit: query.limit || 10,
        offset: query.offset || 0,
      }) as IPagination<any>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:jobId")
  async updateJob(
    @Req()
    req: Request,
    @Param('jobId')
    jobId: string | number,
    @Body()
    updateJobDto: any,
    @Res()
    res: Response
  ) {
    try {
      const job = await this.jobService.update(Number(jobId), updateJobDto);
      return res.status(HttpStatus.OK).send(job);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:jobId")
  async patchUpdate(
    @Req()
    req: Request,
    @Param('jobId')
    jobId: string | number,
    @Body()
    patchUpdateDto: Partial<any>,
    @Res()
    res: Response
  ) {
    try {
      const job = await this.jobService.patchUpdate(Number(jobId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(job);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/:jobId")
  async delete(
    @Req()
    req: Request,
    @Param('jobId')
    jobId: string | number,
    @Body()
    patchUpdateDto: Partial<any>,
    @Res()
    res: Response
  ) {
    try {
      const job = await this.jobService.sortDelete(Number(jobId));
      return res.status(HttpStatus.OK).send(job);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
