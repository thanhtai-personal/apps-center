import { observer } from "@core-ui/react-mobx-state"
import { Flex, Text } from "@core-ui/react-mui-core"
import { Grid, Drawer, Pagination } from "@core-ui/react-mui-core/materials";
import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { useGlobalStyles } from "@/styles/globalStyle";
import { useJobsData, useJobsListingStore } from "@core-ui/react-job-listing";
import { JobDetail } from "../JobDetail";

export interface IJobsGridViewProps {
  data: any[];
  paging?: any;
  title?: string;
}

export const JobsGridView = observer(({ data }: IJobsGridViewProps) => {
  const globalStyles = useGlobalStyles();
  const { jobStore } = useJobsListingStore();
  const { refetch } = useJobsData()

  return <Flex fullWidth center>
    <Flex fullWidth column p={2} maxWidth={PAGE_MAX_WIDTH}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
        {(data || []).map((job) => <Grid key={job.id} item xs={12} sm={6} md={3}>
          <Flex cursorPointer column fullSize p={1} borderRadius={"16px"} border="solid 1px rgba(255,255,255, 0.15)"
            onClick={() => jobStore.job = job}
          >
            <Text className={globalStyles.textKanitBold16}>{job.name}</Text>

            <Flex fullWidth mt={2} centerY justifyContent={"space-between"}>
              <Text>{ }</Text>
              <Flex centerY>
                <Text color={"red"}>Lương gross: </Text>
                <Text whiteSpace={"nowrap"}>&nbsp;{job.grossSalary}</Text>
              </Flex>
            </Flex>

            <Flex mt={2}>
              <Text className={globalStyles.textKanitBold16} color={"#a6a6a6"}>
                Tổng quan về công việc và trách nhiệm
              </Text>
            </Flex>
            <Flex fullWidth p={1}
              overflow={"hidden"}
              style={{
                textOverflow: "ellipsis"
              }}
              height={120}
              position={"relative"}
            >
              <Text textAlign={"left"} className={globalStyles.textKanit16}
                whiteSpace={"pre-line"}
                width={"100%"}
                style={{
                  textOverflow: "ellipsis"
                }}
                color={"#949494"}
              >{job.summary}</Text>
              <Flex position={"absolute"} bottom={0} right={0} px={1} bgcolor={"#000"} cursorPointer>
                <Text color={"red"} className={globalStyles.hoverUnderLine}>...more</Text>
              </Flex>
            </Flex>

            <Flex mt={2}>
              <Text className={globalStyles.textKanitBold16} color={"#a6a6a6"}>
                Kỹ năng và kinh nghiệm
              </Text>
            </Flex>
            <Flex fullWidth p={1}
              overflow={"hidden"}
              style={{
                textOverflow: "ellipsis"
              }}
              height={120}
              position={"relative"}
            >
              <Text textAlign={"left"} className={globalStyles.textKanit16}
                whiteSpace={"pre-line"}
                width={"100%"}
                style={{
                  textOverflow: "ellipsis"
                }}
                color={"#949494"}
              >{job.skills}</Text>
              <Flex position={"absolute"} bottom={0} right={0} px={1} bgcolor={"#000"} cursorPointer>
                <Text color={"red"} className={globalStyles.hoverUnderLine}>...more</Text>
              </Flex>
            </Flex>
          </Flex>
        </Grid>)}
      </Grid>
      <Flex fullWidth center mx={2} my={3}>
        <Pagination count={jobStore.jobs?.total > 0 && jobStore.jobs?.limit > 0
          ? Math.floor((((jobStore.jobs?.total - 1) / jobStore.jobs?.limit) || 1)) + 1 : 1}
          color="primary"
          onChange={(_, page) => {
            jobStore.filterData.offset = (page - 1) * jobStore.filterData.limit;
            refetch?.();
          }}
        />
      </Flex>
    </Flex>

    <Drawer
      anchor={"right"}
      open={!!jobStore.job}
      onClose={() => { jobStore.job = null }}
    >
      <Flex fullSize column p={2} bgcolor={"rgba(0,0,0,1)"} width={600} maxHeight={"100vh"}
        style={{
          overflowX: "hidden",
          overflowY: "auto"
        }}
      >
        <JobDetail data={jobStore.job} restricted />
      </Flex>
    </Drawer>
  </Flex>
})