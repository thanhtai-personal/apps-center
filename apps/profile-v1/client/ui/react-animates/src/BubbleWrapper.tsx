import { useDragableElement } from "@ttt-utils/react-hooks";
import { ReactNode } from "react";

export const BubbleWrapper = ({
  className,
  id,
  children
}: {
  id: string;
  children?: ReactNode;
  className?: string;
}) => {
  const { onSelect } = useDragableElement(`bubble-${id}`);

  return <div onClick={onSelect} id={`bubble-${id}`} className={`text-lg ${className}`}>
    <div className="bubble-container">
      <div className="bubble flex justify-center items-center">
        {children && children}
      </div>
    </div>
  </div>
}