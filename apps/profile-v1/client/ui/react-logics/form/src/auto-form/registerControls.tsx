import { ISchemaProperty } from "@ttt/json-schema";
import { ControlProps, ControlsMapper } from "./types";
import { ReactNode } from "react";

const controlMap: ControlsMapper[] = [];

export function controlRenderer<SchemaType extends ISchemaProperty, Props>(
  props: ControlProps<SchemaType, Props>,
): ReactNode {
  const found = controlMap.find((control) => control.match(props.schema));
  if (!found) {
    return null;
  }
  return <found.component {...props} />;
}

export const registerControls = (controls: ControlsMapper[]) => {
  controlMap.push(...controls);
};
