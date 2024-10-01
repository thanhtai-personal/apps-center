import { useState } from "react";

const TooltipComponent = (props: any) => {
  const { id, children, tooltip } = props;
  const [openTooltip, setOpenTooltip] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
      }}
      id={id}
      onMouseOver={() => setOpenTooltip(true)}
      onMouseLeave={() => setOpenTooltip(false)}
    >
      {children}
      <div
        style={{
          position: "absolute",
          bottom: "100%",
          height: openTooltip ? "auto" : 0,
          overflow: openTooltip ? "hidden" : "auto",
          transitionDuration: "0.2s",
        }}
      >
        {tooltip}
      </div>
    </div>
  );
};

export default TooltipComponent;
