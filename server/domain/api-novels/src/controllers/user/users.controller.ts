

import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from '@/services/users/users.service';
import { Response } from "express"
import { AuthGuard } from '@/guards/auth.guard';
import { UpdateUserDto } from '@/dtos/users/user.update.dto';
import { IPagination, IPagingFilter, IUserFilter, IUserResponse } from "@core-ui/novals-types";

@Controller("/users")
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) { }

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
    @Query() query: IPagingFilter & IUserFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagination<IUserResponse> = await this.userService.findAll({
        ...(query || []),
        limit: query.limit || 10,
        offset: query.offset || 0,
      }) as IPagination<IUserResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:userId")
  async updateUser(
    @Req()
    req: Request,
    @Param('userId')
    userId: string | number,
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
    @Req()
    req: Request,
    @Param('userId')
    userId: string | number,
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

}
