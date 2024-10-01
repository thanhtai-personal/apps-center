import { MikroOrmRepository } from "./MikroOrmRepository.js";

export class PermissionRepository extends MikroOrmRepository {
  entityName = "permissions";
}
