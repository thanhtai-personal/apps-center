import { observer } from "@core-ui/react-mobx-state";
import { NotiStackInstance } from "@core-ui/react-mui-core";
import { useJobsListingStore } from "@core-ui/react-recruiter";
import { ReactNode, useEffect } from "react"

export const MessageQueueBoundary = observer(({
  children,
}: {
  children: ReactNode
}) => {
  const { notiStore } = useJobsListingStore();

  useEffect(() => {
    if (notiStore.messageQueue) {
      const message = notiStore.messageQueue.shift();
      if (message) {
        NotiStackInstance.push({
          children: message.children,
          variant: message.variant as "success" | "error" | "info" | "warning"
        })
      }
    }
  }, [notiStore.messageQueue?.[0]])

  return children;
})