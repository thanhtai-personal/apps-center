import { useGlobalStyles } from "@/styles/globalStyle";
import { useCrawler, useJobsData, useJobsListingStore } from "@core-ui/react-recruiter";
import { observer, useLocalObservable } from "@core-ui/react-mobx-state";
import { Flex, OutlinedButton, Text } from "@core-ui/react-mui-core";
import { waitMs } from "@core-utils/utils-helpers";
import { useRef, useTransition } from "react";

export const JobInputForm = observer(({ }: any) => {
  const state = useLocalObservable(() => ({
    loading: false,
  }))
  const { categoryStore } = useJobsListingStore();
  const globalStyles = useGlobalStyles();
  const { refetch } = useJobsData();

  const inputRef = useRef<any>();
  const inputIdRef = useRef<any>();
  const categoryRef = useRef<any>();
  const { exportAnydayJob } = useCrawler();
  const [isPending, startTransition] = useTransition();

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

  return (
    <Flex fullWidth column>
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
        <textarea placeholder="html string" rows={15} style={{ background: "rgba(255,255,255, 0.25)", width: "100%", padding: "8px", color: "#fff" }} ref={inputRef} />
      </Flex>
      <Flex fullWidth center my={4}>
        <OutlinedButton style={{ padding: "16px" }} onClick={handleSubmit}>
          <Text className={globalStyles.textOrbiBold18}>Thêm công việc</Text>
        </OutlinedButton>
      </Flex>
    </Flex>
  )
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