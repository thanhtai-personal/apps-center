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
  PermissionService,
  RoleService,
} from "@ttt-domain/user-management";
import { IRepository, Loaded } from "@ttt-module/infra";
import { Result } from "@ttt-module/nestjs-utils";
import { RoleController } from "~/controllers";
import { RoleMapper } from "~/mappers";
import { Role } from "~/models";

class MockRoleRepository implements IRepository<RoleEntity> {
  init(): Promise<void> {
    throw new Error("Not implemented");
  }
  create = (): RoleEntity => {
    throw new Error("Not implemented");
  };

  find = (): Promise<Loaded<RoleEntity>[]> => {
    throw new Error("Not implemented");
  };

  findAll = (): Promise<Loaded<RoleEntity>[]> => {
    throw new Error("Not implemented");
  };

  findOne = (): Promise<Loaded<RoleEntity> | null> => {
    throw new Error("Not implemented");
  };

  findAndCount = (): Promise<[Loaded<RoleEntity>[], number]> => {
    throw new Error("Not implemented");
  };

  update = (): RoleEntity => {
    throw new Error("Not implemented");
  };

  remove = (): void => {
    throw new Error("Not implemented");
  };

  save = (): Promise<void> => {
    throw new Error("Not implemented");
  };
}

describe("RoleController", () => {
  let roleController: RoleController;
  let roleService: RoleService;
  let permissionService: PermissionService;
  let roleData: RoleEntity;
  let roleDto: Role;
  let permissionData: PermissionEntity;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: "IRepository",
          useClass: MockRoleRepository,
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
      ],
      controllers: [RoleController],
    }).compile();

    roleController = moduleRef.get<RoleController>(RoleController);
    roleService = moduleRef.get<RoleService>(RoleService);
    permissionService = moduleRef.get<PermissionService>(PermissionService);

    roleData = new RoleEntity({
      id: 1,
      name: "DEFAULT_NAME",
      description: "default role name with empty description",
      permissions: [],
    });

    roleDto = RoleMapper.map(roleData);
    permissionData = new PermissionEntity({
      id: 1,
      name: "DEFAULT_PERMISSION_NAME",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should return single result object including created role data by given data", async () => {
      const createRoleSpy = jest
        .spyOn(roleService, "createRole")
        .mockReturnValue(roleData);
      jest.spyOn(roleService, "getRoleByName").mockResolvedValue(null);
      jest
        .spyOn(permissionService, "getManyPermissions")
        .mockResolvedValue([
          permissionData,
          new PermissionEntity({ ...permissionData.toJSON(), id: 2 }),
        ]);
      const saveSpy = jest.spyOn(roleService, "save").mockResolvedValue();

      const result = await roleController.create({
        name: roleData.name,
        permissions: [1],
      });

      expect(result).toEqual(Result.single(roleDto));
      expect(createRoleSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(roleData);
    });

    it("should throw conflict exception when given role's name is already existing", async () => {
      jest.spyOn(roleService, "getRoleByName").mockResolvedValue(roleData);
      const createRoleSpy = jest.spyOn(roleService, "createRole");
      const saveRoleSpy = jest.spyOn(roleService, "save");

      await expect(
        roleController.create({
          name: roleData.name,
          permissions: [1, 2],
        }),
      ).rejects.toThrow(ConflictException);
      expect(createRoleSpy).not.toHaveBeenCalled();
      expect(saveRoleSpy).not.toHaveBeenCalled();
    });

    it("should throw unprocessable entity exception when given permission is not found", async () => {
      jest.spyOn(roleService, "getRoleByName").mockResolvedValue(null);
      jest.spyOn(permissionService, "getManyPermissions").mockResolvedValue([]);
      const createRoleSpy = jest.spyOn(roleService, "createRole");
      const saveRoleSpy = jest.spyOn(roleService, "save");

      await expect(
        roleController.create({
          name: roleData.name,
          permissions: [1, 2],
        }),
      ).rejects.toThrow(UnprocessableEntityException);
      expect(createRoleSpy).not.toHaveBeenCalled();
      expect(saveRoleSpy).not.toHaveBeenCalled();
    });
  });

  describe("getMany", () => {
    it("should return paginated result roles", async () => {
      const expectedRoles = [
        roleData,
        new RoleEntity({
          id: 2,
          name: "test1",
          description: "no description",
        }),
      ];
      const limit = 30;
      const page = 1;
      const getManySpy = jest
        .spyOn(roleService, "getPaginatedRoles")
        .mockResolvedValue([expectedRoles, expectedRoles.length]);

      const result = await roleController.getPaginated({
        id: 1,
        offset: page,
        limit,
      });

      const paginateResult = Result.multiple(
        expectedRoles,
        expectedRoles.length,
        {
          limit,
          offset: page,
        },
      );

      expect(result).toStrictEqual(paginateResult);
      expect(getManySpy).toHaveBeenCalledTimes(1);
      expect(result.limit).toEqual(limit);
      expect(result.offset).toEqual(page);
    });
  });

  describe("getOne", () => {
    it("should return single result of role by id", async () => {
      const getOneSpy = jest
        .spyOn(roleService, "getRoleById")
        .mockResolvedValue(roleData);

      const result = await roleController.getOne(1);

      expect(result).toStrictEqual(Result.single(RoleMapper.map(roleData)));
      expect(getOneSpy).toHaveBeenCalledTimes(1);
    });

    it("should return throw not found exception if not found", async () => {
      const getOneSpy = jest
        .spyOn(roleService, "getRoleById")
        .mockResolvedValue(null);

      await expect(roleController.getOne(1)).rejects.toThrow(NotFoundException);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("update", () => {
    it("should return single result of updated role include update data", async () => {
      const updatedUser = new RoleEntity({
        id: 2,
        name: "test1",
        description: "no description",
        permissions: [
          permissionData,
          new PermissionEntity({ id: 2, name: "TEST_2" }),
        ],
      });

      const getRoleNameSpy = jest
        .spyOn(roleService, "getRoleByName")
        .mockResolvedValue(null);
      const getRoleByIdSpy = jest
        .spyOn(roleService, "getRoleById")
        .mockResolvedValue(roleData);
      const getPermissionsSpy = jest
        .spyOn(permissionService, "getManyPermissions")
        .mockResolvedValue([
          permissionData,
          new PermissionEntity({ id: 2, name: "TEST_2" }),
        ]);
      const updateRoleSpy = jest
        .spyOn(roleService, "updateRole")
        .mockReturnValue(updatedUser);
      const saveRoleSpy = jest.spyOn(roleService, "save").mockReturnThis();

      const result = await roleController.update(1, {
        name: "new name",
        description: "no any description",
        permissions: [1, 2],
      });

      expect(result).toStrictEqual(Result.single(RoleMapper.map(updatedUser)));
      expect(getRoleNameSpy).toHaveBeenCalledTimes(1);
      expect(getRoleByIdSpy).toHaveBeenCalledTimes(1);
      expect(getPermissionsSpy).toHaveBeenCalledTimes(1);
      expect(updateRoleSpy).toHaveBeenCalledTimes(1);
      expect(saveRoleSpy).toHaveBeenCalledTimes(1);
    });

    it("should throw an conflict exception if given name already exist ", async () => {
      jest.spyOn(roleService, "getRoleByName").mockResolvedValue(roleData);

      await expect(
        roleController.update(1, {
          name: "new name",
          description: "no any description",
          permissions: [1, 2],
        }),
      ).rejects.toThrow(ConflictException);
    });

    it("should throw not found exception if given role id does not exist", async () => {
      const getRoleNameSpy = jest
        .spyOn(roleService, "getRoleByName")
        .mockResolvedValue(null);
      jest.spyOn(roleService, "getRoleById").mockResolvedValue(null);

      await expect(
        roleController.update(1, {
          name: "new name",
          description: "no any description",
          permissions: [1, 2],
        }),
      ).rejects.toThrow(NotFoundException);
      expect(getRoleNameSpy).toHaveBeenCalledTimes(1);
    });

    it("should throw unprocessable entity if given permissions id does not exist", async () => {
      const getRoleByNameSpy = jest
        .spyOn(roleService, "getRoleByName")
        .mockResolvedValue(null);
      const getRoleByIdSpy = jest
        .spyOn(roleService, "getRoleById")
        .mockResolvedValue(roleData);
      jest.spyOn(permissionService, "getManyPermissions").mockResolvedValue([]);

      await expect(
        roleController.update(1, {
          name: "new name",
          description: "no any description",
          permissions: [1, 2],
        }),
      ).rejects.toThrow(UnprocessableEntityException);
      expect(getRoleByNameSpy).toHaveBeenCalledTimes(1);
      expect(getRoleByIdSpy).toHaveBeenCalledTimes(1);
    });

    it("should throw unprocessable entity if given body contains permissions id does not exist", async () => {
      const getRoleByNameSpy = jest
        .spyOn(roleService, "getRoleByName")
        .mockResolvedValue(null);
      const getRoleByIdSpy = jest
        .spyOn(roleService, "getRoleById")
        .mockResolvedValue(roleData);
      jest
        .spyOn(permissionService, "getManyPermissions")
        .mockResolvedValue([permissionData]);

      await expect(
        roleController.update(1, {
          name: "new name",
          description: "no any description",
          permissions: [1, 2],
        }),
      ).rejects.toThrow(UnprocessableEntityException);
      expect(getRoleByNameSpy).toHaveBeenCalledTimes(1);
      expect(getRoleByIdSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("delete", () => {
    it("should return no content if delete role successfully", async () => {
      const getRoleByIdSpy = jest
        .spyOn(roleService, "getRoleById")
        .mockResolvedValue(roleData);
      const removeRoleSpy = jest
        .spyOn(roleService, "remove")
        .mockImplementation();

      const result = await roleController.delete(1);

      expect(getRoleByIdSpy).toHaveBeenCalledTimes(1);
      expect(removeRoleSpy).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });

    it("should throw not found exception if given role not found", async () => {
      const getOneSpy = jest
        .spyOn(roleService, "getRoleById")
        .mockResolvedValue(null);

      await expect(roleController.getOne(1)).rejects.toThrow(NotFoundException);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
    });
  });
});
