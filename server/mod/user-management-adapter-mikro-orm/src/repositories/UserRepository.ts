import { MikroOrmRepository } from "./MikroOrmRepository.js";

export class UserRepository extends MikroOrmRepository {
  entityName = "users";
}
