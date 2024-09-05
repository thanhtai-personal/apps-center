import { ReactNode, useEffect } from "react";
import { CreateApiConfig, NovalsSDK } from "@core-sdk/novals"

export const NovalsProvider = ({ children, config }: {
  children: ReactNode; config: {
    apiConfig: CreateApiConfig;
  }
}) => {

  useEffect(() => {
    NovalsSDK.getInstance(config.apiConfig)
  }, [])

  return <>
    {children}
  </>
}