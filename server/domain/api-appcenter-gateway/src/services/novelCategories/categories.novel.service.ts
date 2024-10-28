import { NEST_COMMON, NEST_MICRO_SERVICE } from '@core-api/nest-core';
import { UMS_SERVICE, NovelCategoryMessages } from "@core-api/microservices-utils";
import { CreateCategoryDto, IAppCenterCategoryFilter, IAppCenterCategoryResponse, UpdateCategoryDto } from "@core-api/appcenter-materials"
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"

const { Injectable } = NEST_COMMON;

@Injectable()
export class NovelCategoriesService {
  constructor(
    @NEST_COMMON.Inject(UMS_SERVICE) private readonly umsClient: NEST_MICRO_SERVICE.ClientProxy,
  ) {
  }

  async findAll(filter: IAppCenterCategoryFilter): Promise<INonPagingResponse<IAppCenterCategoryResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: NovelCategoryMessages.GET_ALL_CATEGORIES }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async find(filter: IAppCenterCategoryFilter): Promise<IPagingResponse<IAppCenterCategoryResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: NovelCategoryMessages.GET_ALL_CATEGORIES }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async findOne(id: number): Promise<IAppCenterCategoryResponse> {
    try {
      const response = await this.umsClient.send({ cmd: NovelCategoryMessages.GET_ONE_CATEGORY }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async update(roleId: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const response = await this.umsClient.send({ cmd: NovelCategoryMessages.UPDATE_CATEGORY }, {
        roleId,
        updateCategoryDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async patchUpdate(roleId: number, updateCategoryDto: Partial<UpdateCategoryDto>) {
    try {
      const response = await this.umsClient.send({ cmd: NovelCategoryMessages.PATCH_UPDATE_CATEGORY }, {
        roleId,
        updateCategoryDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }


  async create(requestedCategory: CreateCategoryDto): Promise<IAppCenterCategoryResponse> {
    try {
      const response = await this.umsClient.send({ cmd: NovelCategoryMessages.CREATE_CATEGORY }, requestedCategory).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await this.umsClient.send({ cmd: NovelCategoryMessages.DELETE_CATEGORY }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }
}