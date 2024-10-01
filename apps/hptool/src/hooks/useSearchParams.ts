import { useEffect, useState } from "react";

const useSearchParams = () => {
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );

  const handleHashChange = () => {
    setSearchParams(new URLSearchParams(window.location.search));
  };

  useEffect(() => {
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return searchParams;
};

export default useSearchParams;
