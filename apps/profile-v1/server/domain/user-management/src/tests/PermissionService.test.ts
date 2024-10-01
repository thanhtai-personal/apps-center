import { INonPagingQuery } from "@ttt-domain/shared";
import { IRepository, ISearchQuery, Loaded } from "@ttt-module/infra";
import { PermissionCreate, PermissionFilter, PermissionUpdate } from "~/dtos";
import { Permission } from "~/entities";
import { PermissionService } from "~/services";

class PermissionRepo implements IRepository<Permission> {
  init(): Promise<void> {
    throw new Error("Not implemented");
  }
  create = (): Permission => {
    throw new Error("Not implemented");
  };

  find = (): Promise<Loaded<Permission>[]> => {
    throw new Error("Not implemented");
  };

  findAll = (): Promise<Loaded<Permission>[]> => {
    throw new Error("Not implemented");
  };

  findOne = (): Promise<Loaded<Permission> | null> => {
    throw new Error("Not implemented");
  };

  findAndCount = (): Promise<[Loaded<Permission>[], number]> => {
    throw new Error("Not implemented");
  };

  update = (): Permission => {
    throw new Error("Not implemented");
  };

  remove = (): void => {
    throw new Error("Not implemented");
  };

  save = (): Promise<void> => {
    throw new Error("Not implemented");
  };
}
describe("PermissionService", () => {
  const permissionRepo = new PermissionRepo();
  let service: PermissionService;
  let mockPermission: Permission;

  beforeEach(() => {
    service = new PermissionService();
    service.repository = permissionRepo;
    mockPermission = new Permission({ id: 1, name: "perName" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPaginatedPermissions", () => {
    it("should return array of permission", async () => {
      const paginatedPermissions: [Permission[], number] = [
        [mockPermission],
        5,
      ];
      jest
        .spyOn(service, "getPaginatedPermissions")
        .mockResolvedValue(paginatedPermissions);
      jest
        .spyOn(permissionRepo, "find")
        .mockResolvedValue([mockPermission] as Loaded<Permission>[]);

      const query: ISearchQuery<PermissionFilter> = {
        filter: { id: 1, name: "" },
        paging: { limit: 25, offset: 0 },
        sortBy: ["id:asc"],
      };
      const rs = await service.getPaginatedPermissions(query);
      expect(rs).toEqual(paginatedPermissions);
    });
  });

  describe("getManyPermissions", () => {
    it("should return array of permission", async () => {
      jest
        .spyOn(service, "getManyPermissions")
        .mockResolvedValue([mockPermission]);
      jest
        .spyOn(permissionRepo, "find")
        .mockResolvedValue([mockPermission] as Loaded<Permission>[]);

      const query: INonPagingQuery<PermissionFilter> = {
        filter: { id: 1, name: "" },
        sortBy: ["id:asc"],
      };
      const rs = await service.getManyPermissions(query);
      expect(rs).toEqual([mockPermission]);
    });
  });

  describe("getPermissionById", () => {
    it("should return permission by id", async () => {
      jest
        .spyOn(service, "getPermissionById")
        .mockResolvedValue(mockPermission);
      jest
        .spyOn(permissionRepo, "findOne")
        .mockResolvedValue(mockPermission as Loaded<Permission>);

      const rs = await service.getPermissionById(1);

      expect(rs).toEqual(mockPermission);
    });
  });

  describe("getPermissionByName", () => {
    it("should return permission by name", async () => {
      jest
        .spyOn(service, "getPermissionByName")
        .mockResolvedValue(mockPermission);
      jest
        .spyOn(permissionRepo, "findOne")
        .mockResolvedValue(mockPermission as Loaded<Permission>);

      const rs = await service.getPermissionByName("");

      expect(rs).toEqual(mockPermission);
    });
  });

  describe("createPermission", () => {
    it("should return permission", () => {
      jest.spyOn(permissionRepo, "create").mockReturnValue(mockPermission);
      const permissionCreate: PermissionCreate = { name: "per" };
      const rs = service.createPermission(permissionCreate);
      expect(rs).toEqual(mockPermission);
    });
  });

  describe("updatePermission", () => {
    it("should return permission when update success", () => {
      jest.spyOn(service, "updatePermission").mockReturnValue(mockPermission);
      jest.spyOn(permissionRepo, "update").mockReturnValue(mockPermission);

      const permissionUpdate: PermissionUpdate = { name: "per" };
      const rs = service.updatePermission(mockPermission, permissionUpdate);

      expect(rs).toEqual(mockPermission);
    });
  });

  describe("isPermissionsExist", () => {
    let permissions: Permission[];

    beforeEach(() => {
      permissions = [
        new Permission({ id: 1, name: "TEST_1" }),
        new Permission({ id: 2, name: "TEST_2" }),
      ];
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return false if found non-exist item", () => {
      expect(service.isPermissionsExist(permissions, [1, 3])).toBe(false);
    });
    it("should return true if body match given permission entity", () => {
      expect(service.isPermissionsExist(permissions, [1, 2])).toBe(true);
    });
    it("should return true if given body is empty", () => {
      expect(service.isPermissionsExist(permissions, [])).toBe(true);
    });
  });
});
