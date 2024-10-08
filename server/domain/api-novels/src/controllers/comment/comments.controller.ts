

import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { CommentsService } from '@/services/comments/comments.service';
import { Response } from "express"
import { AuthGuard } from '@/guards/auth.guard';
import { UpdateCommentDto } from '@/dtos/comments/comment.update.dto';
import { IPagination, IPagingFilter, ICommentFilter, ICommentResponse } from "@core-ui/novals-types";

@Controller("/comments")
export class CommentsController {
  constructor(private readonly commentService: CommentsService) { }

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
    @Query() query: IPagingFilter & ICommentFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagination<ICommentResponse> = await this.commentService.findAll({
        ...(query || []),
        limit: query.limit || 10,
        offset: query.offset || 0,
      }) as IPagination<ICommentResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:commentId")
  async updateComment(
    @Req()
    req: Request,
    @Param('commentId')
    commentId: string | number,
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
    @Req()
    req: Request,
    @Param('commentId')
    commentId: string | number,
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

}
