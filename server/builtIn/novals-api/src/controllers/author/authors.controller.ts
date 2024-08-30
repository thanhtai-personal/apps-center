

import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthorsService } from '@/services/authors/authors.service';
import { Response } from "express"
import { AuthGuard } from '@/guards/auth.guard';
import { UpdateAuthorDto } from '@/dtos/authors/author.update.dto';
import { IPagination, IPagingFilter, IAuthorFilter, IAuthorResponse } from "@core-ui/novals-types";

@Controller("/authors")
@UseGuards(AuthGuard)
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) { }

  @Get("/:authorId")
  async getOne(
    @Param("authorId")
    authorId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!authorId) throw new HttpException("No author Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const author = await this.authorService.findOne(authorId);
      return res.status(HttpStatus.OK).send(author)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getMany(
    @Query() query: IPagingFilter & IAuthorFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagination<IAuthorResponse> = await this.authorService.findAll({
        ...(query || []),
        limit: query.limit || 10,
        offset: query.offset || 0,
      }) as IPagination<IAuthorResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:authorId")
  async updateAuthor(
    @Req()
    req: Request,
    @Param('authorId')
    authorId: string | number,
    @Body()
    updateAuthorDto: UpdateAuthorDto,
    @Res()
    res: Response
  ) {
    try {
      const author = await this.authorService.update(Number(authorId), updateAuthorDto);
      return res.status(HttpStatus.OK).send(author);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:authorId")
  async patchUpdate(
    @Req()
    req: Request,
    @Param('authorId')
    authorId: string | number,
    @Body()
    patchUpdateDto: Partial<UpdateAuthorDto>,
    @Res()
    res: Response
  ) {
    try {
      const author = await this.authorService.patchUpdate(Number(authorId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(author);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
