import { PrimitiveType } from "./PrimitiveType.js";

export type ValueOrArray<T> = T extends PrimitiveType ? T | T[] : T;
