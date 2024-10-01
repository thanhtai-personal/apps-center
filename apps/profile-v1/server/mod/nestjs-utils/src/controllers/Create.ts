import { HttpStatus, Post, applyDecorators } from "@nestjs/common";
import { AnyClass } from "@ttt/utils";
import { Returns } from "./Returns.js";

/**
 * Create decorator replace method {@Post} in purpose create
 * @param {AnyClass} resource
 * @param {string} description optional
 *
 * @decorator
 */
export function Create(
  resource: AnyClass,
  { description }: { description?: string } = {},
) {
  return applyDecorators(
    Post("/"),
    Returns(
      HttpStatus.CREATED,
      resource,
      description ?? `Create ${resource.name.toLowerCase()} successfully`,
    ),
  );
}
