import { Casing } from "@ttt/utils";
import { AnyClass, Path, PathValue, Primitive } from "@ttt/utils";

export interface IMapper<
  From extends object,
  To extends object,
  Option extends object | undefined = undefined,
> {
  from: AnyClass<From>;
  to: AnyClass<To>;
  option?: AnyClass<Option>;

  map(
    source: InstanceType<AnyClass<From>>,
    option?: InstanceType<AnyClass<Option>>,
  ): InstanceType<AnyClass<To>>;
  mapArray(
    source: InstanceType<AnyClass<From>>[],
  ): InstanceType<AnyClass<To>>[];
}

export interface IAutoMapper<
  From extends object,
  To extends object,
  Source extends object = From,
> extends IMapper<From, To> {
  beforeMap: (source: InstanceType<AnyClass<From>>) => Source;
  ensure(): this;
}

export interface TargetPropConfig<To> {
  targetValuePath: Path<To>;
  targetType: AnyClass<any> | Primitive;
  isArray?: boolean;
  nullable?: boolean;
}

export interface MapFromProp<From, To, Source = From>
  extends TargetPropConfig<To> {
  sourceValuePath: Path<Source>;
  getPropValue: <T = unknown>(value: PathValue<Source, Path<Source>>) => T;
}

export interface MapCustom<From, To, Source = From>
  extends TargetPropConfig<To> {
  getSourceValue: <T = unknown>(value: Source) => T;
}

export interface MapFromMapper<
  From extends object,
  To extends object,
  Source extends object = From,
> extends TargetPropConfig<To> {
  sourceValuePath: Path<Source>;
  mapper: IAutoMapper<From, To, Source>;
}

export type MapOptions<From, Source> = {
  beforeMap?: (source: From) => Source;
  casing?: { from: Casing; to: Casing };
};

export type PropMapConfig<
  F extends object,
  T extends object,
  S extends object = F,
> = MapFromProp<F, T, S> | MapCustom<F, T, S> | MapFromMapper<F, T, S>;

export type MapConfig<
  From extends object,
  To extends object,
  Source extends object = From,
> = {
  options?: MapOptions<From, Source>;
  propMap: Set<PropMapConfig<From, To, Source>>;
};
