

import {  Controller, Get, HttpException, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { ScheduleService } from '@/services/schedule/schedule.service';
import { Response } from "express"
// import { AuthGuard } from '@/guards/auth.guard';

@Controller("/crawler")
// @UseGuards(AuthGuard)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) { }

  @Get("/tangthuvien")
  async crawnTangThuVien(
    @Res()
    res: Response
  ) {
    try {
      this.scheduleService.crawlTangThuVien();
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
