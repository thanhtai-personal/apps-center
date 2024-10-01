import React, { useState, useEffect } from "react";
import Flex from "../Flex";

const LazyLoadImage = (props: any) => {
  const [loaded, setLoaded] = useState(false);
  const { src, alt, ...nestedProps } = props;

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <Flex
      className="lazyload-image-wrapper"
      position={"relative"}
      height={nestedProps.style?.height || "100%"}
      width={nestedProps.style?.width || "100%"}
    >
      {!loaded && (
        <Flex
          center
          position={"absolute"}
          width={"100%"}
          height={"100%"}
          bgcolor={"black"}
        >
          <img
            src={"/images/loading.gif"}
            alt={alt}
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
            }}
          />
        </Flex>
      )}
      <img
        className={`lazyload-image ${loaded ? "loaded" : ""}`}
        src={loaded ? src : ""}
        {...nestedProps}
      />
    </Flex>
  );
};

export default LazyLoadImage;
