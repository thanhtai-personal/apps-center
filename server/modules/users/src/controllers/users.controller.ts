
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { UsersService } from "../services/users.service";
import { UpdateUserDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { IUserFilter } from "../interfaces/IUserFilter";
import { IUserResponse } from "../interfaces";

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete } = NEST_COMMON;

@Controller("/users")
export class UsersController {
  constructor(protected readonly userService: UsersService) { }

  @Get("/:userId")
  async getOne(
    @Param("userId")
    userId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!userId) throw new HttpException("No user Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const user = await this.userService.findOne(userId);
      return res.status(HttpStatus.OK).send(user)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getMany(
    @Query() query: ISearchQuery<IUserFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IUserResponse> = await this.userService.find(query) as IPagingResponse<IUserResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<IUserFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IUserResponse> = await this.userService.findAll(query) as INonPagingResponse<IUserResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:userId")
  async updateUser(
    @Param('userId')
    userId: number,
    @Body()
    updateUserDto: UpdateUserDto,
    @Res()
    res: Response
  ) {
    try {
      const user = await this.userService.update(Number(userId), updateUserDto);
      return res.status(HttpStatus.OK).send(user);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:userId")
  async patchUpdate(
    @Param('userId')
    userId: number,
    @Body()
    patchUpdateDto: Partial<UpdateUserDto>,
    @Res()
    res: Response
  ) {
    try {
      const user = await this.userService.patchUpdate(Number(userId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(user);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/:userId")
  async delete(
    @Param('userId')
    userId: number,
    @Res()
    res: Response
  ) {
    try {
      const user = await this.userService.delete(Number(userId));
      return res.status(HttpStatus.OK).send(user);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
