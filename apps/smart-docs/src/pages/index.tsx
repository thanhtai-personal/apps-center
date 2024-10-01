import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import ReactModal from "app/components/Modal";
import ObjectModelDiagram from "app/components/ObjectModelDiagram";
import useLocalStorageData from "app/hooks/useLocalStorageData";
import Head from "next/head";
import LoadingPage from "app/components/LoadingPage";
import JsonEditorModal from "app/components/JsonEditor/modal";

export default function Home() {
  const [jsonData, objectData, updateJsonData, error] =
    useLocalStorageData("document-data");
  const [loadingPage, setLoadingPage] = useState(false);

  const chartRef: any = useRef();

  const handleUpdateJson = (data: any) => {
    updateJsonData(JSON.stringify(data));
  };

  const handleOpenJsonEditorModal = useCallback(() => {
    AppModalInstance.replaceChildren(JsonEditorModal);
    AppModalInstance.updateChildrenProps({
      jsonData, objectData, updateJsonData, error
    })
    AppModalInstance.open();
  }, [jsonData, objectData, updateJsonData])

  useEffect(() => {
    setLoadingPage(true);
    const introduced = localStorage.getItem(moment().format("DD_MM_YYYY"));
    if (introduced) {
      setLoadingPage(false)
    } else {
      setTimeout(() => {
        localStorage.setItem(moment().format("DD_MM_YYYY"), "blocked-loading-page");
        setLoadingPage(false);
      }, 10000);
    }
  }, []);

  return (
    <>
      <Head>
        <title>IM - Intelligent map</title>
      </Head>
      <main>
        {loadingPage && <LoadingPage />}
        <div
          style={{
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
            fontFamily: "sans-serif",
          }}
        >
          <ObjectModelDiagram
            ref={chartRef}
            nodes={objectData?.nodes}
            edges={objectData?.edges}
            onUpdateJson={handleUpdateJson}
            onOpenJsonEditorModal={handleOpenJsonEditorModal}
          />
        </div>
        <ReactModal
          ref={(ref: any) => {
            _AppModalInstance = ref;
          }}
        />
      </main>
    </>
  );
}

// eslint-disable-next-line no-var
var _AppModalInstance: any = {};

export const AppModalInstance = {
  replaceChildren: (childrenNode: any) => {
    _AppModalInstance && _AppModalInstance.replaceChildren(childrenNode);
  },
  updateChildrenProps: (props: any) => {
    _AppModalInstance && _AppModalInstance.updateChildrenProps(props);
  },
  updateModalProps: (props: any) => {
    _AppModalInstance && _AppModalInstance.updateModalProps(props);
  },
  open: () => {
    _AppModalInstance && _AppModalInstance.openModal();
  },
  close: () => {
    _AppModalInstance && _AppModalInstance.closeModal();
  },
  addCloseCallback: (callback: any) => {
    _AppModalInstance && _AppModalInstance.addCloseCallback(callback);
  },
  dangerousUpdateState: (key: string, value: any) => {
    _AppModalInstance && _AppModalInstance.dangerousUpdateState(key, value);
  }
};
