import {
  AnyClass,
  Path,
  PathValue,
  ensure,
  getVal,
  isClass,
  isNil,
  setVal,
} from "@ttt/utils";
import { BaseMapper } from "./BaseMapper.js";
import { isCustomMap, isMapperMap, mapConfig } from "./const.js";
import { IAutoMapper, MapConfig, PropMapConfig } from "./interfaces.js";

export class AutoMapper<
    From extends object,
    To extends object,
    Source extends object = From,
  >
  extends BaseMapper<From, To>
  implements IAutoMapper<From, To, Source>
{
  protected config: MapConfig<From, To, Source> | undefined;

  beforeMap = (source: InstanceType<AnyClass<From>>) =>
    source as unknown as Source;

  ensure() {
    const fromName = this.from.name;
    const toName = this.to.name;
    const keyName = `${fromName}->${toName}`;
    const mapper = mapConfig.get(keyName) as MapConfig<From, To, Source>;

    this.config = mapper;

    ensure(
      mapper,
      `Auto-map from ${fromName} to ${toName} is not initialized.`,
    );

    if (mapper.options?.beforeMap) {
      this.beforeMap = mapper.options.beforeMap.bind(this);
    }

    return this;
  }

  map(source: InstanceType<AnyClass<From>>) {
    const dest = isClass(this.to) ? new this.to() : this.to;

    const usingSource = this.beforeMap(source);

    this.config?.propMap.forEach((item: PropMapConfig<From, To, Source>) => {
      setVal(dest, item.targetValuePath, this.getValue(item, usingSource));
    });
    return dest;
  }

  protected getValue(
    item: PropMapConfig<From, To, Source>,
    source: Source,
  ): any {
    if (isCustomMap(item)) {
      return item.getSourceValue(source);
    }

    const original = getVal(source, item.sourceValuePath) as any;
    if (isNil(original) && item.nullable) {
      return;
    } else {
      ensure(original, `Value of ${item.sourceValuePath} is undefined.`);
    }

    if (item.isArray && !Array.isArray(original)) {
      return;
    }

    if (isMapperMap(item)) {
      return Array.isArray(original)
        ? item.mapper.mapArray(original as From[])
        : item.mapper.map(original as From);
    }

    return item.isArray
      ? original.map((single: PathValue<Source, Path<Source>>) =>
          item.getPropValue(single),
        )
      : item.getPropValue(original as PathValue<Source, Path<Source>>);
  }
}
