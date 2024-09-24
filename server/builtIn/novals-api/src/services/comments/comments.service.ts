import { CreateCommentDto } from '@/dtos/comments/comment.create.dto';
import { UpdateCommentDto } from '@/dtos/comments/comment.update.dto';
import { CommentEntity } from '@/entities/comment.entity';
import { CommentCreateDTOToEntityMapper } from '@/mappers/comments/comment.create.mapper';
import { CommentEntityToCommentResponse } from '@/mappers/comments/comment.response.mapper';
import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { IPagination, IPagingFilter, ICommentFilter, ICommentResponse } from '@core-ui/novals-types';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
  ) { }

  async findAll(filter: IPagingFilter & ICommentFilter): Promise<IPagination<ICommentResponse>> {
    const comments = await this.commentsRepository.find({ where: { deletedAt: undefined } });
    return {
      data: CommentEntityToCommentResponse.maps(comments),
      limit: 99999999,
      offset: 0,
      total: comments.length,
    } as IPagination<ICommentResponse>;
  }

  async findOne(id: number): Promise<ICommentResponse | null> {
    const comment = await this.commentsRepository.findOne({ where: { id: id } });

    return comment ? CommentEntityToCommentResponse.map(comment) : comment;
  }

  async update(commentId: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentsRepository.findOne({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    const { id, ...nestedData } = updateCommentDto;
    Object.assign(comment, nestedData);

    const rsComment = await this.commentsRepository.save(comment);
    return CommentEntityToCommentResponse.map(rsComment);
  }

  async patchUpdate(commentId: number, updateCommentDto: DeepPartial<UpdateCommentDto>) {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
    });
    if (!comment) {
      throw new Error('Comment not found');
    }
    const { id, ...nestedData } = updateCommentDto;
    Object.assign(comment, nestedData);

    const rsComment = await this.commentsRepository.save(comment);
    return CommentEntityToCommentResponse.map(rsComment);
  }

  async add(requestedComment: CreateCommentDto, isEntity: boolean = false) {
    try {
      const comment = this.commentsRepository.create(CommentCreateDTOToEntityMapper.map(requestedComment));
      await this.commentsRepository.save(comment);
      return isEntity ? comment : CommentEntityToCommentResponse.map(comment);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.commentsRepository.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}