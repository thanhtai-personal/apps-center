import { useStore } from "@/store/index";
import { useGlobalStyles } from "@/styles/globalStyle";
import { observer, useLocalObservable } from "@core-ui/react-mobx-state";
import { Flex, LazyImage, OutlinedButton, Text, useResponsive } from "@core-ui/react-mui-core";
import { Drawer } from "@core-ui/react-mui-core/materials";
import { runJobs, useCrawler, useJobsListingStore, useJobsData, runCategoryStore } from "@core-ui/react-job-listing";
import { formatFullDate, waitMs } from "@core-utils/utils-helpers";
import { useEffect, useLayoutEffect, useMemo, useRef, useTransition } from "react";
import { toPng } from 'html-to-image';
// import FacebookLogin from 'react-facebook-login';

import "./custom.style.css";
import { JobDetail } from "@/components/JobDetail";
import { SearchBar } from "@/components/home/SearchBar";

// const fbApiVersion = "v20.0"
// const fbAppId = "1058569359238393"

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
  const { jobStore, categoryStore, notiStore } = useJobsListingStore();
  const { uiStore } = useStore();
  const globalStyles = useGlobalStyles();
  const inputRef = useRef<any>();
  const inputIdRef = useRef<any>();
  const categoryRef = useRef<any>();
  const { exportAnydayJob } = useCrawler();
  const [isPending, startTransition] = useTransition();

  const { deleteJob, viewJob, refetch, selectJob, clearSelectedJobs } = useJobsData();

  useEffect(() => {
    jobStore.filterData.limit = 99999;
    refetch?.();
  }, [])

  const handleSubmit = async () => {
    if (state.loading) return;
    state.loading = true;
    if (inputIdRef.current.value && inputRef.current.value) {
      const trimHtmlStr = cleanHTML(inputRef.current.value);
      await exportAnydayJob(inputIdRef.current.value, categoryRef.current.value, trimHtmlStr);
      refetch();
    }
    await waitMs(1000);
    startTransition(() => {
      state.loading = false;
    })
  }

  runJobs();
  runCategoryStore();

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

  const handleSelectJob = (job: any) => () => {
    selectJob(job)
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

  const { tabletSizeDown } = useResponsive();

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
        const job = jobStore.selectedJobs[jobIndex];
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

  const selectedJobIds = useMemo(() => {
    return (jobStore.selectedJobs || []).map(job => job.id)
  }, [jobStore.selectedJobs])

  return <Flex fullWidth column>

    <Flex fullWidth column={tabletSizeDown}>
      <Flex flex={1} fullWidth p={1} mt={4} center column>
        <Flex px={2} centerY>
          <Text className={globalStyles.textKanitBold18}>
            Text copy để đăng bài
          </Text>
          <OutlinedButton onClick={handleCopy} style={{ border: "none", marginLeft: "12px" }}>Copy</OutlinedButton>
        </Flex>
        <Flex fullWidth px={2} mt={2}>
          <textarea rows={8} ref={postContentRef} style={{ background: "rgba(255,255,255, 0.25)", width: "100%", padding: "8px" }} />
        </Flex>
      </Flex>

      <Flex flex={1} fullWidth p={1} mt={4} center column>
        <Flex id="export-jobs" p={2} bgcolor={"#1d1c19"}
          minWidth={600} maxWidth={1000} width={"fit-content"} borderRadius={"16px"} column>
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

        <Flex mt={2}>
          <OutlinedButton style={{ padding: "16px" }} onClick={handleExportImage}>
            <Text className={globalStyles.textOrbiBold14}>Export Image</Text>
          </OutlinedButton>
          <OutlinedButton style={{ padding: "16px", marginLeft: "16px" }} onClick={clearSelectedJobs}>
            <Text className={globalStyles.textOrbiBold14}>Clear</Text>
          </OutlinedButton>
        </Flex>
      </Flex>
    </Flex>

    <Flex fullWidth center mt={4} column>
      {/* 
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
      </Flex> */}
    </Flex>

    <Flex fullWidth center>

      <Flex fullWidth column flex={1}>
        <Flex px={2}>
          <Text className={globalStyles.textKanitBold18}>
            Form nhập dữ liệu công việc:
          </Text>
        </Flex>
        <Flex fullWidth p={2}>
          <input ref={inputIdRef} type="text" style={{ width: "100%", background: "rgba(255,255,255, 0.25)", padding: "8px" }} placeholder="id"></input>
        </Flex>
        <Flex mt={1} px={2} column>
          <Text textAlign={"left"}>Category:</Text>
          <select className="custom-select"
            defaultValue={categoryStore.categories?.data?.[0]?.id}
            ref={categoryRef}>
            {(categoryStore.categories?.data || []).map((category: any) => {
              return <option key={category.id} value={category.id}>{category.name}</option>
            })}
          </select>
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

      <Flex flex={1} column fullHeight pt={4}>
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