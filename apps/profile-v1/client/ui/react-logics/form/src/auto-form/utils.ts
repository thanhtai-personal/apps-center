import {
  IIntegerSchemaProperty,
  INumberSchemaProperty,
  ISchemaProperty,
  IStringSchemaProperty,
  IntegerFormat,
  NumberFormat,
  StringFormat,
} from "@ttt/json-schema";

const isStringSchema = (
  schema: ISchemaProperty,
): schema is IStringSchemaProperty => {
  return schema.type === "string";
};

const isNumberSchema = (
  schema: ISchemaProperty,
): schema is INumberSchemaProperty => {
  return schema.type === "number";
};

export const isIntegerSchema = (
  schema: ISchemaProperty,
): schema is IIntegerSchemaProperty => {
  return schema.type === "integer";
};

export const object = () => (schema: ISchemaProperty) => {
  return schema.type === "object";
};

export const array = () => (schema: ISchemaProperty) => {
  return schema.type === "array";
};

export const boolean = () => (schema: ISchemaProperty) => {
  return schema.type === "boolean";
};

export const string = (format?: StringFormat) => {
  return (schema: ISchemaProperty) => {
    return isStringSchema(schema) && !(format && schema.format !== format);
  };
};

export const file = () => (schema: ISchemaProperty) => {
  return string(StringFormat.Binary)(schema);
};

export const number = (format?: NumberFormat) => {
  return (schema: ISchemaProperty) => {
    return isNumberSchema(schema) && !(format && schema.format !== format);
  };
};

export const integer = (format?: IntegerFormat) => {
  return (schema: ISchemaProperty) => {
    return isIntegerSchema(schema) && !(format && schema.format !== format);
  };
};
