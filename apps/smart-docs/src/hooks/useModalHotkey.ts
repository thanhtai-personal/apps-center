import { useEffect } from "react";

const useModalHotkey = (state: any, setState: any) => {

  const handleKeyDown = (event: any) => {
    if (event.ctrlKey && event.key === "o") {
      event.preventDefault();
      setState((prev: any) => ({
        ...prev,
        open: !prev.open
      }))
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setState((prev: any) => ({
        ...prev,
        open: false
      }))
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};

export default useModalHotkey;
