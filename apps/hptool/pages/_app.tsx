import { CssBaseline, NoSsr } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import ConfirmModal, {
  ConfirmModalMessage,
} from "src/components/common/ConfirmModal";
import NotiStack, { NotiMessage } from "src/components/common/NotiStack";
import AppModal from "src/components/common/AppModal";
import { createAppTheme } from "src/themes";
import { Fragment, useEffect, useMemo } from "react";
import useSelector from "src/hooks/useSelector";
import Head from "next/head";
import AppLayout from "src/components/AppLayout";
import "./app.css";
import Script from "next/script";

// eslint-disable-next-line no-var
var _ConfirmModalInstance: any = {};

// eslint-disable-next-line no-var
var _NotiStackInstance: any = {};

// eslint-disable-next-line no-var
var _AppModalInstance: any = {};

export const ConfirmModalInstance = {
  addMessage: (message: ConfirmModalMessage) => {
    _ConfirmModalInstance && _ConfirmModalInstance.addMessage(message);
  },
};

const PortalWrapper = () => {
  return (
    <>
      <ConfirmModal
        ref={(ref: any) => {
          _ConfirmModalInstance = ref;
        }}
      />
      <NotiStack
        ref={(ref: any) => {
          _NotiStackInstance = ref;
        }}
      />
      <AppModal
        ref={(ref: any) => {
          _AppModalInstance = ref;
        }}
      />
    </>
  );
};

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
  addCloseCallback: (callback) => {
    _AppModalInstance && _AppModalInstance.addCloseCallback(callback);
  },
  dangerousUpdateState: (key, value) => {
    _AppModalInstance && _AppModalInstance.dangerousUpdateState(key, value);
  },
};

export const NotiStackInstance = {
  push: (message: NotiMessage) => {
    _NotiStackInstance && _NotiStackInstance.push(message);
  },
  dangerousSetState: (state) => {
    _NotiStackInstance && _NotiStackInstance.dangerousSetState(state);
  },
};

const App = ({ Component, pageProps }) => {
  const { customThemes } = pageProps;
  const themeState = useSelector((state) => state.theme);
  const theme = useMemo(
    () => createAppTheme(themeState.themeKey, customThemes),
    [themeState.themeKey, customThemes]
  );

  return (
    <Fragment>
      <Head>
        <title>Công cụ hỗ trợ kỹ thuật, cơ khí chất lượng cao - HPTool</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NoSsr>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
          <PortalWrapper />
        </NoSsr>
      </ThemeProvider>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KLCGVGBRJP');`,
        }}
      />
    </Fragment>
  );
};

export default App;