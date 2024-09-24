import { observer } from "@core-ui/react-mobx-state";
import { NotiStackInstance } from "@core-ui/react-mui-core";
import { useJobListingStore } from "@core-ui/react-job-listting";
import { ReactNode, useEffect } from "react"

export const MessageQueueBoundary = observer(({
  children,
}: {
  children: ReactNode
}) => {
  const { notiStore } = useJobListingStore();
  useEffect(() => {
    const message = notiStore.messageQueue?.shift();
    if (message) {
      NotiStackInstance.push({
        children: message.children,
        variant: message.variant as "success" | "error" | "info" | "warning"
      })
    }
  }, [notiStore.messageQueue?.[0]])

  return children;
})