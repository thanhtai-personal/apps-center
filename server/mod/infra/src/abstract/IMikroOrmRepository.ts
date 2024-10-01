import { IMikroOrmConfig } from "./IMikroOrmConfig.js";
import { IRepository } from "./IRepository.js";

export interface IMikroOrmRepository<
  Entity extends object = object,
  EntityName = any,
  EntityManager = any,
  ORM = any,
> extends IRepository<Entity, IMikroOrmConfig> {
  entityName: EntityName;
  em: EntityManager;
  orm: ORM;
}
