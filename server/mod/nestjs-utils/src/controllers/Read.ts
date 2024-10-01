import { Get, HttpStatus, applyDecorators } from "@nestjs/common";
import { AnyClass } from "@ttt/utils";
import { Returns } from "./Returns.js";

/**
 * Read decorator replace method {@Get} for getOne/getPaginated
 * @param {AnyClass | [AnyClass]} resource
 * @param {string} description optional
 *
 * @example
 * If  getOne method ` Get ` will be transform
 * from Read(User) to Get("userId")
 *
 * @decorator
 */
export function Read(
  resource: AnyClass | [AnyClass],
  { description }: { description?: string } = {},
) {
  const isSingle = !Array.isArray(resource);
  const name: string = isSingle ? resource.name : resource[0].name;

  return applyDecorators(
    Get(isSingle ? `/:${name.toLowerCase()}Id` : `/`),
    Returns(
      HttpStatus.OK,
      resource,
      description ??
        `Get ${(isSingle ? name : name + "s").toLowerCase()} successfully`,
    ),
  );
}
