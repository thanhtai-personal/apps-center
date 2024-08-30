import { CreateCategoryDto } from '@/dtos/categories/category.create.dto';
import { UpdateCategoryDto } from '@/dtos/categories/category.update.dto';
import { CategoryEntity } from '@/entities/category.entity';
import { CategoryCreateDTOToEntityMapper } from '@/mappers/categories/category.create.mapper';
import { CategoryEntityToCategoryResponse } from '@/mappers/categories/category.response.mapper';
import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { IPagination, IPagingFilter, ICategoryFilter, ICategoryResponse } from '@core-ui/novals-types';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepos: Repository<CategoryEntity>,
  ) { }


  async findAll(filter: IPagingFilter & ICategoryFilter): Promise<IPagination<ICategoryResponse>> {
    throw new Error('Error finding category');
  }

  async findOne(id: number): Promise<ICategoryResponse | null> {
    throw new Error('Error finding category');
  }

  async update(categoryId: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepos.findOne({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const { id, ...nestedData } = updateCategoryDto;
    Object.assign(category, nestedData);

    const rsCategory = await this.categoryRepos.save(category);
    return CategoryEntityToCategoryResponse.map(rsCategory);
  }

  async patchUpdate(categoryId: number, updateCategoryDto: DeepPartial<UpdateCategoryDto>) {
    const category = await this.categoryRepos.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new Error('Category not found');
    }
    const { id, ...nestedData } = updateCategoryDto;
    Object.assign(category, nestedData);

    const rsCategory = await this.categoryRepos.save(category);
    return CategoryEntityToCategoryResponse.map(rsCategory);
  }

  async add(requestedCategory: CreateCategoryDto, isEntity: boolean = false) {
    try {
      const category = this.categoryRepos.create(CategoryCreateDTOToEntityMapper.map(requestedCategory));
      await this.categoryRepos.save(category);
      return isEntity ? category : CategoryEntityToCategoryResponse.map(category);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.categoryRepos.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}