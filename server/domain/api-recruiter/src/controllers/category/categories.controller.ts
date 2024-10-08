

import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { CategoriesService } from '@/services/categories/categories.service';
import { Response } from "express"
import { AuthGuard } from '@/guards/auth.guard';
import { UpdateCategoryDto } from '@/dtos/categories/category.update.dto';
import { IPagination, IPagingFilter, ICategoryFilter, ICategoryResponse } from "@core-ui/jobs-listing-types";

@Controller("/categories")
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) { }

  @Get("/:categoryId")
  async getOne(
    @Param("categoryId")
    categoryId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!categoryId) throw new HttpException("No category Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const category = await this.categoryService.findOne(categoryId);
      return res.status(HttpStatus.OK).send(category)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getMany(
    @Query() query: IPagingFilter & ICategoryFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagination<ICategoryResponse> = await this.categoryService.findAll({
        ...(query || []),
        limit: query.limit || 10,
        offset: query.offset || 0,
      }) as IPagination<ICategoryResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:categoryId")
  async updateCategory(
    @Req()
    req: Request,
    @Param('categoryId')
    categoryId: string | number,
    @Body()
    updateCategoryDto: UpdateCategoryDto,
    @Res()
    res: Response
  ) {
    try {
      const category = await this.categoryService.update(Number(categoryId), updateCategoryDto);
      return res.status(HttpStatus.OK).send(category);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:categoryId")
  async patchUpdate(
    @Req()
    req: Request,
    @Param('categoryId')
    categoryId: string | number,
    @Body()
    patchUpdateDto: Partial<UpdateCategoryDto>,
    @Res()
    res: Response
  ) {
    try {
      const category = await this.categoryService.patchUpdate(Number(categoryId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(category);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
