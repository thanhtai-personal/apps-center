/* eslint-disable max-lines */
import { ConflictException, NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import {
  Permission as PermissionEntity,
  PermissionService,
} from "@ttt-domain/user-management";
import { IRepository, Loaded } from "@ttt-module/infra";
import { Result } from "@ttt-module/nestjs-utils";
import { PermissionController } from "~/controllers";
import { PermissionMapper } from "~/mappers";

class MockPermissionRepository implements IRepository<PermissionEntity> {
  init(): Promise<void> {
    throw new Error("Not implemented");
  }
  create = (): PermissionEntity => {
    throw new Error("Not implemented");
  };

  find = (): Promise<Loaded<PermissionEntity>[]> => {
    throw new Error("Not implemented");
  };

  findAll = (): Promise<Loaded<PermissionEntity>[]> => {
    throw new Error("Not implemented");
  };

  findOne = (): Promise<Loaded<PermissionEntity> | null> => {
    throw new Error("Not implemented");
  };

  findAndCount = (): Promise<[Loaded<PermissionEntity>[], number]> => {
    throw new Error("Not implemented");
  };

  update = (): PermissionEntity => {
    throw new Error("Not implemented");
  };

  remove = (): void => {
    throw new Error("Not implemented");
  };

  save = (): Promise<void> => {
    throw new Error("Not implemented");
  };
}

describe("PermissionController", () => {
  let permissionController: PermissionController;
  let permissionService: PermissionService;
  let permissionData: PermissionEntity;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: "IRepository",
          useClass: MockPermissionRepository,
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
        PermissionService,
      ],
      controllers: [PermissionController],
    }).compile();
    permissionController =
      moduleRef.get<PermissionController>(PermissionController);
    permissionService = moduleRef.get<PermissionService>(PermissionService);

    permissionData = new PermissionEntity({
      id: 1,
      name: "TEST_PERMISSION",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getOne", () => {
    it("should return single result of permission", async () => {
      const getOneSpy = jest
        .spyOn(permissionService, "getPermissionById")
        .mockResolvedValue(permissionData);

      const result = await permissionController.getOne(1);

      expect(result).toStrictEqual(
        Result.single(PermissionMapper.map(permissionData)),
      );
      expect(getOneSpy).toHaveBeenCalledTimes(1);
    });

    it("should return throw not found exception if not found", async () => {
      const getOneSpy = jest
        .spyOn(permissionService, "getPermissionById")
        .mockResolvedValue(null);

      await expect(permissionController.getOne(1)).rejects.toThrow(
        NotFoundException,
      );
      expect(getOneSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe("getPaginated", () => {
    it("should return paginated result of permissions", async () => {
      const expectedPermissions = [
        permissionData,
        new PermissionEntity({
          id: 2,
          name: "test1",
          description: "no description",
        }),
      ];
      const limit = 30;
      const page = 1;
      const getManySpy = jest
        .spyOn(permissionService, "getPaginatedPermissions")
        .mockResolvedValue([expectedPermissions, expectedPermissions.length]);

      const result = await permissionController.getPaginated({
        id: 1,
        offset: page,
        limit,
      });

      const paginateResult = Result.multiple(
        expectedPermissions,
        expectedPermissions.length,
        {
          limit,
          offset: page,
        },
      );

      expect(result).toEqual(paginateResult);
      expect(getManySpy).toHaveBeenCalledTimes(1);
      expect(result.limit).toEqual(limit);
      expect(result.offset).toEqual(page);
    });
  });
  describe("create", () => {
    it("should return single result of permission when created  success", async () => {
      const getPermissionNameSpy = jest
        .spyOn(permissionService, "getPermissionByName")
        .mockResolvedValue(null);
      const createPermissionSpy = jest
        .spyOn(permissionService, "createPermission")
        .mockReturnValue(permissionData);
      const saveSpy = jest
        .spyOn(permissionService, "save")
        .mockImplementation();

      const result = await permissionController.create({
        name: "NEW_PERMISSION",
        description: "empty description",
      });
      expect(result).toStrictEqual(
        Result.single(PermissionMapper.map(permissionData)),
      );
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(getPermissionNameSpy).toHaveBeenCalledTimes(1);
      expect(createPermissionSpy).toHaveBeenCalledTimes(1);
    });
    it("should throw conflict exception when given permission is already exists", async () => {
      jest
        .spyOn(permissionService, "getPermissionByName")
        .mockResolvedValue(permissionData);
      const createPermissionSpy = jest
        .spyOn(permissionService, "createPermission")
        .mockImplementation();
      const saveSpy = jest
        .spyOn(permissionService, "save")
        .mockImplementation();

      await expect(
        permissionController.create({
          name: "NEW_PERMISSION",
          description: "empty description",
        }),
      ).rejects.toThrow(ConflictException);
      expect(saveSpy).not.toHaveBeenCalled();
      expect(createPermissionSpy).not.toHaveBeenCalled();
    });
  });
  describe("update", () => {
    it("should return single result of permission when created successfully", async () => {
      const getPermissionByIdSpy = jest
        .spyOn(permissionService, "getPermissionById")
        .mockResolvedValue(permissionData);
      const getPermissionByNameSpy = jest
        .spyOn(permissionService, "getPermissionByName")
        .mockResolvedValue(null);
      const updateSpy = jest
        .spyOn(permissionService, "updatePermission")
        .mockReturnValue(permissionData);
      const saveSpy = jest
        .spyOn(permissionService, "save")
        .mockImplementation();

      const result = await permissionController.update(1, {
        name: "NEW_NAME",
        description: "empty",
      });
      expect(result).toStrictEqual(
        Result.single(PermissionMapper.map(permissionData)),
      );
      expect(getPermissionByNameSpy).toHaveBeenCalledTimes(1);
      expect(getPermissionByIdSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
    it("should throw not found exception if given permission id does not exist", async () => {
      jest
        .spyOn(permissionService, "getPermissionById")
        .mockResolvedValue(null);
      jest
        .spyOn(permissionService, "getPermissionByName")
        .mockResolvedValue(permissionData);
      const updateSpy = jest
        .spyOn(permissionService, "updatePermission")
        .mockImplementation();
      const saveSpy = jest
        .spyOn(permissionService, "save")
        .mockImplementation();

      await expect(
        permissionController.update(1, {
          name: "NEW_NAME",
          description: "empty",
        }),
      ).rejects.toThrow(NotFoundException);
      expect(updateSpy).not.toHaveBeenCalled();
      expect(saveSpy).not.toHaveBeenCalled();
    });
    it("should throw conflict exception if given permission is already in use", async () => {
      jest
        .spyOn(permissionService, "getPermissionById")
        .mockResolvedValue(permissionData);
      jest
        .spyOn(permissionService, "getPermissionByName")
        .mockResolvedValue(permissionData);
      const updateSpy = jest
        .spyOn(permissionService, "updatePermission")
        .mockImplementation();
      const saveSpy = jest
        .spyOn(permissionService, "save")
        .mockImplementation();

      await expect(
        permissionController.update(1, {
          name: "NEW_NAME",
          description: "empty",
        }),
      ).rejects.toThrow(ConflictException);
      expect(updateSpy).not.toHaveBeenCalled();
      expect(saveSpy).not.toHaveBeenCalled();
    });
  });
  describe("delete", () => {
    it("should return result empty when delete permission successfully", async () => {
      const getByIdSpy = jest
        .spyOn(permissionService, "getPermissionById")
        .mockResolvedValue(permissionData);
      const removeSpy = jest
        .spyOn(permissionService, "remove")
        .mockImplementation();
      const saveSpy = jest
        .spyOn(permissionService, "save")
        .mockImplementation();

      const result = await permissionController.delete(1);

      expect(result).toBe(Result.empty());
      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(removeSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });

    it("should throw not found exception when given permission not found", async () => {
      jest
        .spyOn(permissionService, "getPermissionById")
        .mockResolvedValue(null);
      const removeSpy = jest
        .spyOn(permissionService, "remove")
        .mockImplementation();
      const saveSpy = jest
        .spyOn(permissionService, "save")
        .mockImplementation();

      await expect(permissionController.delete(1)).rejects.toThrow(
        NotFoundException,
      );
      expect(removeSpy).not.toHaveBeenCalled();
      expect(saveSpy).not.toHaveBeenCalled();
    });
  });
});
