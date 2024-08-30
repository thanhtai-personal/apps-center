import { CommentsController } from '@/controllers/comment/comments.controller';
import { CommentEntity } from '@/entities/comment.entity';
import { ModuleRefInterceptor } from '@/exceptions';
import { CommentsService } from '@/services/comments/comments.service';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity])
  ],
  providers: [
    CommentsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule { }
