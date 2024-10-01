import { useEffect, useState } from 'react';

const useZoomable = () => {
  const [scale, setScale] = useState(1);

  const handleWheel = (event: any) => {
    event.preventDefault();
    setScale((prev) => prev += event.deltaY * -0.01);
  }

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => {
        window.removeEventListener("wheel", handleWheel);
    }
  }, [])

  return [scale]
};

export default useZoomable;