import { AuthorsController } from '@/controllers/author/authors.controller';
import { AuthorEntity } from '@/entities/author.entity';
import { ModuleRefInterceptor } from '@/exceptions';
import { AuthorsService } from '@/services/authors/authors.service';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorEntity])
  ],
  providers: [
    AuthorsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [AuthorsController],
  exports: [AuthorsService],
})
export class AuthorsModule { }
