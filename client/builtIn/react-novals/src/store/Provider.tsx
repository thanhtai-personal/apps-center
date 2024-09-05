import { ReactNode, useEffect } from "react";
import { CreateApiConfig, NovalSDK } from "@core-sdk/novals"
import { useDeviceDetection } from "../hooks";

export const GoatTapProvider = ({ children, config }: {
  children: ReactNode; config: {
    apiConfig: CreateApiConfig;
  }
}) => {

  const { isIOS } = useDeviceDetection();

  useEffect(() => {
    NovalSDK.getInstance(config.apiConfig)
  }, [])

  return children
}