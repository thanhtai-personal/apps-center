import React from "react";
import useZoomable from "app/hooks/useZoomable";

interface ZoomableProps {
  width: number | string;
  height: number | string;
  children: React.ReactNode;
}

const Zoomable: React.FC<ZoomableProps> = ({ width, height, children }) => {
  const [scale] = useZoomable();

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        overflow: "auto",
        borderRadius: "8px",
        border: "solid 1px rgba(0,0,0, 0.125)",
        background: "#f0f0f0",
        boxShadow: "inset 1px 2px 2px rgba(0,0,0, 0.125)",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          position: "absolute",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Zoomable;
