import { IRepository } from "./IRepository.js";

export interface IService<T = any> {
  repository?: IRepository<T>;
}
