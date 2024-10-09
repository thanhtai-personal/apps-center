
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { RolesService } from "../services/roles.service";
import { UpdateRoleDto } from "../dtos";
import { INonPagingResponse, ISearchQuery } from "@core-ui/common-types";
import { IRoleFilter } from "../interfaces/IRoleFilter";
import { IRoleResponse } from "../interfaces";
import { IPagingResponse } from "@core-ui/common-types/dist/interfaces";

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete } = NEST_COMMON;

@Controller("/roles")
export class RolesController {
  constructor(protected readonly roleService: RolesService) { }

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
    @Query() query: ISearchQuery<IRoleFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IRoleResponse> = await this.roleService.find(query) as IPagingResponse<IRoleResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<IRoleFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IRoleResponse> = await this.roleService.findAll(query) as INonPagingResponse<IRoleResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:roleId")
  async updateRole(
    @Param('roleId')
    roleId: number,
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
    @Param('roleId')
    roleId: number,
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

  @Delete("/:roleId")
  async delete(
    @Param('roleId')
    roleId: number,
    @Res()
    res: Response
  ) {
    try {
      const role = await this.roleService.delete(Number(roleId));
      return res.status(HttpStatus.OK).send(role);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
