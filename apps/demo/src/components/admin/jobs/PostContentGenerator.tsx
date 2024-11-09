import { useGlobalStyles } from "@/styles/globalStyle";
import { useRecruiterStore } from "@core-logic-hooks/react-recruiter";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, OutlinedButton, Text } from "@core-ui/react-mui-core";
import { useEffect, useRef } from "react";

export const PostContentGenerator = observer(() => {
  const globalStyles = useGlobalStyles();
  const { notiStore, jobStore } = useRecruiterStore();
  const postContentRef = useRef<any>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(postContentRef?.current?.value || "");
    notiStore.messageQueue?.push({
      children: "Copied content!",
      variant: "success"
    })
  }

  useEffect(() => {
    if (jobStore.selectedJobs && postContentRef.current) {
      let text = `Bên mình đang tuyển dụng các vị trí sau`

      for (const jobIndex in jobStore.selectedJobs) {
        const job = jobStore.selectedJobs[jobIndex] || {};
        text += `\n\n${parseInt(jobIndex) + 1}. ${job.name}\n - Gross salary: ${job.grossSalary}`
      }

      text = text + `\n\n Các bạn quan tâm vui lòng inbox mình.`
        + `\n Ghé page mình để cập nhật việc làm mỗi ngày:`
        + `\n Jobs Everyday page: http://34.135.118.246:5173/`
        + `\n Page FB: https://www.facebook.com/groups/1916032958872010`
        + `\n Group FB: https://www.facebook.com/groups/1916032958872010`;

      postContentRef.current.value = text;
    }
  }, [jobStore.selectedJobs])

  return (
    <Flex fullWidth column>
      <Flex px={2} centerY>
        <Text className={globalStyles.textKanitBold18}>
          Text copy để đăng bài
        </Text>
        <OutlinedButton onClick={handleCopy} style={{ border: "none", marginLeft: "12px" }}>Copy</OutlinedButton>
      </Flex>
      <Flex fullWidth px={2} mt={2}>
        <textarea rows={15} ref={postContentRef} style={{ background: "rgba(255,255,255, 0.25)", width: "100%", padding: "8px", color: "#fff" }} />
      </Flex>
    </Flex>
  )
})