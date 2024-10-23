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
  const { notiStore: recruiterNoti } = useRecruiterStore();
  const { notiStore: umsNoti } = useUMSStore();
  const { notiStore: authNoti } = useAuthenticationStore();

  useEffect(() => {
    const message = recruiterNoti.messageQueue?.shift();
    if (message) {
      NotiStackInstance.push({
        children: message.children,
        variant: message.variant as "success" | "error" | "info" | "warning"
      })
    }
  }, [recruiterNoti.messageQueue?.[0]])

  useEffect(() => {
    const message = umsNoti.messageQueue?.shift();
    if (message) {
      NotiStackInstance.push({
        children: message.children,
        variant: message.variant as "success" | "error" | "info" | "warning"
      })
    }
  }, [umsNoti.messageQueue?.[0]])

  useEffect(() => {
    const message = authNoti.messageQueue?.shift();
    if (message) {
      NotiStackInstance.push({
        children: message.children,
        variant: message.variant as "success" | "error" | "info" | "warning"
      })
    }
  }, [authNoti.messageQueue?.[0]])

  return children;
})