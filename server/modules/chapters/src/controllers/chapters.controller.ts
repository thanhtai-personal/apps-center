
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { ChaptersService } from "../services/chapters.service";
import { UpdateChapterDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { IChapterFilter } from "../interfaces/IChapterFilter";
import { IChapterResponse } from "../interfaces";

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete } = NEST_COMMON;

@Controller("/chapters")
export class ChaptersController {
  constructor(protected readonly chapterService: ChaptersService) { }

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
    @Query() query: ISearchQuery<IChapterFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IChapterResponse> = await this.chapterService.find(query) as IPagingResponse<IChapterResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<IChapterFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IChapterResponse> = await this.chapterService.findAll(query) as INonPagingResponse<IChapterResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:chapterId")
  async updateChapter(
    @Param('chapterId')
    chapterId: number,
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
    @Param('chapterId')
    chapterId: number,
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

  @Delete("/:chapterId")
  async delete(
    @Param('chapterId')
    chapterId: number,
    @Res()
    res: Response
  ) {
    try {
      const chapter = await this.chapterService.delete(Number(chapterId));
      return res.status(HttpStatus.OK).send(chapter);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
