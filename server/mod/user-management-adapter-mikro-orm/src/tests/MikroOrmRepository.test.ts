import { wrap } from "@mikro-orm/core";
import {
  Entity,
  Property,
  RequiredEntityData,
  ThingEntity,
} from "@ttt-module/infra";
import { MikroOrmRepository } from "~/repositories/index.js";

@Entity({ tableName: "users" })
class UserEntity extends ThingEntity {
  @Property({ unique: true })
  email: string;

  @Property({ nullable: true })
  password?: string;

  @Property({ nullable: true })
  firstName?: string;

  @Property({ nullable: true })
  lastName?: string;

  @Property()
  status: string;
}

describe("MikroOrmRepository", () => {
  let ormRepo: MikroOrmRepository;
  let userRepository: MikroOrmRepository<UserEntity>;
  const testEmail1 = "test1@gmail.com";
  const testEmail2 = "test2@gmail.com";
  const userData: RequiredEntityData<UserEntity> = {
    email: testEmail1,
    password: "pass",
    firstName: "test",
    lastName: "test",
    status: "registered",
  };

  beforeAll(async () => {
    const userEntity = new UserEntity();
    ormRepo = new MikroOrmRepository();
    await ormRepo.init({
      dbName: "db_test",
      user: "postgres",
      password: "postgres",
      host: "localhost",
      port: 5000,
      entities: [userEntity.fromtttToMikroOrm()],
    });
    await ormRepo.orm.schema.refreshDatabase();
    userRepository = new MikroOrmRepository<UserEntity>();
    userRepository.em = ormRepo.em.fork();
    userRepository.entityName = userEntity.getName();
  });

  afterAll(async () => {
    await ormRepo.orm.close(true);
    jest.clearAllMocks();
  });

  test("db should be connected", async () => {
    await expect(ormRepo.orm.isConnected()).resolves.toBe(true);
  });

  describe("create", () => {
    it("should return created user data as given data", async () => {
      const createdUser = userRepository.create(userData);
      await userRepository.save(createdUser);
      expect(createdUser).toMatchObject(userData);
    });
  });

  describe("findOne", () => {
    it("should return user data including given email", async () => {
      const user = await userRepository.findOne({ email: userData.email });
      expect(user).toMatchObject(userData);
    });

    it("should return null when given email does not exist", async () => {
      const user = await userRepository.findOne({ email: "other@example.com" });
      expect(user).toBeNull();
    });
  });

  describe("find", () => {
    it("should return user records matching given filter", async () => {
      const users = await userRepository.find({ email: userData.email });
      const hasCreatedUser = users.find((u) => u.email === userData.email);
      expect(hasCreatedUser).toBeTruthy();
    });
  });

  describe("findAndCount", () => {
    it("should return user records & total matching given filter", async () => {
      const newUser = userRepository.create({
        ...userData,
        email: testEmail2,
      });
      await userRepository.save(newUser);

      const [users, total] = await userRepository.findAndCount({
        firstName: "test",
      });

      expect(
        users.every((u) => [userData.email, newUser.email].includes(u.email)),
      ).toBe(true);
      expect(total).toBe(2);
    });
  });

  describe("findAll", () => {
    it("should return all existing user records by given filter", async () => {
      const users = await userRepository.findAll({
        sortBy: ["email:desc"],
      });
      const expectedEmails = [testEmail1, testEmail2].sort((a, b) =>
        b.localeCompare(a),
      );
      expect(users.map((u) => u.email)).toEqual(expectedEmails);
    });
  });

  describe("update", () => {
    it("should update user successfully by given data", async () => {
      const expectedFirstName = "firstName";
      const user = await userRepository.findOne({ email: userData.email });
      if (!user) {
        throw new Error("User not found");
      }

      const updatedUser = userRepository.update(user, {
        firstName: expectedFirstName,
      });
      await userRepository.save(updatedUser);

      await wrap(updatedUser, true).init(true);
      expect(updatedUser.firstName).toBe(expectedFirstName);
    });
  });

  describe("remove", () => {
    it("should remove user successfully", async () => {
      let user = await userRepository.findOne({ email: userData.email });
      if (!user) {
        throw new Error("User not found");
      }

      userRepository.remove(user);
      await userRepository.save();

      user = await userRepository.findOne({ email: userData.email });
      expect(user).toBeFalsy();
    });
  });
});
