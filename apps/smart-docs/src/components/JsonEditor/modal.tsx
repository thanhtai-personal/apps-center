import JsonViewerComponent from "app/components/JsonViewer";
import { jsonViewerTheme } from "app/utils/constants";
import TooltipComponent from "app/components/Tooltip";
import { handleDownloadFile, handleImportFile } from "app/utils/helper";
import { memo, useRef } from "react";
import moment from "moment";

const JSONEditorModal = (props: any) => {
  const { jsonData, objectData, updateJsonData, error } = props;

  const fileNameRef: any = useRef();

  const handleJsonChange = (event: any) => {
    updateJsonData(event.target.value);
  };

  const handleExportJson = () => {
    handleDownloadFile(
      fileNameRef.current.value
        ? `${fileNameRef.current.value}.json`
        : `${moment().format("DD-MM-YYYY")}_document.json`,
      jsonData
    );
  };

  const handleImportJson = (event: any) => {
    handleImportFile(event, "application/json", (reader: any) => () => {
      updateJsonData(reader.result);
    });
  };

  const handleCopyContentText = (event: any) => {
    navigator.clipboard.writeText(event.target.value);
    alert("JSON copied!!");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: 1250,
      }}
    >
      <textarea
        defaultValue={jsonData}
        readOnly
        rows={15}
        style={{
          width: "100%",
          borderRadius: "8px",
          border: "solid 1px rgba(0,0,0, 0.125)",
          borderColor: error ? "red" : "rgba(0,0,0, 0.125)",
          padding: "8px",
          background: "rgba(220,220,220, 1)"
        }}
        onClick={handleCopyContentText}
        // onChange={handleJsonChange}
      />
      <div
        style={{
          marginTop: "16px",
          marginBottom: "16px",
          maxHeight: "35vh",
          overflow: "auto",
        }}
      >
        <JsonViewerComponent object={objectData} theme={jsonViewerTheme} />
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <TooltipComponent
          tooltip={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "8px",
                borderRadius: "4px",
                boxShadow: "inset 2px 2px 4px rgba(0, 0, 255, .2)",
                minWidth: 200,
              }}
            >
              <input ref={fileNameRef} placeholder="Enter file name" />
              <button
                style={{
                  padding: "8px",
                  background: "rgba(100, 155, 255)",
                  borderRadius: "4px",
                  margin: "8px",
                  color: "#fff",
                }}
                onClick={handleExportJson}
              >
                Export Json
              </button>
            </div>
          }
          id={"export-json-file"}
        >
          <button
            style={{
              padding: "8px",
              background: "rgba(100, 155, 255)",
              borderRadius: "4px",
              margin: "8px",
              color: "#fff",
            }}
            onClick={handleExportJson}
          >
            Export Json
          </button>
        </TooltipComponent>
        <label
          className="button"
          style={{
            padding: "8px",
            background: "rgba(100, 155, 255)",
            borderRadius: "4px",
            margin: "8px",
            color: "#fff",
          }}
        >
          Import Json
          <input
            type="file"
            accept=".json"
            onChange={handleImportJson}
            hidden
          />
        </label>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        Format Json&nbsp;
        <a
          style={{
            color: "steelblue",
            textDecoration: "underline",
          }}
          href="https://jsoneditoronline.org/"
          target="_blank"
        >
          here
        </a>
      </div>
    </div>
  );
};

export default memo(JSONEditorModal);
