import { HttpStatus, SetMetadata, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import {
  ReferenceObject,
  SchemaObject,
} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface.js";
import { AnyClass } from "@ttt/utils";
import { PaginationResult, SingleResult } from "~/models";

export function Returns<T extends AnyClass | [AnyClass] | undefined>(
  status: HttpStatus,
  dto: T,
  description?: string,
): MethodDecorator {
  if (!dto) {
    return function (
      target: any,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor,
    ) {
      applyDecorators(
        SetMetadata("statusCode", status),
        ApiResponse({
          status: status,
          description: description,
        }),
      )(target, propertyKey, descriptor);
    };
  }

  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const isArrayDto = Array.isArray(dto);
    const [wrapper, model]: [AnyClass, AnyClass] = isArrayDto
      ? [PaginationResult<T>, dto[0]]
      : [SingleResult<T>, dto];

    const properties: Record<string, SchemaObject | ReferenceObject> =
      isArrayDto
        ? {
            data: { $ref: getSchemaPath(model) },
            total: { type: "number" },
            limit: { type: "number" },
            page: { type: "number" },
          }
        : {
            data: { $ref: getSchemaPath(model) },
          };

    applyDecorators(
      SetMetadata("statusCode", status),
      ApiExtraModels(wrapper, model),
      ApiResponse({
        status: status,
        description: description,
        schema: {
          allOf: [
            { title: wrapper.name, $ref: getSchemaPath(wrapper) },
            {
              properties,
            },
          ],
        },
      }),
    )(target, propertyKey, descriptor);
  };
}
