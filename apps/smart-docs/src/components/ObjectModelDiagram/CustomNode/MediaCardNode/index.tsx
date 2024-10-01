import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import ReactMarkdown from "react-markdown";

function MediaCardNode(props: any) {
  const { id, data, selected } = props;

  const [open, setOpen] = useState(false);

  return (
    <div
      className={`custom-node expand-frame ${selected ? "selected-node" : ""}`}
      id={`node-frame-${id}`}
    >
      <div
        className="custom-node__header"
        onClick={() => setOpen((prev) => !prev)}
      >
        {data.label}
      </div>
      <div
        className="custom-node__body expand-anim"
        style={{
          height: open ? "auto" : "0px",
          padding: open ? "10px" : "0",
          overflow: "hidden",
          background: "rgba(100, 0, 155, 0.45)",
        }}
      >
        {data.mdContent && open && (
          <div style={{ zIndex: 99999 }}>
            <ReactMarkdown>{data.mdContent}</ReactMarkdown>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
}

export default memo(MediaCardNode);
