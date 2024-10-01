import { AnyClass } from "@ttt/utils";
import { IMapper } from "./interfaces.js";

interface IEntityMapperOptions {
  [key: string]: any;
}
export abstract class BaseMapper<
  From extends object,
  To extends object,
  Options extends IEntityMapperOptions | undefined = undefined,
> implements IMapper<From, To, Options>
{
  constructor(
    public from: AnyClass<From>,
    public to: AnyClass<To>,
  ) {}

  abstract map(
    source: InstanceType<AnyClass<From>>,
    options?: Options,
  ): InstanceType<AnyClass<To>>;

  mapArray(source: InstanceType<AnyClass<From>>[]) {
    return source.map((item) => this.map(item));
  }
}
