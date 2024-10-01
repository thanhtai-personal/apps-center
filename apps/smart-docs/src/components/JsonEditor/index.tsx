import { useEffect, useRef, useState } from "react";
import JSONEditor from "jsoneditor";

const JsonEditor = ({ jsonData, onChange }: any) => {
  const container: any = useRef();
  const [jsoneditor, setJsonEditor] = useState<any>(null);

  useEffect(() => {
    const options = {
      mode: "tree" as any,
      onChangeJSON: onChange,
    };

    setJsonEditor(new JSONEditor(container, options));
    jsoneditor.set(jsonData);

    return () => {
      if (jsoneditor) {
        jsoneditor.destroy();
      }
    };
  }, []);

  useEffect(() => {
    jsoneditor.update(jsonData);
  }, [jsonData]);

  return <div className="jsoneditor-react-container" ref={container} />;
};

export default JsonEditor;
