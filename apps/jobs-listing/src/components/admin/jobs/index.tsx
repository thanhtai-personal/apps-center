import { useStore } from "@/store/index";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text, useResponsive } from "@core-ui/react-mui-core";
import { Drawer } from "@core-ui/react-mui-core/materials";
import { runJobs, useJobsListingStore, useJobsData, runCategoryStore } from "@core-ui/react-job-listing";
import { useEffect, useLayoutEffect } from "react";
import { JobDetail } from "@/components/JobDetail";
import { JobInputForm } from "./JobInputForm";
import { JobSelection } from "./JobSelection";
import { ImageExport } from "./ImageExport";

import "./custom.style.css";
import { PostContentGenerator } from "./PostContentGenerator";
import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { useGlobalStyles } from "@/styles/globalStyle";

export const JobsCrawlerPageContent = observer(() => {
  const { jobStore } = useJobsListingStore();
  const { uiStore } = useStore();
  const { tabletSizeDown } = useResponsive();
  const { refetch } = useJobsData();
  const globalStyles = useGlobalStyles();

  useEffect(() => {
    jobStore.filterData.limit = 99999;
    refetch?.();
  }, [])

  runJobs();
  runCategoryStore();
  useLayoutEffect(() => {
    uiStore.useHeader = false;
    uiStore.useFooter = false;
    uiStore.useBottomMenu = false;
    uiStore.useMenuBar = false;
  }, [])

  return <Flex fullWidth center>
    <Flex fullWidth column maxWidth={PAGE_MAX_WIDTH}>
      <Flex fullWidth center mt={4}>
        <Text className={globalStyles.textKanitBold24} style={{ textTransform: "uppercase" }}>
          Trang nhập liệu công việc
        </Text>
      </Flex>

      <Flex fullWidth column={tabletSizeDown}>
        <Flex flex={1} fullWidth p={1} mt={4} center column>
          <PostContentGenerator />
        </Flex>

        <Flex flex={1} fullWidth p={1} mt={4} center column>
          <ImageExport />
        </Flex>
      </Flex>

      <Flex fullWidth center column={tabletSizeDown} mt={4}>
        <Flex fullWidth column flex={1}>
          <JobInputForm />
        </Flex>

        <Flex flex={1} column fullHeight pt={4}>
          <JobSelection />
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
          <JobDetail data={jobStore.job} />
        </Flex>
      </Drawer>
    </Flex>
  </Flex>
})