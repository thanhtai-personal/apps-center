import {
  HttpCode,
  HttpStatus,
  Delete as NestDelete,
  applyDecorators,
} from "@nestjs/common";
import { AnyClass } from "@ttt/utils";
import { Returns } from "./Returns.js";

/**
 * Delete decorator replace method Delete in Nest
 * @param {AnyClass } resource
 * @param {string} description optional
 *
 * @decorator
 */
export function Delete(
  resource: AnyClass,
  { description }: { description?: string } = {},
) {
  const name: string = resource.name;

  return applyDecorators(
    NestDelete(`/:${name.toLowerCase()}Id`),
    HttpCode(HttpStatus.NO_CONTENT),
    Returns(
      HttpStatus.NO_CONTENT,
      undefined,
      description ?? `Delete ${resource.name.toLowerCase()} successfully`,
    ),
  );
}
