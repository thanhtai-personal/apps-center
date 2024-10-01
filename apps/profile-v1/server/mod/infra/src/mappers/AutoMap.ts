import { AnyClass, Path, PathValue, isPrimitiveType } from "@ttt/utils";
import { AutoMapper } from "./AutoMapper.js";
import { mapConfig } from "./const.js";
import {
  IAutoMapper,
  MapOptions,
  PropMapConfig,
  TargetPropConfig,
} from "./interfaces.js";
import "reflect-metadata";

const key = Symbol.for("mapper:props");

export function AutoMap<
  From extends object,
  To extends object,
  Source extends object = From,
>(from: AnyClass<From>, options?: MapOptions<From, Source>) {
  type MapValueOptions<K extends Path<Source>> = {
    parse?: (value: PathValue<Source, K>) => unknown;
    isArray?: boolean;
    type?: AnyClass<any>;
    useMapper?: IAutoMapper<any, any>;
    nullable?: boolean;
  };
  function MapValue<K extends Path<Source>>(
    property?: K,
    valueOptions?: MapValueOptions<K>,
  ): PropertyDecorator;
  function MapValue(getValue: (source: Source) => any): PropertyDecorator;
  function MapValue<K extends Path<Source>>(
    property?: K | (<T>(source: Source) => T),
    valueOptions?: MapValueOptions<K>,
  ): PropertyDecorator {
    return (target, propertyKey) => {
      if (!Reflect.hasMetadata(key, target.constructor)) {
        Reflect.defineMetadata(key, new Set(), target.constructor);
      }

      const guessType =
        valueOptions?.type ||
        Reflect.getMetadata("design:type", target, propertyKey);

      const targetType = !isPrimitiveType(guessType) ? guessType : undefined;

      const metadata: TargetPropConfig<To> = {
        targetValuePath: propertyKey as Path<To>,
        targetType,
        isArray: valueOptions?.isArray,
        nullable: valueOptions?.nullable,
      };
      const sourceValuePath = (property?.toString() ??
        propertyKey.toString()) as Path<Source>;

      if (typeof property === "function") {
        (
          Reflect.getMetadata(key, target.constructor) as Set<
            PropMapConfig<From, To, Source>
          >
        ).add({
          ...metadata,
          getSourceValue: (value) => property(value),
        });
        return;
      }

      if (valueOptions?.useMapper || (!valueOptions?.parse && targetType)) {
        const mapper =
          valueOptions?.useMapper ||
          new AutoMapper(from, targetType as AnyClass<any>);
        (
          Reflect.getMetadata(key, target.constructor) as Set<
            PropMapConfig<From, To, Source>
          >
        ).add({
          ...metadata,
          mapper,
          sourceValuePath,
        });
      } else {
        (
          Reflect.getMetadata(key, target.constructor) as Set<
            PropMapConfig<From, To, Source>
          >
        ).add({
          ...metadata,
          sourceValuePath,
          getPropValue: <T = unknown>(
            value: PathValue<Source, Path<Source>>,
          ): T => {
            return (valueOptions?.parse?.(value as PathValue<Source, K>) ??
              value) as T;
          },
        });
      }
    };
  }

  function MapTarget(): ClassDecorator {
    return (target) => {
      const keyName = `${from.name}->${target.name}`;
      if (!mapConfig.has(keyName)) {
        mapConfig.set(keyName, {
          options: options as any,
          propMap: new Set(),
        });
      }

      for (const item of Reflect.getMetadata(key, target) as Set<
        PropMapConfig<never, never>
      >) {
        mapConfig.get(keyName)?.propMap.add(item as never);
      }

      return target;
    };
  }

  return { MapValue, MapTarget };
}
