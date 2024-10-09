
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { NovelsService } from "../services/novels.service";
import { UpdateNovelDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { INovelFilter } from "../interfaces/INovelFilter";
import { INovelResponse } from "../interfaces";

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete } = NEST_COMMON;

@Controller("/novels")
export class NovelsController {
  constructor(protected readonly novelService: NovelsService) { }

  @Get("/:novelId")
  async getOne(
    @Param("novelId")
    novelId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!novelId) throw new HttpException("No novel Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const novel = await this.novelService.findOne(novelId);
      return res.status(HttpStatus.OK).send(novel)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getMany(
    @Query() query: ISearchQuery<INovelFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<INovelResponse> = await this.novelService.find(query) as IPagingResponse<INovelResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<INovelFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<INovelResponse> = await this.novelService.findAll(query) as INonPagingResponse<INovelResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:novelId")
  async updateNovel(
    @Param('novelId')
    novelId: number,
    @Body()
    updateNovelDto: UpdateNovelDto,
    @Res()
    res: Response
  ) {
    try {
      const novel = await this.novelService.update(Number(novelId), updateNovelDto);
      return res.status(HttpStatus.OK).send(novel);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:novelId")
  async patchUpdate(
    @Param('novelId')
    novelId: number,
    @Body()
    patchUpdateDto: Partial<UpdateNovelDto>,
    @Res()
    res: Response
  ) {
    try {
      const novel = await this.novelService.patchUpdate(Number(novelId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(novel);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/:novelId")
  async delete(
    @Param('novelId')
    novelId: number,
    @Res()
    res: Response
  ) {
    try {
      const novel = await this.novelService.delete(Number(novelId));
      return res.status(HttpStatus.OK).send(novel);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
