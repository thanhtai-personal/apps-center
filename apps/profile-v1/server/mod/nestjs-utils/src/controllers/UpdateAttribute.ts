import { applyDecorators, HttpStatus, Put } from "@nestjs/common";
import { Returns } from "./Returns.js";

type Entity<T> = { new (): T };

/**
 * Delete decorator with purpose update single property of any Entity
 *
 * @decorator
 */
export function UpdateAttribute<T>(
  resource: Entity<T>,
  attribute: string,
  { description }: { description?: string } = {},
) {
  const name: string = resource.name.toLowerCase();

  return applyDecorators(
    Put(`/:${name}Id/attributes/${[attribute].toString()}`),
    Returns(
      HttpStatus.OK,
      resource,
      description ?? `${resource.name} updated successfully`,
    ),
  );
}
