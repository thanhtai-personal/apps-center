import { MarkerType } from "reactflow";
import { EDGE_TYPE, POSITION } from "./constants";

export const uppercaseFirstLetter = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const makeNodeTypeMappingItem = ({
  name,
  createTitle,
  model,
  type,
  getOptions,
}: any) => ({
  name: name,
  createTitle: createTitle,
  model: model,
  getOptions,
  validate: (values: any) => !!values.id,
  mappingSubmitData: (values: any) => ({
    id: values.id,
    type: type,
    data: {
      label: values.label,
    },
    className: values.className,
    parentNode: values.parentNode,
    targetPosition: values.targetPosition,
    sourcePosition: values.sourcePosition,
    selectable: values.selectable,
    zIndex: values.zIndex,
    style: values.style,
    position: {
      x: 40,
      y: 40,
    },
    selected: false,
    positionAbsolute: {
      x: 40,
      y: 40,
    },
    dragging: false,
    width: 350,
    height: 350,
  }),
  mappingInitialValues: (nodeData: any) => {
    return {
      id: nodeData.id || "",
      label: nodeData.label || "",
      targetPosition: nodeData.targetPosition || POSITION.TOP,
      sourcePosition: nodeData.sourcePosition || POSITION.BOTTOM,
      parentNode: nodeData.parentNode || "",
      selectable: nodeData.selectable || true,
      zIndex: nodeData.zIndex || 0,
      style: nodeData.style || "",
    };
  },
});

export const makeEdgeMappingItem = ({
  name,
  createTitle,
  model,
  edgeType,
  getOptions,
}: any) => ({
  name: name,
  createTitle: createTitle,
  model: model,
  validate: (values: any) => !!values.id,
  getOptions,
  mappingSubmitData: (values: any) => ({
    id: values.id,
    source: values.source,
    target: values.target,
    sourceHandle: values.sourceHandle,
    type: edgeType,
    animated: values.animated,
    style: values.style,
    className: values.className,
    label: values.label,
    markerStart: values.markerStart,
    markerEnd: values.markerEnd,
  }),
  mappingInitialValues: (edgeData: any) => {
    return {
      id: edgeData.id || "",
      source: edgeData.source || "",
      target: edgeData.target || "",
      sourceHandle: edgeData.sourceHandle || "",
      type: EDGE_TYPE.DEFAULT,
      markerStart: {
        type: edgeData.markerStart || MarkerType.Arrow,
      },
      markerEnd: {
        type: edgeData.markerEnd || MarkerType.Arrow,
      },
      animated: edgeData.animated || false,
      style: edgeData.style || "",
      className: edgeData.className || "",
      label: edgeData.label || "",
    };
  },
});

export const handleImportFile = (
  event: any,
  fileType: string,
  onLoadFunc: Function
) => {
  const file = event.target.files[0];
  if (file && file.type === fileType) {
    const reader: any = new FileReader();
    reader.readAsText(file);
    reader.onload = onLoadFunc(reader);
  }
};

export const handleDownloadFile = (fileName: string, fileData: any) => {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(fileData)
  );
  element.setAttribute("download", fileName);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
