import {
  Body,
  ConflictException,
  Controller,
  Inject,
  NotFoundException,
  Param,
  Query,
  UnprocessableEntityException,
} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import {
  RoleCreate,
  PermissionService,
  RoleService,
} from "@ttt-domain/user-management";
import { ResourceCRUD } from "@ttt-module/infra";
import { Create, Delete, Read, Result, Update } from "@ttt-module/nestjs-utils";
import {
  RoleCreationMapper,
  RoleFilterMapper,
  RoleMapper,
  RoleUpdatingMapper,
} from "~/mappers";
import {
  Role,
  RoleCreationBody,
  RoleFilterParams,
  RoleUpdatingBody,
} from "~/models";

@ApiTags("Roles")
@Controller({
  path: "roles",
})
export class RoleController
  implements ResourceCRUD<Role, "Create" | "Read" | "Delete" | "Update">
{
  constructor(
    @Inject("IRoleService") private readonly roleService: RoleService,
    @Inject("IPermissionService")
    private readonly permissionService: PermissionService,
  ) {}

  @Create(Role)
  @ApiUnprocessableEntityResponse({ description: "Permission does not exist" })
  @ApiConflictResponse({ description: "Role name is already exist" })
  async create(@Body() body: RoleCreationBody) {
    //Check if given role's name exist or not
    const existingRole = await this.roleService.getRoleByName(body.name);
    if (existingRole) {
      throw new ConflictException("Role name already exists");
    }

    // Check if permissions does not exist
    const permissions = await this.permissionService.getManyPermissions({
      filter: { id: body.permissions },
    });
    const unavailablePermissions = body.permissions?.filter(
      (item) => !permissions.some((loaded) => loaded.id === item),
    );
    if (unavailablePermissions?.length) {
      throw new UnprocessableEntityException(
        `Permissions ${unavailablePermissions.join(", ")} does not exist`,
      );
    }

    const createdRole = this.roleService.createRole(
      new RoleCreationMapper(RoleCreationBody, RoleCreate).map(body, {
        permissions,
      }),
    );
    await this.roleService.save(createdRole);

    return Result.single(RoleMapper.map(createdRole));
  }

  @Read([Role])
  async getPaginated(@Query() query: RoleFilterParams) {
    const filter = new RoleFilterMapper().map(query);
    const [data, total] = await this.roleService.getPaginatedRoles(filter);
    return Result.multiple(data, total, filter.paging);
  }

  @Read(Role)
  @ApiNotFoundResponse({
    description: "Role not found",
  })
  async getOne(@Param("roleId") id: number) {
    const role = await this.roleService.getRoleById(id);

    if (!role) {
      throw new NotFoundException("Role not found");
    }

    return Result.single(RoleMapper.map(role));
  }

  @Update(Role)
  @ApiUnprocessableEntityResponse({ description: "Permission does not exist" })
  @ApiConflictResponse({ description: "Role name is already exist" })
  @ApiNotFoundResponse({
    description: "Role not found",
  })
  async update(@Param("roleId") id: number, @Body() body: RoleUpdatingBody) {
    //Check if given role's name exist or not
    const existingRole = await this.roleService.getRoleByName(body.name);
    if (existingRole) {
      throw new ConflictException("Role name already exists");
    }

    const role = await this.roleService.getRoleById(id);
    if (!role) {
      throw new NotFoundException("Role not found");
    }

    // Check if permissions does not exist
    const permissions = await this.permissionService.getManyPermissions({
      filter: { id: body.permissions },
    });
    const isPermissionsExist = this.permissionService.isPermissionsExist(
      permissions,
      body.permissions,
    );
    if (!isPermissionsExist) {
      throw new UnprocessableEntityException(`Permissions does not exist`);
    }
    const updatedRole = this.roleService.updateRole(
      role,
      new RoleUpdatingMapper(RoleUpdatingBody, RoleCreate).map(body, {
        permissions,
      }),
    );
    await this.roleService.save(updatedRole);

    return Result.single(RoleMapper.map(updatedRole));
  }

  @Delete(Role)
  @ApiNotFoundResponse({
    description: "Role not found",
  })
  async delete(@Param("roleId") id: number) {
    const role = await this.roleService.getRoleById(id);
    if (!role) {
      throw new NotFoundException("Role not found");
    }
    this.roleService.remove(role);
    return Result.empty();
  }
}
