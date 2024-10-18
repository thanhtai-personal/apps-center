
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { CommentsService } from "../services/comments.service";
import { CreateCommentDto, UpdateCommentDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { ICommentFilter } from "../interfaces/ICommentFilter";
import { ICommentResponse } from "../interfaces";

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete, Post } = NEST_COMMON;

@Controller("/comments")
export class CommentsController {
  constructor(protected readonly commentService: CommentsService) { }

  @Get("/:commentId")
  async getOne(
    @Param("commentId")
    commentId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!commentId) throw new HttpException("No comment Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const comment = await this.commentService.findOne(commentId);
      return res.status(HttpStatus.OK).send(comment)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getMany(
    @Query() query: ISearchQuery<ICommentFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<ICommentResponse> = await this.commentService.find(query) as IPagingResponse<ICommentResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<ICommentFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<ICommentResponse> = await this.commentService.findAll(query) as INonPagingResponse<ICommentResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createComment(
    @Body()
    createCommentDto: CreateCommentDto,
    @Res()
    res: Response
  ) {
    try {
      const comment = await this.commentService.create(createCommentDto);
      return res.status(HttpStatus.OK).send(comment);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:commentId")
  async updateComment(
    @Param('commentId')
    commentId: number,
    @Body()
    updateCommentDto: UpdateCommentDto,
    @Res()
    res: Response
  ) {
    try {
      const comment = await this.commentService.update(Number(commentId), updateCommentDto);
      return res.status(HttpStatus.OK).send(comment);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:commentId")
  async patchUpdate(
    @Param('commentId')
    commentId: number,
    @Body()
    patchUpdateDto: Partial<UpdateCommentDto>,
    @Res()
    res: Response
  ) {
    try {
      const comment = await this.commentService.patchUpdate(Number(commentId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(comment);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/:commentId")
  async delete(
    @Param('commentId')
    commentId: number,
    @Res()
    res: Response
  ) {
    try {
      const comment = await this.commentService.delete(Number(commentId));
      return res.status(HttpStatus.OK).send(comment);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
