

import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { RolesService } from '@/services/roles/roles.service';
import { Response } from "express"
import { AuthGuard } from '@/guards/auth.guard';
import { UpdateRoleDto } from '@/dtos/roles/role.update.dto';
import { IPagination, IPagingFilter, IRoleFilter, IRoleResponse } from "@core-ui/jobs-listing-types";

@Controller("/roles")
@UseGuards(AuthGuard)
export class RolesController {
  constructor(private readonly roleService: RolesService) { }

  @Get("/:roleId")
  async getOne(
    @Param("roleId")
    roleId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!roleId) throw new HttpException("No role Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const role = await this.roleService.findOne(roleId);
      return res.status(HttpStatus.OK).send(role)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getMany(
    @Query() query: IPagingFilter & IRoleFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagination<IRoleResponse> = await this.roleService.findAll({
        ...(query || []),
        limit: query.limit || 10,
        offset: query.offset || 0,
      }) as IPagination<IRoleResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:roleId")
  async updateRole(
    @Req()
    req: Request,
    @Param('roleId')
    roleId: string | number,
    @Body()
    updateRoleDto: UpdateRoleDto,
    @Res()
    res: Response
  ) {
    try {
      const role = await this.roleService.update(Number(roleId), updateRoleDto);
      return res.status(HttpStatus.OK).send(role);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:roleId")
  async patchUpdate(
    @Req()
    req: Request,
    @Param('roleId')
    roleId: string | number,
    @Body()
    patchUpdateDto: Partial<UpdateRoleDto>,
    @Res()
    res: Response
  ) {
    try {
      const role = await this.roleService.patchUpdate(Number(roleId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(role);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
