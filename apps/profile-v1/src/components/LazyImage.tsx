import { useState, useEffect, ImgHTMLAttributes } from "react";
import { LoadingComponent } from ".";

export interface ILazyLoadImage extends ImgHTMLAttributes<HTMLImageElement> {
  imageClass?: string;
}

export const LazyLoadImage = ({
  src,
  alt,
  className = "",
  imageClass = "",
  ...restProps
}: ILazyLoadImage) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (src) {
      const img = new Image();
      img.onload = () => {
        setLoaded(true);
      };
      img.src = src;
    }
  }, [src]);

  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{
        height: restProps.style?.height || "100%",
        width: restProps.style?.width || "100%",
      }}
    >
      {!loaded && (
        <div
          className="absolute inset-0 flex bg-black justify-center items-center p-4"
          style={{
            minHeight: 180,
          }}
        >
          <LoadingComponent />
        </div>
      )}
      <img
        className={`${imageClass}`}
        loading="lazy"
        src={src}
        alt={alt}
        {...restProps}
      />
    </div>
  );
};
