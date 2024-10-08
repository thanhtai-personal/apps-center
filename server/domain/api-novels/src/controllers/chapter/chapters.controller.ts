

import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ChaptersService } from '@/services/chapters/chapters.service';
import { Response } from "express"
import { AuthGuard } from '@/guards/auth.guard';
import { UpdateChapterDto } from '@/dtos/chapters/chapter.update.dto';
import { IPagination, IPagingFilter, IChapterFilter, IChapterResponse } from "@core-ui/novals-types";

@Controller("/chapters")
export class ChaptersController {
  constructor(private readonly chapterService: ChaptersService) { }

  @Get("/:chapterId")
  async getOne(
    @Param("chapterId")
    chapterId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!chapterId) throw new HttpException("No chapter Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const chapter = await this.chapterService.findOne(chapterId);
      return res.status(HttpStatus.OK).send(chapter)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getMany(
    @Query() query: IPagingFilter & IChapterFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagination<IChapterResponse> = await this.chapterService.findAll({
        ...(query || []),
        limit: query.limit || 10,
        offset: query.offset || 0,
      }) as IPagination<IChapterResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:chapterId")
  async updateChapter(
    @Req()
    req: Request,
    @Param('chapterId')
    chapterId: string | number,
    @Body()
    updateChapterDto: UpdateChapterDto,
    @Res()
    res: Response
  ) {
    try {
      const chapter = await this.chapterService.update(Number(chapterId), updateChapterDto);
      return res.status(HttpStatus.OK).send(chapter);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:chapterId")
  async patchUpdate(
    @Req()
    req: Request,
    @Param('chapterId')
    chapterId: string | number,
    @Body()
    patchUpdateDto: Partial<UpdateChapterDto>,
    @Res()
    res: Response
  ) {
    try {
      const chapter = await this.chapterService.patchUpdate(Number(chapterId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(chapter);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
