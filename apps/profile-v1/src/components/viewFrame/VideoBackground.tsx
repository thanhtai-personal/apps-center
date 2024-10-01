import { ReactNode, useEffect, useState } from 'react';
import { LazyLoadVideo } from "../LazyLoadVideo";

export interface IVideoBackground {
  children: ReactNode;
  className?: string;
  src: string;
  type?: string;
  id: string;
  classes?: {
    container?: string;
  }
}

export const VideoBackground = ({
  children,
  className,
  src,
  type = 'video/mp4',
  id = "source-video",
  classes,
}: IVideoBackground) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const videoElem = document.getElementById(id);
    if (videoElem) {
      videoElem.setAttribute("src", src);

      videoElem.onloadstart = () => {
        setIsLoaded(false);
      }

      videoElem.onloadeddata = () => {
        setIsLoaded(true);
      }
    }

  }, [src, id])

  return (
    <div className={`w-full h-full relative ${classes?.container}`}>
      <LazyLoadVideo
        id={id}
        src={src}
        autoPlay
        muted
        loop
        sourceClass='w-full h-full'
        videoClass={`w-full h-full object-cover`}
        className={`absolute right-0 bottom-0 w-full h-full z-10 ${!isLoaded && "display-none"}`}
      />
      <div
        className={`absolute w-full h-full left-0 top-0 bg-transparent z-20 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
