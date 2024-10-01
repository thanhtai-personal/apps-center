import { AnyClass, Primitive, removeUndefined } from "@ttt/utils";
import "reflect-metadata";
import { BaseEntity } from "~/abstract/index.js";

export interface IEntityOptions {
  tableName: string;
}

export type PropertyType =
  | "integer"
  | "double"
  | "string"
  | "Date"
  | "boolean"
  | "json";

export interface IPropertyOptions {
  type?: PropertyType;
  nullable?: boolean;
  primary?: boolean;
  autoincrement?: boolean;
  unique?: boolean;
  default?: any;
  onCreate?: () => Primitive | Date;
  onUpdate?: () => Primitive | Date;
}

export interface IManyToManyOptions {
  entity: () => AnyClass<BaseEntity>;
  mappedBy: string;
  owner?: boolean;
  nullable?: boolean;
}

export enum EntityRelationship {
  ManyToMany = "many_to_many",
  ManyToOne = "many_to_one",
  OneToOne = "one_to_one",
  OneToMany = "one_to_many",
}

export type AllPropertyOptions = IPropertyOptions &
  IManyToManyOptions & { relationship?: EntityRelationship };

export type MikroOrmEntityRelationship = "1:1" | "1:m" | "m:1" | "m:n";

export interface IMikroOrmPropertyOptions {
  type?: string;
  nullable?: boolean;
  primary?: boolean;
  autoincrement?: boolean;
  unique?: boolean;
  default?: any;
  onCreate?: () => Primitive | Date;
  onUpdate?: () => Primitive | Date;
  entity?: string | AnyClass;
  mappedBy?: string;
  owner?: boolean;
  reference?: MikroOrmEntityRelationship;
}

export const mikroOrmRelationshipMapper: Record<
  EntityRelationship,
  MikroOrmEntityRelationship
> = {
  [EntityRelationship.ManyToMany]: "m:n",
  [EntityRelationship.ManyToOne]: "m:1",
  [EntityRelationship.OneToOne]: "1:1",
  [EntityRelationship.OneToMany]: "1:m",
};

const key = Symbol.for("entity:props");

export function Entity(options?: IEntityOptions): ClassDecorator {
  return function (target) {
    // Retrieve existing metadata or initialize an empty object
    const propsMetadata = (Reflect.getMetadata(
      key,
      target.prototype as object,
    ) || {}) as Record<string, AllPropertyOptions>;

    // Define metadata for properties under the constructor's prototype
    Reflect.defineMetadata(key, propsMetadata, target.prototype as object);

    const methods = target.prototype as BaseEntity;

    methods.getName = function () {
      return options?.tableName ?? target.name;
    };

    methods.fromtttToMikroOrm = function () {
      // Generate Mikro ORM entity JSON schema (ref: https://mikro-orm.io/docs/5.9/entity-schema)
      const properties: Record<string, IMikroOrmPropertyOptions> = {};
      for (const [prop, propOptions] of Object.entries(propsMetadata)) {
        properties[prop] = removeUndefined<IMikroOrmPropertyOptions>({
          ...propOptions,
          type: propOptions.type ?? "string",
          reference: propOptions.relationship
            ? mikroOrmRelationshipMapper[propOptions.relationship]
            : undefined,
          entity: propOptions.entity && new (propOptions.entity())().getName(),
        });
      }
      return {
        name: methods.getName(),
        properties,
      };
    };
    return target;
  };
}

export function Property(options?: IPropertyOptions): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol) {
    Reflect.defineMetadata(
      key,
      {
        ...(Reflect.getMetadata(key, target) || {}),
        [propertyKey]: { ...options } as AllPropertyOptions,
      },
      target,
    );
  };
}

export function ManyToMany(options: IManyToManyOptions): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol) {
    Reflect.defineMetadata(
      key,
      {
        ...(Reflect.getMetadata(key, target) || {}),
        [propertyKey]: {
          ...options,
          relationship: EntityRelationship.ManyToMany,
        } as AllPropertyOptions,
      },
      target,
    );
  };
}
