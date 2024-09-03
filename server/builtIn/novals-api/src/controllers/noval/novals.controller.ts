

import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { NovalsService } from '@/services/novals/novals.service';
import { Response } from "express"
import { UpdateNovalDto } from '@/dtos/novals/noval.update.dto';
import { IPagination, IPagingFilter, INovalFilter, INovalResponse } from "@core-ui/novals-types";

@Controller("/novals")
export class NovalsController {
  constructor(private readonly novalService: NovalsService) { }

  @Get("/:novalId")
  async getOne(
    @Param("novalId")
    novalId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!novalId) throw new HttpException("No noval Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const noval = await this.novalService.findOne(novalId);
      return res.status(HttpStatus.OK).send(noval)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getMany(
    @Query() query: IPagingFilter & INovalFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagination<INovalResponse> = await this.novalService.findAll({
        ...(query || []),
        limit: query.limit || 10,
        offset: query.offset || 0,
      }) as IPagination<INovalResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:novalId")
  async updateNoval(
    @Req()
    req: Request,
    @Param('novalId')
    novalId: string | number,
    @Body()
    updateNovalDto: UpdateNovalDto,
    @Res()
    res: Response
  ) {
    try {
      const noval = await this.novalService.update(Number(novalId), updateNovalDto);
      return res.status(HttpStatus.OK).send(noval);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:novalId")
  async patchUpdate(
    @Req()
    req: Request,
    @Param('novalId')
    novalId: string | number,
    @Body()
    patchUpdateDto: Partial<UpdateNovalDto>,
    @Res()
    res: Response
  ) {
    try {
      const noval = await this.novalService.patchUpdate(Number(novalId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(noval);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
