import { ReactNode } from 'react';

export interface IAnimationView {
  children: ReactNode;
  className?: string;
  id?: string;
}

export namespace AnimationView {
  export const FadeInRTL = ({ children, className, id }: IAnimationView) => {
    return <div id={id} className={`animate-fade_in_rtl ${className}`}>{children}</div>;
  };

  export const FadeIn = ({ children, className, id }: IAnimationView) => {
    return <div id={id} className={`animate-fade_in ${className}`}>{children}</div>;
  };
  
  export const FadeInLTR = ({ children, className, id }: IAnimationView) => {
    return <div id={id} className={`animate-fade_in_ltr ${className}`}>{children}</div>;
  };

  export const SlideIn = ({ children, className, id }: IAnimationView) => {
    return <div id={id} className={`animate-slide_in ${className}`}>{children}</div>;
  };
}
