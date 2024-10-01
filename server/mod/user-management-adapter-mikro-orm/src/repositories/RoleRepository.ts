import { MikroOrmRepository } from "./MikroOrmRepository.js";

export class RoleRepository extends MikroOrmRepository {
  entityName = "roles";
}
