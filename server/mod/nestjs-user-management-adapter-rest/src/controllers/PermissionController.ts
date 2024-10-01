import {
  Body,
  ConflictException,
  Controller,
  Inject,
  NotFoundException,
  Param,
  Query,
} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  PermissionCreate,
  PermissionUpdate,
  PermissionService,
} from "@ttt-domain/user-management";
import { ResourceCRUD } from "@ttt-module/infra";
import { Create, Delete, Read, Result, Update } from "@ttt-module/nestjs-utils";
import {
  PermissionCreationMapper,
  PermissionFilterMapper,
  PermissionMapper,
  PermissionUpdatingMapper,
} from "~/mappers";
import {
  Permission,
  PermissionCreationBody,
  PermissionFilterParams,
  PermissionUpdatingBody,
} from "~/models";

@ApiTags("Permissions")
@Controller({
  path: "permissions",
})
export class PermissionController
  implements ResourceCRUD<Permission, "Read" | "Create" | "Delete" | "Update">
{
  constructor(
    @Inject("IPermissionService")
    private readonly permissionService: PermissionService,
  ) {}

  @Read(Permission)
  @ApiNotFoundResponse({ description: "Permission not found" })
  async getOne(@Param("permissionId") permissionId: number) {
    const permission =
      await this.permissionService.getPermissionById(permissionId);
    if (!permission) {
      throw new NotFoundException("Permission not found");
    }
    return Result.single(PermissionMapper.map(permission));
  }

  @Read([Permission])
  async getPaginated(@Query() query: PermissionFilterParams) {
    const filter = new PermissionFilterMapper().map(query);
    const [data, total] =
      await this.permissionService.getPaginatedPermissions(filter);

    return Result.multiple(
      PermissionMapper.mapArray(data),
      total,
      filter.paging,
    );
  }

  @Create(Permission)
  @ApiConflictResponse({
    description: "Permission is already exist",
  })
  async create(@Body() body: PermissionCreationBody) {
    const permission = await this.permissionService.getPermissionByName(
      body.name,
    );
    if (permission) {
      throw new ConflictException("Permission is already exist");
    }

    const createdPermission = this.permissionService.createPermission(
      new PermissionCreationMapper(
        PermissionCreationBody,
        PermissionCreate,
      ).map(body),
    );

    await this.permissionService.save(createdPermission);

    return Result.single(PermissionMapper.map(createdPermission));
  }

  @Update(Permission)
  @ApiNotFoundResponse({
    description: "Permission not found",
  })
  @ApiConflictResponse({
    description: "Permission already exists",
  })
  async update(
    @Param("permissionId") id: number,
    @Body() body: PermissionUpdatingBody,
  ) {
    const permission = await this.permissionService.getPermissionById(id);
    if (!permission) {
      throw new NotFoundException("Permission not found");
    }
    const existingPermissionName =
      await this.permissionService.getPermissionByName(body.name);
    if (existingPermissionName) {
      throw new ConflictException("Permission already exists");
    }

    const updatedPermission = this.permissionService.updatePermission(
      permission,
      new PermissionUpdatingMapper(
        PermissionUpdatingBody,
        PermissionUpdate,
      ).map(body),
    );

    await this.permissionService.save(updatedPermission);
    return Result.single(PermissionMapper.map(updatedPermission));
  }
  @Delete(Permission)
  @ApiNotFoundResponse({
    description: "Permission not found",
  })
  async delete(@Param("permissionId") id: number) {
    const permission = await this.permissionService.getPermissionById(id);
    if (!permission) {
      throw new NotFoundException("Permission not found");
    }
    this.permissionService.remove(permission);
    await this.permissionService.save();
    return Result.empty();
  }
}
