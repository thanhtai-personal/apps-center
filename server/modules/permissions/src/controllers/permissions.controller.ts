
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { PermissionsService } from "../services/permissions.service";
import { UpdatePermissionDto } from "../dtos";
import { INonPagingResponse, ISearchQuery } from "@core-ui/common-types";
import { IPermissionFilter } from "../interfaces/IPermissionFilter";
import { IPermissionResponse } from "../interfaces";
import { IPagingResponse } from "@core-ui/common-types/dist/interfaces";

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete } = NEST_COMMON;

@Controller("/permissions")
export class PermissionsController {
  constructor(protected readonly permissionService: PermissionsService) { }

  @Get("/:permissionId")
  async getOne(
    @Param("permissionId")
    permissionId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!permissionId) throw new HttpException("No permission Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const permission = await this.permissionService.findOne(permissionId);
      return res.status(HttpStatus.OK).send(permission)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getMany(
    @Query() query: ISearchQuery<IPermissionFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IPermissionResponse> = await this.permissionService.find(query) as IPagingResponse<IPermissionResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<IPermissionFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IPermissionResponse> = await this.permissionService.findAll(query) as INonPagingResponse<IPermissionResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:permissionId")
  async updatePermission(
    @Param('permissionId')
    permissionId: number,
    @Body()
    updatePermissionDto: UpdatePermissionDto,
    @Res()
    res: Response
  ) {
    try {
      const permission = await this.permissionService.update(Number(permissionId), updatePermissionDto);
      return res.status(HttpStatus.OK).send(permission);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:permissionId")
  async patchUpdate(
    @Param('permissionId')
    permissionId: number,
    @Body()
    patchUpdateDto: Partial<UpdatePermissionDto>,
    @Res()
    res: Response
  ) {
    try {
      const permission = await this.permissionService.patchUpdate(Number(permissionId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(permission);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/:permissionId")
  async delete(
    @Param('permissionId')
    permissionId: number,
    @Res()
    res: Response
  ) {
    try {
      const permission = await this.permissionService.delete(Number(permissionId));
      return res.status(HttpStatus.OK).send(permission);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
