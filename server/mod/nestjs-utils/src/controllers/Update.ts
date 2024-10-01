import { applyDecorators, HttpStatus, Put } from "@nestjs/common";
import { AnyClass } from "@ttt/utils";
import { Returns } from "./Returns.js";

/**
 * Delete decorator replace method Put Decorator in Nest
 * @param {AnyClass } resource
 * @param {string} description optional
 *
 * @decorator
 */
export function Update(
  resource: AnyClass,
  { description }: { description?: string } = {},
) {
  const name: string = resource.name.toLowerCase();

  return applyDecorators(
    Put(`/:${name.toLowerCase()}Id`),
    Returns(
      HttpStatus.OK,
      resource,
      description ?? `Update ${name.toLowerCase()} successfully`,
    ),
  );
}
