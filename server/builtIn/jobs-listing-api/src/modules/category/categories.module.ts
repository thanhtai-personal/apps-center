import { CategoriesController } from '@/controllers/category/categories.controller';
import { CategoryEntity } from '@/entities/category.entity';
import { ModuleRefInterceptor } from '@/exceptions';
import { CategoriesService } from '@/services/categories/categories.service';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity])
  ],
  providers: [
    CategoriesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule { }
