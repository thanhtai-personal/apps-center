import { AnimationView, ScrollingButton } from '@/components/index';
import { useState } from 'react';

export const RightActionPanel = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      id='right-panel-wrapper'
      className={`fixed w-12 top-0 right-0 h-screen z-40 ${
        isHover ? 'bg-[rgba(255,0,0,0.15)]' : 'bg-[rgba(0,0,0,0.01)]'
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <AnimationView.FadeInRTL className='h-full'>
          <div
            id='right-panel-content'
            className='flex flex-col h-full py-4 justify-center items-center'
          >
            <ScrollingButton
              scrollContainer={document.getElementById('scroll-container')}
              listSection={[
                'section-summary',
                'section-skills',
                'section-experience',
                'section-education',
                'section-side-projects',
              ]}
            />
          </div>
        </AnimationView.FadeInRTL>
      )}
    </div>
  );
};
