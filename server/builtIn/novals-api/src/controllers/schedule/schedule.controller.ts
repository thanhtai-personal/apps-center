

import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ScheduleService } from '@/services/schedule/schedule.service';
import { Response } from "express"
import { AuthGuard } from '@/guards/auth.guard';
import { UpdateChapterDto } from '@/dtos/chapters/chapter.update.dto';
import { IPagination, IPagingFilter, IChapterFilter, IChapterResponse } from "@core-ui/novals-types";

@Controller("/crawler")
@UseGuards(AuthGuard)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) { }

  @Get("/tangthuvien")
  async crawnTangThuVien(
    @Res()
    res: Response
  ) {
    try {
      await this.scheduleService.crawlTangThuVien();
      return res.status(HttpStatus.OK).send(true)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/")
  async crawnAll(
    @Res()
    res: Response
  ) {
    try {
      await this.scheduleService.crawlData();
      return res.status(HttpStatus.OK).send(true)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
