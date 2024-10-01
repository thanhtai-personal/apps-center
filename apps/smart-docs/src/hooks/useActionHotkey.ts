import { useCallback, useEffect } from "react";

const useActionHotkey = (selectedItem: any, events: any) => {
  const { onDelete, onEdit } = events;

  const handleKeyDown = useCallback(
    (event: any) => {
      if (!selectedItem) return;
      if (event.key === "Delete") {
        onDelete(selectedItem)
      }
      if (event.key === "Enter") {
        onEdit(selectedItem)
      }
    },
    [selectedItem, onDelete, onEdit]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);
};

export default useActionHotkey;
