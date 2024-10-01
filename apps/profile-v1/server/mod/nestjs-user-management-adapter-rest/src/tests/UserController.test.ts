/* eslint-disable max-lines */
import {
  ConflictException,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { Test } from "@nestjs/testing";
import {
  Permission as PermissionEntity,
  Role as RoleEntity,
  User as UserEntity,
  PermissionService,
  RoleService,
  UserService,
} from "@ttt-domain/user-management";
import { IRepository, Loaded } from "@ttt-module/infra";
import { Result, SingleResult } from "@ttt-module/nestjs-utils";
import { UserController } from "~/controllers";
import { UserMapper } from "~/mappers";
import { User, UserCreationBody, UserUpdatingBody } from "~/models";
import { default as bcrypt } from "bcryptjs";

class MockUserRepository implements IRepository<UserEntity> {
  init(): Promise<void> {
    throw new Error("Not implemented");
  }
  create = (): UserEntity => {
    throw new Error("Not implemented");
  };

  find = (): Promise<Loaded<UserEntity>[]> => {
    throw new Error("Not implemented");
  };

  findAll = (): Promise<Loaded<UserEntity>[]> => {
    throw new Error("Not implemented");
  };

  findOne = (): Promise<Loaded<UserEntity> | null> => {
    throw new Error("Not implemented");
  };

  findAndCount = (): Promise<[Loaded<UserEntity>[], number]> => {
    throw new Error("Not implemented");
  };

  update = (): UserEntity => {
    throw new Error("Not implemented");
  };

  remove = (): void => {
    throw new Error("Not implemented");
  };

  save = (): Promise<void> => {
    throw new Error("Not implemented");
  };
}

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;
  let roleService: RoleService;
  let permissionService: PermissionService;
  let userData: UserEntity;
  let userDto: SingleResult<User>;
  let roleData: RoleEntity;
  let permissionData: PermissionEntity;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: "IRepository",
          useClass: MockUserRepository,
        },

        {
          provide: "IUserService",
          useFactory(service: UserService, repository: IRepository) {
            service.repository = repository;
            return service;
          },
          inject: [UserService, { token: "IRepository", optional: false }],
        },
        {
          provide: "IRoleService",
          useFactory(service: RoleService, repository: IRepository) {
            service.repository = repository;
            return service;
          },
          inject: [RoleService, { token: "IRepository", optional: false }],
        },
        {
          provide: "IPermissionService",
          useFactory(service: PermissionService, repository: IRepository) {
            service.repository = repository;
            return service;
          },
          inject: [
            PermissionService,
            { token: "IRepository", optional: false },
          ],
        },
        RoleService,
        PermissionService,
        UserService,
      ],
      controllers: [UserController],
    }).compile();
    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    roleService = moduleRef.get<RoleService>(RoleService);
    permissionService = moduleRef.get<PermissionService>(PermissionService);

    roleData = new RoleEntity({
      id: 1,
      name: "TEST_ROLE",
      description: "test",
      permissions: [permissionData],
    });
    permissionData = new PermissionEntity({
      id: 1,
      name: "TEST_PERMISSION",
    });
    roleData = new RoleEntity({
      id: 1,
      name: "user",
      description: "DEFAULT_USER_ROLE",
      permissions: [permissionData],
    });
    const passwordHash = await bcrypt.hash("123@AaAAA", 10);
    userData = new UserEntity({
      id: 1,
      email: "sample@email.com",
      status: "activated",
      firstName: "John",
      lastName: "Doe",
      password: passwordHash,
      roles: [roleData],
    });
    userDto = Result.single(UserMapper.map(userData));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    let userCreatePayload: UserCreationBody;

    beforeEach(() => {
      userCreatePayload = {
        email: "sample@email.com",
        status: "registered",
        firstName: "John",
        lastName: "Doe",
        password: "123@Aa",
        roles: [],
      };
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return single result of user including given user data", async () => {
      const getRolesSpy = jest
        .spyOn(roleService, "getManyRoles")
        .mockResolvedValue([roleData]);
      const checkExistRolesSpy = jest
        .spyOn(roleService, "isRolesExist")
        .mockReturnValue(true);
      const getRoleByNameSpy = jest
        .spyOn(roleService, "getRoleByName")
        .mockResolvedValue(
          new RoleEntity({
            id: 3,
            name: "user",
            description: "TEST_ROLE",
            permissions: [],
          }),
        );
      const createUserSpy = jest
        .spyOn(userService, "createUser")
        .mockResolvedValue(userData);
      const saveSpy = jest.spyOn(userService, "save").mockImplementation();

      const result = await userController.create(userCreatePayload);

      expect(result).toEqual(userDto);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(userData);
      expect(checkExistRolesSpy).toHaveBeenCalledTimes(1);
      expect(getRoleByNameSpy).toHaveBeenCalledTimes(1);
      expect(createUserSpy).toHaveBeenCalledTimes(1);
      expect(getRolesSpy).toHaveBeenCalledTimes(1);
    });
    it("should return single result of user include role User", async () => {
      jest.spyOn(userService, "getByEmail").mockResolvedValue(null);
      jest.spyOn(roleService, "getManyRoles").mockResolvedValue([roleData]);
      jest.spyOn(roleService, "isRolesExist").mockReturnValue(true);
      jest
        .spyOn(permissionService, "getManyPermissions")
        .mockResolvedValue([permissionData]);
      jest.spyOn(permissionService, "isPermissionsExist").mockReturnValue(true);
      jest.spyOn(roleService, "getRoleByName").mockResolvedValue(
        new RoleEntity({
          id: 3,
          name: "user",
          description: "TEST_ROLE",
          permissions: [],
        }),
      );
      jest.spyOn(userService, "createUser").mockResolvedValue(userData);
      jest.spyOn(userService, "save").mockImplementation();

      const resp = await userController.create(userCreatePayload);

      const includedUserRole = resp.data.roles.some(
        (role) => role.name === "user",
      );

      expect(includedUserRole).toBe(true);
    });
    it("should throw conflict exception when given email is already in use", async () => {
      jest.spyOn(roleService, "getManyRoles").mockResolvedValue([roleData]);
      jest.spyOn(roleService, "isRolesExist").mockReturnValue(true);
      jest.spyOn(roleService, "getRoleByName").mockResolvedValue(roleData);
      jest.spyOn(userService, "getByEmail").mockResolvedValue(userData);
      await expect(userController.create(userCreatePayload)).rejects.toThrow(
        ConflictException,
      );
    });
    it("should throw unprocessable entity if given roles not found", async () => {
      jest.spyOn(userService, "getByEmail").mockResolvedValue(null);
      jest.spyOn(roleService, "getManyRoles").mockResolvedValue([roleData]);
      jest.spyOn(roleService, "isRolesExist").mockReturnValue(false);

      const createUserSpy = jest
        .spyOn(userService, "createUser")
        .mockResolvedValue(userData);
      const saveSpy = jest.spyOn(userService, "save").mockImplementation();

      await expect(userController.create(userCreatePayload)).rejects.toThrow(
        UnprocessableEntityException,
      );
      expect(saveSpy).not.toHaveBeenCalled();
      expect(createUserSpy).not.toHaveBeenCalled();
    });

    it("should throw an not found exception if default role user not found", async () => {
      jest.spyOn(userService, "getByEmail").mockResolvedValue(null);
      jest.spyOn(roleService, "getManyRoles").mockResolvedValue([roleData]);
      jest.spyOn(roleService, "isRolesExist").mockReturnValue(true);
      jest
        .spyOn(permissionService, "getManyPermissions")
        .mockResolvedValue([permissionData]);
      jest.spyOn(permissionService, "isPermissionsExist").mockReturnValue(true);
      jest.spyOn(roleService, "getRoleByName").mockResolvedValue(null);
      const createUserSpy = jest
        .spyOn(userService, "createUser")
        .mockResolvedValue(userData);
      const saveSpy = jest.spyOn(userService, "save").mockImplementation();
      await expect(userController.create(userCreatePayload)).rejects.toThrow(
        UnprocessableEntityException,
      );
      expect(saveSpy).not.toHaveBeenCalled();
      expect(createUserSpy).not.toHaveBeenCalled();
    });
  });
  describe("getOne", () => {
    it("should return single result of user match given id", async () => {
      const getUserByIdSpy = jest
        .spyOn(userService, "getById")
        .mockResolvedValue(userData);
      const result = await userController.getOne(1);

      expect(result).toStrictEqual(userDto);
      expect(result.data.id).toEqual(1);
      expect(getUserByIdSpy).toHaveBeenCalledTimes(1);
    });
    it("should throw an not found exception if user does not exist", async () => {
      jest.spyOn(userService, "getById").mockResolvedValue(null);
      await expect(userController.getOne(1)).rejects.toThrow(NotFoundException);
    });
  });
  describe("getPaginated", () => {
    it("should return paginated result of user", async () => {
      const limit = 10;
      const offset = 1;
      const serviceResult: [UserEntity[], number] = [
        [userData],
        [userData].length,
      ];
      const getPaginateUserSpy = jest
        .spyOn(userService, "getPaginatedUsers")
        .mockResolvedValue(serviceResult);

      const result = await userController.getPaginated({
        limit,
        offset,
      });
      expect(result).toEqual(
        Result.multiple(
          UserMapper.mapArray(serviceResult[0]),
          serviceResult[1],
          {
            limit,
            offset,
          },
        ),
      );
      expect(getPaginateUserSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe("update", () => {
    const updateUserBody: UserUpdatingBody = {
      email: "sample@email.com",
      firstName: "John",
      lastName: "Doe",
      password: "Aa@312",
      phoneNumber: "0987654321",
    };
    it("should return single value of user when update successfully", async () => {
      const getUserByIdSpy = jest
        .spyOn(userService, "getById")
        .mockResolvedValue(userData);
      const getUserByEmailSpy = jest
        .spyOn(userService, "getByEmail")
        .mockResolvedValue(null);
      const updateSpy = jest
        .spyOn(userService, "updateUser")
        .mockResolvedValue(userData);
      const saveSpy = jest.spyOn(userService, "save").mockImplementation();

      const result = await userController.update(1, updateUserBody);

      expect(result).toEqual(userDto);
      expect(getUserByIdSpy).toHaveBeenCalledTimes(1);
      expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
    it("should throw an error if given user id not found", async () => {
      jest.spyOn(userService, "getById").mockResolvedValue(null);

      const updateSpy = jest
        .spyOn(userService, "updateUser")
        .mockResolvedValue(userData);
      const saveSpy = jest.spyOn(userService, "save").mockImplementation();

      await expect(userController.update(1, updateUserBody)).rejects.toThrow(
        NotFoundException,
      );
      expect(updateSpy).not.toHaveBeenCalled();
      expect(saveSpy).not.toHaveBeenCalled();
    });
    it("should throw conflict exception if given email already used by another user", async () => {
      const existingUser = new UserEntity({
        id: 2,
        email: "test@email.com",
        status: "activated",
        firstName: "Johnny",
        lastName: "Deep",
        password: "123@Aa",
        roles: [roleData],
      });

      jest.spyOn(userService, "getById").mockResolvedValue(userData);
      jest.spyOn(userService, "getByEmail").mockResolvedValue(existingUser);
      const updateSpy = jest
        .spyOn(userService, "updateUser")
        .mockResolvedValue(userData);
      const saveSpy = jest.spyOn(userService, "save").mockImplementation();

      await expect(userController.update(1, updateUserBody)).rejects.toThrow(
        ConflictException,
      );
      expect(updateSpy).not.toHaveBeenCalled();
      expect(saveSpy).not.toHaveBeenCalled();
    });
  });
  describe("updateRoles", () => {
    it("should return single result of user when assign role successfully", async () => {
      const getUserSpy = jest
        .spyOn(userService, "getById")
        .mockResolvedValue(userData);
      const getRolesSpy = jest
        .spyOn(roleService, "getManyRoles")
        .mockResolvedValue([roleData]);
      const checkExistRolesSpy = jest
        .spyOn(roleService, "isRolesExist")
        .mockReturnValue(true);
      const updateSpy = jest
        .spyOn(userService, "updateRoles")
        .mockReturnValue(userData);
      const saveSpy = jest.spyOn(userService, "save").mockImplementation();

      const result = await userController.updateRoles(1, { roles: [1] });

      expect(result).toEqual(userDto);
      expect(getUserSpy).toHaveBeenCalledTimes(1);
      expect(getRolesSpy).toHaveBeenCalledTimes(1);
      expect(checkExistRolesSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
    it("should throw unprocessable entity if given roles not found", async () => {
      jest.spyOn(userService, "getById").mockResolvedValue(userData);
      jest.spyOn(roleService, "getManyRoles").mockResolvedValue([]);
      const updateSpy = jest
        .spyOn(userService, "updateRoles")
        .mockImplementation();
      const saveSpy = jest.spyOn(userService, "save").mockImplementation();

      await expect(
        userController.updateRoles(1, { roles: [1] }),
      ).rejects.toThrow(UnprocessableEntityException);
      expect(updateSpy).not.toHaveBeenCalled();
      expect(saveSpy).not.toHaveBeenCalled();
    });
    it("should throw not found exception if given user not found", async () => {
      jest.spyOn(userService, "getById").mockResolvedValue(null);
      const updateSpy = jest
        .spyOn(userService, "updateRoles")
        .mockImplementation();
      const saveSpy = jest.spyOn(userService, "save").mockImplementation();

      await expect(
        userController.updateRoles(1, { roles: [1] }),
      ).rejects.toThrow(NotFoundException);
      expect(updateSpy).not.toHaveBeenCalled();
      expect(saveSpy).not.toHaveBeenCalled();
    });
  });
  describe("updatePassword", () => {
    it("should return single result of user if update password successfully", async () => {
      const getUserSpy = jest
        .spyOn(userService, "getById")
        .mockResolvedValue(userData);
      const updateSpy = jest
        .spyOn(userService, "updateUserProperty")
        .mockResolvedValue(userData);
      const saveSpy = jest.spyOn(userService, "save").mockImplementation();
      const result = await userController.updatePassword(1, {
        currentPassword: "123@AaAAA",
        newPassword: "123@Aa",
      });
      expect(result).toStrictEqual(userDto);
      expect(getUserSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
    it("should return not found exception if given user not found", async () => {
      jest.spyOn(userService, "getById").mockResolvedValue(null);
      const updateSpy = jest
        .spyOn(userService, "updateUserProperty")
        .mockImplementation();

      const saveSpy = jest.spyOn(userService, "save").mockImplementation();

      await expect(
        userController.updatePassword(1, {
          currentPassword: "123@AaAAA",
          newPassword: "123@Aa",
        }),
      ).rejects.toThrow(NotFoundException);
      expect(updateSpy).not.toHaveBeenCalled();
      expect(saveSpy).not.toHaveBeenCalled();
    });
  });
  describe("updateEmail", () => {
    it("should return single result of user when update email successfully", async () => {
      const getUserSpy = jest
        .spyOn(userService, "getById")
        .mockResolvedValue(userData);
      const updateSpy = jest
        .spyOn(userService, "updateUserProperty")
        .mockResolvedValue(userData);
      const saveSpy = jest.spyOn(userService, "save").mockImplementation();

      const result = await userController.updateEmail(1, {
        email: userData.email,
      });

      expect(result).toEqual(userDto);
      expect(getUserSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
    it("should throw an error if given user not found", async () => {
      jest.spyOn(userService, "getById").mockResolvedValue(null);
      const updateSpy = jest
        .spyOn(userService, "updateUserProperty")
        .mockImplementation();
      const saveSpy = jest.spyOn(userService, "save").mockImplementation();

      await expect(
        userController.updateEmail(1, {
          email: userData.email,
        }),
      ).rejects.toThrow(NotFoundException);
      expect(updateSpy).not.toHaveBeenCalled();
      expect(saveSpy).not.toHaveBeenCalled();
    });
  });
  describe("delete", () => {
    it("should return result empty if delete user successfully", async () => {
      const getUserSpy = jest
        .spyOn(userService, "getById")
        .mockResolvedValue(userData);
      const removeSpy = jest.spyOn(userService, "remove").mockImplementation();
      const saveSpy = jest.spyOn(userService, "save").mockImplementation();

      const result = await userController.delete(1);

      expect(result).toBe(Result.empty());
      expect(getUserSpy).toHaveBeenCalledTimes(1);
      expect(removeSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
    it("should throw an not found exception if given user not found", async () => {
      jest.spyOn(userService, "getById").mockResolvedValue(null);
      const removeSpy = jest.spyOn(userService, "remove").mockImplementation();
      const saveSpy = jest.spyOn(userService, "save").mockImplementation();

      await expect(userController.delete(1)).rejects.toThrow(NotFoundException);
      expect(removeSpy).not.toHaveBeenCalled();
      expect(saveSpy).not.toHaveBeenCalled();
    });
  });
});
