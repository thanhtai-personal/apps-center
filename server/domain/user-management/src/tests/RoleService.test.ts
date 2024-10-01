import { INonPagingQuery } from "@ttt-domain/shared";
import { IRepository, ISearchQuery, Loaded } from "@ttt-module/infra";
import { RoleCreate, RoleFilter, RoleUpdate } from "~/dtos";
import { Role } from "~/entities";
import { RoleService } from "~/services";

class MockRoleRepository implements IRepository<Role> {
  init(): Promise<void> {
    throw new Error("Not implemented");
  }
  create = (): Role => {
    throw new Error("Not implemented");
  };

  find = (): Promise<Loaded<Role>[]> => {
    throw new Error("Not implemented");
  };

  findAll = (): Promise<Loaded<Role>[]> => {
    throw new Error("Not implemented");
  };

  findOne = (): Promise<Loaded<Role> | null> => {
    throw new Error("Not implemented");
  };

  findAndCount = (): Promise<[Loaded<Role>[], number]> => {
    throw new Error("Not implemented");
  };

  update = (): Role => {
    throw new Error("Not implemented");
  };

  remove = (): void => {
    throw new Error("Not implemented");
  };

  save = (): Promise<void> => {
    throw new Error("Not implemented");
  };
}

describe("RoleService", () => {
  const roleRepository = new MockRoleRepository();
  let roleService: RoleService;
  let roleId: number;
  let roleEntity: Role;
  let roles: Role[];

  beforeEach(() => {
    roleId = 1;
    roleService = new RoleService();
    roleService.repository = roleRepository;
    roleEntity = new Role({
      id: roleId,
      name: "user",
      permissions: [],
    });

    roles = [
      new Role({
        id: 1,
        name: "user",
      }),
      new Role({
        id: 2,
        name: "admin",
      }),
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createRole", () => {
    it("should return created role", () => {
      jest.spyOn(roleService, "createRole").mockReturnValue(roleEntity);
      const createPayload: RoleCreate = {
        name: "New Role",
        permissions: [],
      };
      jest
        .spyOn(roleRepository, "create")
        .mockReturnValue(new Role({ ...createPayload, id: 2 }));

      const result = roleService.createRole(createPayload);
      expect(result).toEqual(roleEntity);
    });
  });

  describe("getById", () => {
    it("should return role data by given role id", async () => {
      jest
        .spyOn(roleRepository, "findOne")
        .mockResolvedValue(roleEntity as Loaded<Role>);
      const result = await roleService.getRoleById(roleId);

      expect(result).toEqual(roleEntity);
      expect(roleRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it("should return null when given role id is not found", async () => {
      jest.spyOn(roleRepository, "findOne").mockResolvedValue(null);
      const result = await roleService.getRoleById(roleId);

      expect(result).toBeNull();
      expect(roleRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateRole", () => {
    it("should return update role data match update data", () => {
      const updateRolePayload: RoleUpdate = {
        name: "Updated role",
        description: "empty description",
        permissions: [],
      };
      jest
        .spyOn(roleRepository, "update")
        .mockReturnValue(new Role({ ...roleEntity, ...updateRolePayload }));

      const result = roleService.updateRole(roleEntity, updateRolePayload);
      expect(result).toMatchObject(updateRolePayload);
    });
  });

  describe("getPaginatedRoles", () => {
    it("should return roles by given filter & pagination options", async () => {
      const sampleFilterParams: ISearchQuery<RoleFilter> = {
        paging: {
          offset: 1,
          limit: 30,
        },
        filter: {
          id: 1,
        },
      };

      jest
        .spyOn(roleRepository, "findAndCount")
        .mockResolvedValue([roles as Loaded<Role>[], 1000]); // 1000 is total records of role in database

      const result = await roleService.getPaginatedRoles(sampleFilterParams);

      expect(result[0]).toEqual(roles);
      expect(result[1]).toEqual(1000);
      expect(roleRepository.findAndCount).toHaveBeenCalledTimes(1);
    });
  });
  describe("getManyRoles", () => {
    it("should return roles by given filter options", async () => {
      const mockReturnList: Role[] = [roleEntity, roleEntity, roleEntity];

      jest
        .spyOn(roleRepository, "find")
        .mockResolvedValue(mockReturnList as Loaded<Role>[]);
      const sampleFilterParams: INonPagingQuery<RoleFilter> = {
        filter: {
          id: 1,
        },
        sortBy: ["id:asc"],
      };
      await expect(
        roleService.getManyRoles(sampleFilterParams),
      ).resolves.toStrictEqual(mockReturnList);
    });
  });

  describe("isRolesExist", () => {
    it("should return false if found non-exist item", () => {
      expect(roleService.isRolesExist(roles, [1, 3])).toBe(false);
    });
    it("should return true if body match given roles entity", () => {
      expect(roleService.isRolesExist(roles, [1, 2])).toBe(true);
    });
    it("should return true if given body is empty", () => {
      expect(roleService.isRolesExist(roles, [])).toBe(true);
    });
  });
});
