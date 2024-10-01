import { useState, useEffect, MediaHTMLAttributes } from 'react';
import { LoadingComponent } from '.';

interface ILazyLoadVideo extends MediaHTMLAttributes<HTMLVideoElement> {
  id: string;
  src: string;
  type?: string;
  videoClass?: string;
  sourceClass?: string;
}

export const LazyLoadVideo = ({
  id,
  src,
  type,
  videoClass = '',
  sourceClass = '',
  className = '',
  ...restProps
}: ILazyLoadVideo) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const videoElement = document.getElementById(id) as HTMLVideoElement;
    const sourceElement = document.getElementById(
      `source-${id}`
    ) as HTMLSourceElement;

    const handleLoaded = () => {
      setLoaded(true);
    };

    if (videoElement && sourceElement) {
      videoElement.addEventListener('loadeddata', handleLoaded);
      sourceElement.src = src;
    }

    return () => {
      if (videoElement && sourceElement) {
        videoElement.removeEventListener('loadeddata', handleLoaded);
      }
    };
  }, [id, src]);

  return (
    <div className={`w-full h-full ${className}`}>
      <div className={`relative w-full h-full`}>
        {!loaded && (
          <div
            className='absolute inset-0 flex bg-black justify-center items-center p-4'
            style={{
              minHeight: 180,
            }}
          >
            <LoadingComponent />
          </div>
        )}
        <video
          id={id}
          autoPlay
          muted
          loop
          className={videoClass}
          style={{
            height: restProps.style?.height || '100%',
            width: restProps.style?.width || '100%',
          }}
          {...restProps}
        >
          <source
            id={`source-${id}`}
            className={sourceClass}
            src={src}
            type={type}
          />
          Your browser does not support HTML5 video.
        </video>
      </div>
    </div>
  );
};
