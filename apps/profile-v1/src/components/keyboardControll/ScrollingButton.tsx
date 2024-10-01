import { useKeyboardControll } from '@/hooks/useKeyboardControll';
import { useCallback, useState } from 'react';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

export interface IScrollingButton {
  hidden?: boolean;
  fixed?: boolean;
  offset?: number;
  scrollContainer?: HTMLElement | null;
  listSection?: string[];
}

export const ScrollingButton = ({
  hidden,
  fixed,
  offset = 20,
  listSection,
}: IScrollingButton) => {
  const [activeId, setActiveId] = useState(0);

  const handleUp = useCallback(() => {
    if (listSection?.at(0)) {
      const elementId = listSection?.at(activeId + 1);
      if (elementId) {
        setActiveId(prev => prev + 1);
        const element = document.getElementById(elementId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scroll({
        behavior: 'smooth',
        top: window.screenY - offset > 0 ? window.screenY - offset : 0,
      });
    }
  }, [activeId]);

  const handleDown = useCallback(() => {
    if (listSection?.at(0)) {
      const elementId = listSection?.at(activeId - 1);
      if (elementId) {
        setActiveId(prev => prev - 1);
        const element = document.getElementById(elementId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scroll({ behavior: 'smooth', top: window.screenY + offset });
    }
  }, [activeId]);

  useKeyboardControll({
    onKeyDown: (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case 38:
          handleUp();
          break;
        case 40:
          handleDown();
          break;
        default:
          break;
      }
    },
  });

  return (
    <div
      className={`flex flex-col justify-center ${
        fixed && 'fixed right-4 top-[42%] z-50'
      } ${hidden && 'hidden'}`}
    >
      <div
        className='hover:bg-[rgba(0,255,0,0.4)] rounded-full cursor-pointer'
        onClick={handleUp}
      >
        <FaArrowAltCircleUp className='text-text w-8 h-8' />
      </div>
      <div
        className='hover:bg-[rgba(0,255,0,0.4)] rounded-full cursor-pointer'
        onClick={handleDown}
      >
        <FaArrowAltCircleDown className='text-text w-8 h-8' />
      </div>
    </div>
  );
};
