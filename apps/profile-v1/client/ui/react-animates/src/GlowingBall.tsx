import { useDragableElement } from '@ttt-utils/react-hooks';
import { useEffect, useState } from 'react';
import "./glowingBall.style.css"

export interface IGlowingBall {
  className?: string;
  id: string;
  delay?: number;
  style?: any;
}

export const GlowingBall = ({ className, id, delay = 0, style }: IGlowingBall) => {
  const [isDisplaying, setIsDisplaying] = useState(delay === 0);

  useEffect(() => {
    if (delay && delay > 0) {
      setTimeout(() => {
        setIsDisplaying(true);
      }, delay);
    }
  }, [delay])

  const { onSelect } = useDragableElement(id);
  return (
    <div className={`absolute duration-0 ${isDisplaying ? className : "hidden"}`} onClick={onSelect} id={id}>
      <div className='relative'>
        <div
          style={style || {}}
          className={`absolute cursor-grab z-50 top-[calc(50%-20px)] left-[50%-20px] w-16 h-16 rounded-full bg-white glowing-ball`}
        ></div>
      </div>
    </div>
  );
};
