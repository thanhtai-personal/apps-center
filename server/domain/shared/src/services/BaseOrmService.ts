import { Thing } from "~/entities/index.js";
import { IRepository, IService } from "@ttt-module/infra";

export abstract class BaseOrmService<T extends Thing> implements IService<T> {
  repository!: IRepository<T>;
}
