import { ReactNode, useEffect } from "react";
import { CreateApiConfig, NovalsSDK } from "@core-sdk/novals"
import { useDeviceDetection } from "../hooks";

export const NovalsProvider = ({ children, config }: {
  children: ReactNode; config: {
    apiConfig: CreateApiConfig;
  }
}) => {

  const { isIOS } = useDeviceDetection();

  useEffect(() => {
    NovalsSDK.getInstance(config.apiConfig)
  }, [])

  return children
}