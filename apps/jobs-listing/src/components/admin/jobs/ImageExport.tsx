import { useGlobalStyles } from "@/styles/globalStyle";
import { useJobsData, useJobsListingStore } from "@core-ui/react-job-listing";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Loading, OutlinedButton, Text } from "@core-ui/react-mui-core";
import { formatFullDate } from "@core-utils/utils-helpers";
import { toPng } from 'html-to-image';

export const ImageExport = observer(() => {
  const { jobStore } = useJobsListingStore();
  const globalStyles = useGlobalStyles();
  const { clearSelectedJobs } = useJobsData();

  const handleExportImage = async () => {
    if (jobStore.loading) return;
    jobStore.loading = true;
    const exportElement = document.getElementById("export-jobs") as HTMLElement;
    if (exportElement) {
      try {
        const dataUrl = await toPng(exportElement);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `jobs-${formatFullDate(new Date())}.png`;
        link.click();
        jobStore.loading = false;
      } catch (error) {
        jobStore.loading = false;
      }
    }
  }

  return (
    <Flex fullWidth column center>
      <Flex fullWidth px={2} mb={2}>
        <Text className={globalStyles.textKanitBold18}>
          Image để đăng bài
        </Text>
      </Flex>
      <Flex id="export-jobs" p={2} bgcolor={"#1d1c19"}
        minWidth={600} width={"fit-content"} borderRadius={"16px"} column>
        <Flex fullWidth mt={2} center>
          <Text className={globalStyles.textKanitBold16} whiteSpace={"nowrap"}>Job list {formatFullDate(new Date(), {
            year: "numeric",
            month: "numeric",
            day: "2-digit",
          })}</Text>
        </Flex>
        {jobStore.selectedJobs.map((job: any, index: number) => {
          return <div key={job.id} style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            margin: "16px 0",
            color: "#fff"
          }} >
            <div style={{ width: "100%" }}>
              <div>
                <div style={{
                  whiteSpace: "nowrap",
                  fontSize: 16
                }}>{index + 1} - {job.name}</div>
              </div>
            </div>

            {job.grossSalary && <div style={{
              whiteSpace: "nowrap",
              marginLeft: "4px",
              fontSize: 16,
              width: "100%",
            }}>
              <div> Lương gross: {job.grossSalary}</div>
            </div>}
          </div>
        })}
        <Flex fullWidth mt={2} center>
          <Text className={globalStyles.textKanit16} color={"red"} whiteSpace={"nowrap"}>@Inbox me!!!</Text>
        </Flex>
      </Flex>

      <Flex mt={2} fullWidth center>
        <OutlinedButton style={{ padding: "16px" }} onClick={handleExportImage}>
          {jobStore.loading ? <Loading /> : <Text className={globalStyles.textOrbiBold14}>Tải ảnh</Text>}
        </OutlinedButton>
        <OutlinedButton style={{ padding: "16px", marginLeft: "16px" }} onClick={clearSelectedJobs}>
          <Text className={globalStyles.textOrbiBold14}>Xóa công việc đã chọn</Text>
        </OutlinedButton>
      </Flex>
    </Flex>
  )
})