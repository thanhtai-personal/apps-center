/* eslint-disable max-lines */

import { INonPagingQuery } from "@ttt-domain/shared";
import { IRepository, ISearchQuery, Loaded } from "@ttt-module/infra";
import { UserCreate, UserFilter, UserPropertyUpdate } from "~/dtos";
import { Role, User } from "~/entities";
import { EmailAlreadyInUseException } from "~/exceptions";
import { UserService } from "~/services";

class MockUserRepository implements IRepository<User> {
  init(): Promise<void> {
    throw new Error("Not implemented");
  }
  create = (): User => {
    throw new Error("Not implemented");
  };

  find = (): Promise<Loaded<User>[]> => {
    throw new Error("Not implemented");
  };

  findAll = (): Promise<Loaded<User>[]> => {
    throw new Error("Not implemented");
  };

  findOne = (): Promise<Loaded<User> | null> => {
    throw new Error("Not implemented");
  };

  findAndCount = (): Promise<[Loaded<User>[], number]> => {
    throw new Error("Not implemented");
  };

  update = (): User => {
    throw new Error("Not implemented");
  };

  remove = (): void => {
    throw new Error("Not implemented");
  };

  save = (): Promise<void> => {
    throw new Error("Not implemented");
  };
}

describe("UserService", () => {
  const userRepository = new MockUserRepository();
  let userService: UserService;
  let userEntity: User;
  let userId: number;
  let validEmail: string;
  let validPassword: string;

  beforeEach(() => {
    userService = new UserService();
    userService.repository = userRepository;
    userId = 123;
    validEmail = "example@email.example";
    userEntity = new User({
      id: 1,
      email: validEmail,
      password: validPassword,
      firstName: "john",
      lastName: "doe",
      status: "registered",
      roles: [],
      permissions: [],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getById", () => {
    it("should return user data by userId", async () => {
      jest
        .spyOn(userRepository, "findOne")
        .mockResolvedValue(userEntity as Loaded<User>);

      const foundedUser = await userService.getById(userId);

      expect(foundedUser).toEqual(userEntity);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it("should return null when given userId not found", async () => {
      jest.spyOn(userRepository, "findOne").mockResolvedValue(null);

      const foundedUser = await userService.getById(userId);

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(foundedUser).toBeNull();
    });
  });

  describe("getByEmail", () => {
    it("should return user data by email", async () => {
      jest
        .spyOn(userRepository, "findOne")
        .mockResolvedValue(userEntity as Loaded<User>);

      const result = await userService.getByEmail(validEmail);

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(userEntity);
    });

    it("should return null when given email not found", async () => {
      jest.spyOn(userRepository, "findOne").mockResolvedValue(null);

      const result = await userService.getByEmail(validEmail);

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("should return new user when create user successfully", async () => {
      const userCreatePayload: UserCreate = {
        email: validEmail,
        password: validPassword,
        firstName: "john",
        lastName: "doe",
        status: "registered",
        roles: [],
      };
      jest.spyOn(userService, "getByEmail").mockResolvedValue(null);
      jest.spyOn(userRepository, "create").mockReturnValue(userEntity);

      const createdUser = await userService.createUser(userCreatePayload);

      expect(createdUser).toMatchObject(userCreatePayload);
      expect(createdUser).toEqual(userEntity);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
    });

    it(`should return new user with status is registered when create user successfully`, async () => {
      const userCreatePayload: UserCreate = {
        email: validEmail,
        password: validPassword,
        firstName: "john",
        lastName: "doe",
        status: "invited",
        roles: [],
      };
      jest.spyOn(userRepository, "findOne").mockResolvedValue(null);
      jest.spyOn(userRepository, "create").mockReturnValue(userEntity);

      const createdUser = await userService.createUser(userCreatePayload);

      expect(createdUser.status).toBe("registered");
      expect(userRepository.create).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when given email already in use", async () => {
      const userCreatePayload: UserCreate = {
        email: validEmail,
        password: validPassword,
        firstName: "john",
        lastName: "doe",
        status: "invited",
        roles: [],
      };
      jest.spyOn(userService, "getByEmail").mockResolvedValue(userEntity);

      await expect(userService.createUser(userCreatePayload)).rejects.toThrow(
        EmailAlreadyInUseException,
      );
      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("getPaginateUser", () => {
    it("should return a pagination users with given offset and limit", async () => {
      const sampleFilterParams: ISearchQuery<UserFilter> = {
        paging: {
          offset: 1,
          limit: 30,
        },
        filter: {
          id: 1,
        },
      };
      const mockReturnList: [User[], number] = [
        [userEntity, userEntity, userEntity],
        3,
      ];

      jest
        .spyOn(userRepository, "findAndCount")
        .mockResolvedValue(mockReturnList as [Loaded<User>[], number]); //1000 is total user records in db

      const result = await userService.getPaginatedUsers(sampleFilterParams);

      expect(result).toEqual(mockReturnList);
      expect(userRepository.findAndCount).toHaveBeenCalledTimes(1);
    });
  });

  describe("getManyUser", () => {
    it("should return users by given find options", async () => {
      const mockReturnList: User[] = [userEntity, userEntity, userEntity];

      jest
        .spyOn(userRepository, "find")
        .mockResolvedValue(mockReturnList as Loaded<User>[]);
      const sampleFilterParams: INonPagingQuery<UserFilter> = {
        filter: {
          id: 1,
        },
        sortBy: ["id:asc"],
      };
      await expect(
        userService.getManyUsers(sampleFilterParams),
      ).resolves.toStrictEqual(mockReturnList);
    });
  });

  describe("updateRoles", () => {
    it("should return an updated user that includes the role value in the payload", () => {
      const roleUpdate = new Role({
        id: 1,
        name: "admin",
        permissions: [],
      });

      const rolesUpdate = [roleUpdate];

      jest.spyOn(userRepository, "update").mockReturnValue(userEntity);

      const updatedUser = userService.updateRoles(userEntity, rolesUpdate);
      expect(updatedUser.roles).toEqual(userEntity.roles);
      expect(userRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateEmail", () => {
    it("should return user with email property has been updated", async () => {
      jest.spyOn(userService, "getByEmail").mockResolvedValue(null);
      jest.spyOn(userRepository, "update").mockReturnValue(userEntity);

      await expect(
        userService.updateUser(userEntity, {
          email: "example@sample.co",
          firstName: "john",
          lastName: "doe",
          password: "123@aA",
          phoneNumber: "123",
        }),
      ).resolves.toEqual(userEntity);
      expect(userRepository.update).toHaveBeenCalledTimes(1);
    });

    it("should throw error if user attempting to update email which already in use", async () => {
      jest.spyOn(userRepository, "update").mockReturnValue(userEntity);
      jest.spyOn(userService, "getByEmail").mockResolvedValue(userEntity);

      await expect(
        userService.updateUser(userEntity, {
          email: "example@sample.co",
          firstName: "john",
          lastName: "doe",
          password: "123@aA",
          phoneNumber: "123",
        }),
      ).rejects.toThrow(EmailAlreadyInUseException);
      expect(userRepository.update).not.toHaveBeenCalled();
    });
  });

  describe("updateProperty", () => {
    it("should return user with updated given property", async () => {
      const propertyToUpdate: UserPropertyUpdate = {
        property: "email",
        value: validEmail,
      };
      const mockReturn = new User({
        ...userEntity,
        [propertyToUpdate.property]: propertyToUpdate.value,
      });
      jest.spyOn(userService, "getByEmail").mockResolvedValue(null);
      jest.spyOn(userRepository, "update").mockReturnValue(mockReturn);

      const result = await userService.updateUserProperty(
        userEntity,
        propertyToUpdate,
      );

      expect(result[propertyToUpdate.property]).toBe(propertyToUpdate.value);
      expect(userRepository.update).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when user attempting to update existing email", async () => {
      const propertyToUpdate: UserPropertyUpdate = {
        property: "email",
        value: validEmail,
      };
      jest.spyOn(userService, "getByEmail").mockResolvedValue(userEntity);

      await expect(
        userService.updateUserProperty(userEntity, propertyToUpdate),
      ).rejects.toThrow(EmailAlreadyInUseException);
    });
  });
});
