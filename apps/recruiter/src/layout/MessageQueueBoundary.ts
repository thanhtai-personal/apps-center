import { observer } from "@core-ui/react-mobx-state";
import { NotiStackInstance } from "@core-ui/react-mui-core";
import { useRecruiterStore } from "@core-logic-hooks/react-recruiter";
import { ReactNode, useEffect } from "react"
import { useUMSStore } from "@core-logic-hooks/react-ums";
import { useAuthenticationStore } from "@core-logic-hooks/react-auth";

export const MessageQueueBoundary = observer(({
  children,
}: {
  children: ReactNode
}) => {
  const { notiStore: recruiterNotiStore } = useRecruiterStore();
  const { notiStore: umsNotiStore } = useUMSStore();
  const { notiStore: authNotiStore } = useAuthenticationStore();

  useEffect(() => {
    if (recruiterNotiStore.messageQueue) {
      const message = recruiterNotiStore.messageQueue.shift();
      if (message) {
        NotiStackInstance.push({
          children: message.children,
          variant: message.variant as "success" | "error" | "info" | "warning"
        })
      }
    }
  }, [recruiterNotiStore.messageQueue?.[0]])

  useEffect(() => {
    if (umsNotiStore.messageQueue) {
      const message = umsNotiStore.messageQueue.shift();
      if (message) {
        NotiStackInstance.push({
          children: message.children,
          variant: message.variant as "success" | "error" | "info" | "warning"
        })
      }
    }
  }, [umsNotiStore.messageQueue?.[0]])

  useEffect(() => {
    if (authNotiStore.messageQueue) {
      const message = authNotiStore.messageQueue.shift();
      if (message) {
        NotiStackInstance.push({
          children: message.children,
          variant: message.variant as "success" | "error" | "info" | "warning"
        })
      }
    }
  }, [authNotiStore.messageQueue?.[0]])

  return children;
})