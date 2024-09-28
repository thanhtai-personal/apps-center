import { SearchBar } from "@/components/jobs/SearchBar";
import { useGlobalStyles } from "@/styles/globalStyle";
import { useJobsData, useJobsListingStore } from "@core-ui/react-job-listing";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, OutlinedButton, Text } from "@core-ui/react-mui-core";
import { useMemo } from "react";

export const JobSelection = observer(() => {
  const { jobStore } = useJobsListingStore();
  const globalStyles = useGlobalStyles();
  const { viewJob, selectJob, deleteJob } = useJobsData();

  const handleSelectJob = (job: any) => () => {
    selectJob(job)
  }

  const handleDelete = (job) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    deleteJob(job.id)
  }

  const selectedJobIds = useMemo(() => {
    return (jobStore.selectedJobs || []).map(job => job.id)
  }, [jobStore.selectedJobs])

  return <>
    <Flex px={2}>
      <Text className={globalStyles.textKanitBold18}>
        Bảng chọn công việc để đăng bài
      </Text>
    </Flex>
    <Flex fullWidth>
      <SearchBar />
    </Flex>

    <Flex column
      maxHeight={"100vh"}
      style={{
        overflowY: "auto",
        overflowX: "hidden",
      }}>
      {(jobStore.jobs?.data || []).map((job: any, index: number) => {
        return (
          <Flex key={job.id} fullWidth centerY justifyContent={"center"} p={1} cursorPointer
            onClick={handleSelectJob(job)}
          >
            <Flex fullWidth justifyContent={"space-between"} centerY bgcolor={selectedJobIds.includes(job.id) ? "rgba(255,255,255, 0.25)" : "rgba(255,255,255, 0.15)"}
              p={1} borderRadius={"8px"}>
              <Text className={selectedJobIds.includes(job.id) ? globalStyles.textKanitBold16 : globalStyles.textKanit16}>{job.name}</Text>
              <Flex centerY>
                <OutlinedButton style={{ background: "rgba(0,0,255,0.25)", marginRight: "8px", border: "none" }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    viewJob(job);
                  }}
                >
                  <Text>Chi tiết</Text>
                </OutlinedButton>
                <OutlinedButton style={{ background: "rgba(255,0,0,0.5)", border: "none" }}
                  onClick={handleDelete(job)}
                >
                  <Text>Xóa</Text>
                </OutlinedButton>
              </Flex>
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  </>
})