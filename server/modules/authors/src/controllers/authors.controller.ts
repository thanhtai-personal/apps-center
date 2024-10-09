
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { AuthorsService } from "../services/authors.service";
import { UpdateAuthorDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { IAuthorFilter } from "../interfaces/IAuthorFilter";
import { IAuthorResponse } from "../interfaces";

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete } = NEST_COMMON;

@Controller("/authors")
export class AuthorsController {
  constructor(protected readonly authorService: AuthorsService) { }

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
    @Query() query: ISearchQuery<IAuthorFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IAuthorResponse> = await this.authorService.find(query) as IPagingResponse<IAuthorResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<IAuthorFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IAuthorResponse> = await this.authorService.findAll(query) as INonPagingResponse<IAuthorResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:authorId")
  async updateAuthor(
    @Param('authorId')
    authorId: number,
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
    @Param('authorId')
    authorId: number,
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

  @Delete("/:authorId")
  async delete(
    @Param('authorId')
    authorId: number,
    @Res()
    res: Response
  ) {
    try {
      const author = await this.authorService.delete(Number(authorId));
      return res.status(HttpStatus.OK).send(author);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
