import { deburr } from "./internal/deburr.js";
import { getVal } from "./object.js";

export const format = <O extends object>(str: string, obj: O) => {
  return str.replace(/{([^}]+)}/g, (_, key) => {
    return String(getVal(obj, key, ""));
  });
};

export function slugify(text: string, separator = "-") {
  return deburr(text.normalize("NFKD"))
    .toLowerCase() // Convert the string to lowercase letters
    .replace(/[^\w-]+/g, " ") // Remove all non-word chars
    .trim() // Trim leading/trailing spaces
    .replace(/\s+/g, separator) // Replace spaces with -
    .replace(/--+/g, separator); // Replace multiple - with single -
}

// override string prototype
declare global {
  interface String {
    format<O extends object>(obj: O): string;
    slugify(separator?: string): string;
  }
}

String.prototype.format = function <O extends object>(obj: O) {
  return format(this.valueOf(), obj);
};
String.prototype.slugify = function (separator = "-") {
  return slugify(this.valueOf(), separator);
};
