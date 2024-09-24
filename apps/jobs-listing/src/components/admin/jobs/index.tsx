import { useStore } from "@/store/index";
import { useGlobalStyles } from "@/styles/globalStyle";
import { observer, useLocalObservable } from "@core-ui/react-mobx-state";
import { Flex, LazyImage, OutlinedButton, Text } from "@core-ui/react-mui-core";
import { Drawer } from "@core-ui/react-mui-core/materials";
import { runJobs, useCrawler, useJobsListingStore, useJobsData } from "@core-ui/react-job-listing";
import { formatFullDate, waitMs } from "@core-utils/utils-helpers";
import { useEffect, useLayoutEffect, useMemo, useRef, useTransition } from "react";
import { toPng } from 'html-to-image';
import FacebookLogin from 'react-facebook-login';

import "./custom.style.css";

const fbApiVersion = "v20.0"
const fbAppId = "1058569359238393"

export const JobsCrawlerPageContent = observer(() => {
  const state = useLocalObservable(() => ({
    loading: false,
    lastTarget: "",
    isLoggedIn: false,
    fbUserData: {} as any,
    selectedGroups: [] as any[],
    selectedPages: [] as any[],
    postContent: '',
  }))
  const { jobStore } = useJobsListingStore();
  const { uiStore } = useStore();
  const globalStyles = useGlobalStyles();
  const inputRef = useRef<any>();
  const inputIdRef = useRef<any>();
  const { exportAnydayJob } = useCrawler();
  const [isPending, startTransition] = useTransition();

  const { deleteJob, viewJob, refetch } = useJobsData();

  const handleSubmit = async () => {
    if (state.loading) return;
    state.loading = true;
    if (inputIdRef.current.value && inputRef.current.value) {
      const trimHtmlStr = cleanHTML(inputRef.current.value);
      await exportAnydayJob(inputIdRef.current.value, trimHtmlStr);
      refetch();
    }
    await waitMs(1000);
    startTransition(() => {
      state.loading = false;
    })
  }

  runJobs();

  const responseFacebook = (response) => {
    if (response.status === 'connected') {
      state.isLoggedIn = true;
      state.fbUserData = { token: response.authResponse.accessToken }
      localStorage.setItem('fb-token', response.authResponse.accessToken);
    } else if (response.status === 'not_authorized') {
    } else {
    }
  };

  const postGroup = async (selectedGroup) => {
    try {
      const response = await fetch(`https://graph.facebook.com/${fbApiVersion}/${selectedGroup}/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.fbUserData.token}`,
        },
        body: JSON.stringify({
          message: state.postContent,
        }),
      });
      const data = await response.json();
      console.log('Post to group:', data);
    } catch (error) { }
  }

  const postPage = async (selectedPage) => {
    try {
      const response = await fetch(`https://graph.facebook.com/${fbApiVersion}/${selectedPage}/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.fbUserData.token}`,
        },
        body: JSON.stringify({
          message: state.postContent,
        }),
      });
      const data = await response.json();
      console.log('Post to page:', data);
    } catch (error) { }
  }

  const postFeed = async () => {
    try {
      const response = await fetch(`https://graph.facebook.com/${fbApiVersion}/me/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.fbUserData.token}`,
        },
        body: JSON.stringify({
          message: state.postContent,
        }),
      });
      const data = await response.json();
      console.log('Post to user feed:', data);
    } catch (error) {

    }
  }

  const autoPost = async () => {
    try {
      if (state.isLoggedIn && state.fbUserData?.token && state.postContent) {
        for (const group of state.selectedGroups) {
          await postGroup(group);
        }
        for (const page of state.selectedPages) {
          await postPage(page);
        }
        postFeed()
      } else {
      }
    } catch (error) {
      console.error('Error posting to Facebook:', error);
    }
  };

  useLayoutEffect(() => {
    uiStore.useHeader = false;
    uiStore.useFooter = false;
    uiStore.useBottomMenu = false;
    uiStore.useMenuBar = false;
  }, [])

  const handleSelectJob = (job: any, index: number) => () => {
    if (jobStore.jobs[index]) {
      state.lastTarget = `${job.id}-${job.selected}`
      jobStore.jobs[index].selected = !jobStore.jobs[index].selected;
    }
  }

  const handleDelete = (job) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    deleteJob(job.id)
  }

  const handleExportImage = async () => {
    const exportElement = document.getElementById("export-jobs") as HTMLElement;
    if (exportElement) {
      try {
        const dataUrl = await toPng(exportElement);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `jobs-${formatFullDate(new Date())}.png`;
        link.click();
      } catch (error) { }
    }
  }

  const selectedJobs = useMemo(() => (jobStore.jobs || []).filter((j: any) => !!j.selected), [jobStore.jobs, state.lastTarget])


  return <Flex fullWidth column>
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
    <Flex fullWidth center>

      <Flex fullWidth column flex={1}>
        <Flex fullWidth p={2}>
          <input ref={inputIdRef} type="text" style={{ width: "100%", background: "rgba(255,255,255, 0.25)", padding: "8px" }} placeholder="id"></input>
        </Flex>
        <Flex fullWidth p={2} mt={2} center>
          <textarea placeholder="html string" rows={15} style={{ background: "rgba(255,255,255, 0.25)", width: "100%", padding: "8px" }} ref={inputRef} />
        </Flex>
        <Flex fullWidth center my={4}>
          <OutlinedButton style={{ padding: "16px" }} onClick={handleSubmit}>
            <Text className={globalStyles.textOrbiBold18}>Add Jobs</Text>
          </OutlinedButton>
        </Flex>
      </Flex>

      <Flex flex={1} column fullHeight pt={4} maxHeight={"100vh"}
        style={{
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {(jobStore.jobs || []).map((job: any, index: number) => {
          return (
            <Flex key={job.id} fullWidth centerY justifyContent={"center"} p={1} cursorPointer
              onClick={handleSelectJob(job, index)}
            >
              <Flex fullWidth justifyContent={"space-between"} centerY bgcolor={job.selected ? "rgba(255,255,255, 0.25)" : "rgba(255,255,255, 0.15)"}
                p={1} borderRadius={"8px"}>
                <Text className={job.selected ? globalStyles.textKanitBold16 : globalStyles.textKanit16}>{job.name}</Text>

                <Flex centerY>
                  <OutlinedButton style={{ background: "rgba(0,0,255,0.25)", marginRight: "8px", border: "none" }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      viewJob(job);
                    }}
                  >
                    <Text>View</Text>
                  </OutlinedButton>
                  <OutlinedButton style={{ background: "rgba(255,0,0,0.5)", border: "none" }}
                    onClick={handleDelete(job)}
                  >
                    <Text>Delete</Text>
                  </OutlinedButton>
                </Flex>
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    </Flex>

    <Flex fullWidth center mt={4} column>
      <OutlinedButton style={{ padding: "16px" }} onClick={handleExportImage}>
        <Text className={globalStyles.textOrbiBold18}>Export Image</Text>
      </OutlinedButton>

      <Flex centerY mt={1}>
        {!state.isLoggedIn ? <FacebookLogin
          appId={fbAppId}
          autoLoad
          callback={responseFacebook}
          fields="name,email,picture"
          icon="fa-facebook"
          cssClass="custom-button"
          render={renderProps => (
            <OutlinedButton style={{ padding: "16px" }} onClick={renderProps.onClick}>
              <Text className={globalStyles.textOrbiBold18}>Login facebook</Text>
            </OutlinedButton>
          )}
        /> : <OutlinedButton style={{ padding: "16px" }} onClick={autoPost}>
          <Text className={globalStyles.textOrbiBold18}>Post facebook</Text>
        </OutlinedButton>}
      </Flex>
    </Flex>

    <Flex fullWidth p={1} mt={4} center>
      <Flex id="export-jobs" p={2} bgcolor={"#1d1c19"}
        minWidth={600} maxWidth={1000} width={"fit-content"} borderRadius={"16px"} column>
        <Flex fullWidth mt={2} center>
          <Text className={globalStyles.textKanitBold16} whiteSpace={"nowrap"}>Job list {formatFullDate(new Date(), {
            year: "numeric",
            month: "numeric",
            day: "2-digit",
          })}</Text>
        </Flex>
        {selectedJobs.map((job: any, index: number) => {
          return <Flex fullWidth key={job.id} centerY my={1} justifyContent={"space-between"}>
            <Flex flex={4}>
              <Flex>
                <Text className={globalStyles.textGeo16} whiteSpace={"nowrap"}>{index + 1}</Text>
              </Flex>
              <Flex ml={1}>
                <Text className={globalStyles.textGeo16} whiteSpace={"nowrap"}>- {job.name}</Text>
              </Flex>
              {job.engLevel && <Flex ml={1}>
                <Text className={globalStyles.textKanit16} whiteSpace={"nowrap"}> - Tiếng anh: {job.engLevel}</Text>
              </Flex>}
            </Flex>

            {job.jobType && <Flex flex={1} pl={8} justifyContent={"flex-end"}>
              <Text className={globalStyles.textKanit16} whiteSpace={"nowrap"}>-#{job.jobType || ""}</Text>
            </Flex>}

          </Flex>
        })}
        <Flex fullWidth mt={2} center>
          <Text className={globalStyles.textKanit16} color={"red"} whiteSpace={"nowrap"}>@Inbox me!!!</Text>
        </Flex>
      </Flex>

    </Flex>

  </Flex>
})




function cleanHTML(html: string): string {
  // Create a DOMParser to parse the HTML string
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // 1. Remove all iframe tags
  const iframes = doc.querySelectorAll('iframe');
  iframes.forEach(iframe => iframe.remove());

  // 2. Remove all svg tags
  const svgs = doc.querySelectorAll('svg');
  svgs.forEach(svg => svg.remove());

  // 3. Remove all class suffixes
  const allElements = doc.querySelectorAll('*');
  allElements.forEach(el => {
    if (el.className) {
      const cleanedClass = el.className
        .split(' ')
        .map(cls => cls.replace(/__[^ ]+$/, ''))
        .join(' ');
      el.className = cleanedClass;
    }
  });

  // 4. remove unuse node
  const unuseNode = doc.querySelector("#my-jobs-other-box");
  unuseNode?.remove()

  // 5. Get #layout-all only
  const selectedElement = doc.querySelector("#layout-all")?.innerHTML;

  // Return the cleaned HTML as a string
  return selectedElement?.toString() || "";
}


const JobDetail = ({ data }: any) => {
  const globalStyles = useGlobalStyles();

  const jobDetail = useMemo(() => {
    return data || {}
  }, [data])

  return <Flex fullWidth column>
    <Flex fullWidth centerY>
      {/* <img src={jobDetail.thumb} style={{ height: 40 }} alt={jobDetail.id} /> */}
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textOrbiBold18} ml={0.5}>
        <span style={{ color: "red" }}>Job: #{jobDetail.jobId}</span> - {jobDetail.name}
      </Text>
    </Flex>

    <Flex fullWidth centerY mt={4}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5}>
        Bonus:
      </Text>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Đậu PV: {jobDetail.goldRef}
        </Text>
      </Flex>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Đi phỏng vấn: {jobDetail.goldItv}
        </Text>
      </Flex>
    </Flex>

    <Flex fullWidth centerY mt={4}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5}>
        Công ty:
      </Text>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} color={"red"} ml={0.5} textTransform={"uppercase"}>
        {jobDetail.companyName}
      </Text>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Đã tuyển: <span style={{ color: "rgb(249, 112, 102)" }}>{jobDetail.cvInprogress}</span>
        </Text>
      </Flex>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Đã mở: <span style={{ color: "rgb(249, 112, 102)" }}>{jobDetail.cvPassed}</span>
        </Text>
      </Flex>
    </Flex>

    <Flex fullWidth centerY mt={2}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5}>
        Công việc:
      </Text>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex fullWidth column style={{
        color: "#006699",
        textAlign: "left",
        whiteSpace: "pre-line",
        fontSize: 14,
      }} dangerouslySetInnerHTML={{ __html: jobDetail.htmlInfo }}>
      </Flex>
    </Flex>
    {/* <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          CVs: {jobDetail.cvInprogress}
        </Text>
      </Flex>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Số lượng: {jobDetail.cvPassed}
        </Text>
      </Flex>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Lương: {jobDetail.grossSalary}
        </Text>
      </Flex>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Số lượng: {jobDetail.number}
        </Text>
      </Flex>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Loại: {jobDetail.jobType}
        </Text>
      </Flex>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Trình độ: {jobDetail.level}
        </Text>
      </Flex>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Địa chỉ:
        </Text>
        <Text textAlign={"left"} className={globalStyles.textKanit16} ml={0.5}>
          {jobDetail.position}
        </Text>
      </Flex>
    </Flex> */}

    <Flex fullWidth centerY mt={1}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5} style={{ textDecoration: "underline" }}>
        Tổng quan:
      </Text>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY style={{
        color: "#006699",
        textAlign: "left",
        whiteSpace: "pre-line",
        fontSize: 14,
      }} dangerouslySetInnerHTML={{ __html: jobDetail.summary }}>
      </Flex>
    </Flex>

    <Flex fullWidth centerY mt={2}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5} style={{ textDecoration: "underline" }}>
        Kỹ năng:
      </Text>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY style={{
        color: "#006699",
        textAlign: "left",
        whiteSpace: "pre-line",
        fontSize: 14,
      }} dangerouslySetInnerHTML={{ __html: jobDetail.skills }}>
      </Flex>
    </Flex>

    <Flex fullWidth centerY mt={2}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5} style={{ textDecoration: "underline" }}>
        Kỹ năng ưu tiên:
      </Text>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY style={{
        color: "#006699",
        textAlign: "left",
        whiteSpace: "pre-line",
        fontSize: 14,
      }} dangerouslySetInnerHTML={{ __html: jobDetail.prioritySkills }}>
      </Flex>
    </Flex>

    <Flex fullWidth centerY mt={2}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5} style={{ textDecoration: "underline" }}>
        Phúc lợi:
      </Text>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY style={{
        color: "#006699",
        textAlign: "left",
        whiteSpace: "pre-line",
        fontSize: 14,
      }} dangerouslySetInnerHTML={{ __html: jobDetail.profit }}>
      </Flex>
    </Flex>

    <Flex fullWidth centerY mt={2}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5} style={{ textDecoration: "underline" }}>
        Note:
      </Text>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY style={{
        color: "#006699",
        textAlign: "left",
        whiteSpace: "pre-line",
        fontSize: 14,
      }} dangerouslySetInnerHTML={{ __html: jobDetail.note }}>
      </Flex>
    </Flex>

  </Flex>
}