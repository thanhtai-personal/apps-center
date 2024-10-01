import { ReactNode } from "react";
import { IAction } from "../app";

export enum LayoutActionType {
}

export interface ILayoutAction<T, K> extends IAction<T, K> {}

// Define the state type
export interface ILayoutContext {
  useHeader?: boolean;
  useFooter?: boolean;
  breadcrumb?: ReactNode | string;
}