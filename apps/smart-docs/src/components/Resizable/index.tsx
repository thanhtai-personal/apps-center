import { ResizableBox } from "react-resizable";

interface ResizableProps {
  children: any;
  width: number;
  height: number;
  handleSize?: [number, number];
  lockAspectRatio?: boolean;
  axis?: "both" | "x" | "y" | "none";
  minConstraints?: [number, number];
  maxConstraints?: [number, number];
  onResizeStop?: any;
  onResizeStart?: any;
  onResize?: any;
  draggableOpts?: Object;
}

const Resizable = (props: ResizableProps) => {
  return props.children //<ResizableBox {...props}>{props.children}</ResizableBox>;
};

export default Resizable;
