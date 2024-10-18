
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { CategoriesService } from "../services/categories.service";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { ICategoryFilter } from "../interfaces/ICategoryFilter";
import { ICategoryResponse } from "../interfaces";

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete, Post } = NEST_COMMON;

@Controller("/categories")
export class CategoriesController {
  constructor(protected readonly categoryService: CategoriesService) { }

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
    @Query() query: ISearchQuery<ICategoryFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<ICategoryResponse> = await this.categoryService.find(query) as IPagingResponse<ICategoryResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<ICategoryFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<ICategoryResponse> = await this.categoryService.findAll(query) as INonPagingResponse<ICategoryResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createCategory(
    @Body()
    createCategoryDto: CreateCategoryDto,
    @Res()
    res: Response
  ) {
    try {
      const category = await this.categoryService.create(createCategoryDto);
      return res.status(HttpStatus.OK).send(category);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:categoryId")
  async updateCategory(
    @Param('categoryId')
    categoryId: number,
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
    @Param('categoryId')
    categoryId: number,
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

  @Delete("/:categoryId")
  async delete(
    @Param('categoryId')
    categoryId: number,
    @Res()
    res: Response
  ) {
    try {
      const category = await this.categoryService.delete(Number(categoryId));
      return res.status(HttpStatus.OK).send(category);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
