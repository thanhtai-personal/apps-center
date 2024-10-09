
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { JobsService } from "../services/jobs.service";
import { UpdateJobDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { IJobFilter } from "../interfaces/IJobFilter";
import { IJobResponse } from "../interfaces";

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete } = NEST_COMMON;

@Controller("/jobs")
export class JobsController {
  constructor(protected readonly jobService: JobsService) { }

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
    @Query() query: ISearchQuery<IJobFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IJobResponse> = await this.jobService.find(query) as IPagingResponse<IJobResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<IJobFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IJobResponse> = await this.jobService.findAll(query) as INonPagingResponse<IJobResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:jobId")
  async updateJob(
    @Param('jobId')
    jobId: number,
    @Body()
    updateJobDto: UpdateJobDto,
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
    @Param('jobId')
    jobId: number,
    @Body()
    patchUpdateDto: Partial<UpdateJobDto>,
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
    @Param('jobId')
    jobId: number,
    @Res()
    res: Response
  ) {
    try {
      const job = await this.jobService.delete(Number(jobId));
      return res.status(HttpStatus.OK).send(job);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
