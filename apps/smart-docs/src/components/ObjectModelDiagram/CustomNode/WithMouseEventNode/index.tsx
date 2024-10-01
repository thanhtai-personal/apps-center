import React, { memo, useEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import styles from "./style.module.css";
import Resizable from "app/components/Resizable";

function WithMouseEventNode(props: any) {
  const { id, data, selected } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data.textStyle) {
      let labelElement: any = document.getElementById(`${id}-label`);
      if (labelElement) {
        labelElement.style = data.textStyle;
      }
    }
  }, [data.textStyle]);

  return (
    <Resizable width={data.width || "auto"} height={data.height || "auto"}>
      <div
        className={`${styles.hoverableNode} custom-node hoverable-node ${
          selected ? "selected-node" : ""
        }`}
        id={`node-frame-${id}`}
        style={{
          background: data.background || "rgba(0, 106, 255, 0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            id={`${id}-label`}
            className="custom-node__header"
            onClick={() => setOpen((prev) => !prev)}
          >
            {data.label}
          </div>
        </div>
        {data.content && (
          <div
            className="custom-node__body expand-anim"
            style={{
              height: open ? "auto" : "0px",
              padding: open ? "10px" : "0",
              overflow: "hidden",
              background: "rgba(100, 0, 155, 0.45)",
            }}
          >
            {open && (
              <div
                style={{ zIndex: 99999 }}
                dangerouslySetInnerHTML={{ __html: data.content }}
              ></div>
            )}
          </div>
        )}
        <Handle type="source" position={Position.Bottom} />
        <Handle type="target" position={Position.Top} />
      </div>
    </Resizable>
  );
}

export default memo(WithMouseEventNode);
