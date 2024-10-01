/* eslint-disable max-lines */
import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Inject,
  NotFoundException,
  Param,
  Query,
  UnprocessableEntityException,
} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import {
  EmailAlreadyInUseException,
  RoleService,
  UserCreate,
  UserService,
  UserUpdate,
} from "@ttt-domain/user-management";
import { ExceptionMapper, ResourceCRUD } from "@ttt-module/infra";
import {
  Create,
  Delete,
  Read,
  Result,
  Update,
  UpdateAttribute,
} from "@ttt-module/nestjs-utils";
import { default as bcrypt } from "bcryptjs";
import {
  UserCreationMapper,
  UserFilterMapper,
  UserMapper,
  UserUpdatingMapper,
} from "~/mappers";
import {
  EmailUpdatingBody,
  PasswordUpdatingBody,
  RolesAssigningBody,
  User,
  UserCreationBody,
  UserFilterParams,
  UserUpdatingBody,
} from "~/models";

@ApiTags("Users")
@Controller({
  path: "users",
})
export class UserController
  implements ResourceCRUD<User, "Create" | "Read" | "Update" | "Delete">
{
  constructor(
    @Inject("IUserService") private readonly userService: UserService,
    @Inject("IRoleService") private readonly roleService: RoleService,
  ) {}

  @Create(User)
  @ApiConflictResponse({
    description: "Email is already in use",
  })
  @ApiUnprocessableEntityResponse({
    description: "Given roles contain non-existing one",
  })
  @ApiUnprocessableEntityResponse({
    description: "Default role not found",
  })
  @ApiForbiddenResponse({
    description: "Given roles contain unassignable one",
  })
  async create(@Body() body: UserCreationBody) {
    try {
      const roles = await this.roleService.getManyRoles({
        filter: { id: body.roles },
      });
      // does not allow to assign role super_admin
      if (roles.some((role) => role.name === "super_admin")) {
        throw new ForbiddenException("Given roles contain unassignable one");
      }

      //check if given role is existing or not
      const isRolesExist = this.roleService.isRolesExist(roles, body.roles);
      if (!isRolesExist) {
        throw new UnprocessableEntityException(
          "Given roles contain non-existing one",
        );
      }

      // get role user for default role
      const defaultRole = await this.roleService.getRoleByName("user");
      if (!defaultRole) {
        throw new UnprocessableEntityException("Default role does not exist");
      }

      const passwordHash = await bcrypt.hash(body.password, 10);
      const userData = new UserCreationMapper(UserCreationBody, UserCreate).map(
        body,
        {
          roles: roles.concat(defaultRole),
          passwordHash,
        },
      );
      const createdUser = await this.userService.createUser(userData);
      await this.userService.save(createdUser);
      return Result.single(UserMapper.map(createdUser));
    } catch (error) {
      throw new ExceptionMapper({
        [new EmailAlreadyInUseException("").errCode]: new ConflictException(
          "Email is already in use",
        ),
      }).map(error);
    }
  }

  @Read(User)
  @ApiNotFoundResponse({ description: "User not found" })
  async getOne(@Param("userId") id: number) {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return Result.single(UserMapper.map(user));
  }

  @Read([User])
  async getPaginated(@Query() query: UserFilterParams) {
    const filter = new UserFilterMapper().map(query);
    const [data, total] = await this.userService.getPaginatedUsers(filter);
    return Result.multiple(UserMapper.mapArray(data), total, filter.paging);
  }

  @Update(User)
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiConflictResponse({ description: "Email is already in use" })
  async update(@Param("userId") id: number, @Body() body: UserUpdatingBody) {
    try {
      //check if user existing or not
      const user = await this.userService.getById(id);
      if (!user) {
        throw new NotFoundException("User not found");
      }

      //check if email is used by another user
      const userEmail = await this.userService.getByEmail(body.email);
      if (userEmail && userEmail.id !== id) {
        throw new ConflictException("Email is already in use");
      }
      const updatedUser = await this.userService.updateUser(
        user,
        new UserUpdatingMapper(UserUpdatingBody, UserUpdate).map(body),
      );
      await this.userService.save(updatedUser);
      return Result.single(UserMapper.map(updatedUser));
    } catch (error) {
      throw new ExceptionMapper({
        [new EmailAlreadyInUseException("").errCode]: new ConflictException(
          "Email is already in use",
        ),
      }).map(error);
    }
  }

  @UpdateAttribute(User, "roles")
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @ApiUnprocessableEntityResponse({
    description: "Given roles contain non-existing role",
  })
  @ApiForbiddenResponse({
    description: "Given roles contain unassignable one",
  })
  async updateRoles(
    @Param("userId") id: number,
    @Body() { roles }: RolesAssigningBody,
  ) {
    //check if user existing or not
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    //check if given roles is existing or not
    const loadedRoles = await this.roleService.getManyRoles({
      filter: { id: roles },
    });
    const isRolesExist = this.roleService.isRolesExist(loadedRoles, roles);
    if (!isRolesExist) {
      throw new UnprocessableEntityException(
        "Given roles contain non-existing role",
      );
    }

    // does not allow to assign role super_admin
    if (loadedRoles.some((role) => role.name === "super_admin")) {
      throw new ForbiddenException("Given roles contain unassignable one");
    }

    const updatedUser = this.userService.updateRoles(user, loadedRoles);
    await this.userService.save(updatedUser);
    return Result.single(UserMapper.map(updatedUser));
  }

  @UpdateAttribute(User, "password")
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @ApiForbiddenResponse({
    description: "Wrong current password",
  })
  async updatePassword(
    @Param("userId") id: number,
    @Body() body: PasswordUpdatingBody,
  ) {
    //check if user existing or not
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!user.password) {
      throw new ForbiddenException("Wrong current password");
    }

    const { currentPassword, newPassword } = body;
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new ForbiddenException("Wrong current password");
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    const updatedUser = await this.userService.updateUserProperty(user, {
      property: "password",
      value: newPasswordHash,
    });
    await this.userService.save(updatedUser);
    return Result.single(UserMapper.map(updatedUser));
  }

  @UpdateAttribute(User, "email")
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @ApiConflictResponse({
    description: "Email is already in use",
  })
  async updateEmail(
    @Param("userId") id: number,
    @Body() { email }: EmailUpdatingBody,
  ) {
    try {
      //check if user existing or not
      const user = await this.userService.getById(id);
      if (!user) {
        throw new NotFoundException("User not found");
      }

      const updatedUser = await this.userService.updateUserProperty(user, {
        property: "email",
        value: email,
      });
      await this.userService.save(updatedUser);
      return Result.single(UserMapper.map(updatedUser));
    } catch (error) {
      throw new ExceptionMapper({
        [new EmailAlreadyInUseException("").errCode]: new ConflictException(
          "Email is already in use",
        ),
      }).map(error);
    }
  }

  @Delete(User)
  @ApiNotFoundResponse({
    description: "User not found",
  })
  async delete(@Param("userId") id: number) {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    this.userService.remove(user);
    await this.userService.save();
    return Result.empty();
  }
}
