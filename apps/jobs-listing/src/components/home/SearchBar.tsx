import { useGlobalStyles } from "@/styles/globalStyle"
import { PAGE_MAX_WIDTH } from "@/utils/constants"
import { runCategoryStore, useJobsData, useJobsListingStore } from "@core-ui/react-job-listing"
import { observer } from "@core-ui/react-mobx-state"
import { Flex, OutlinedButton, Text } from "@core-ui/react-mui-core"
import { useEffect } from "react"
import { Input } from "@core-ui/react-mui-core/materials"
import { useLocalStorageData } from "@core-utils/react-hooks"

export interface ISearchBarProps {
}

export const SearchBar = observer(({ }: ISearchBarProps) => {
  const globalStyle = useGlobalStyles();
  const { categoryStore, jobStore } = useJobsListingStore();
  const [activeCategory, setActiveCategory] = useLocalStorageData("active-category");

  const { refetch } = useJobsData();

  useEffect(() => {
    const localData = localStorage.getItem("active-category")
    if (categoryStore.categories?.data?.[0] && !activeCategory && !localData) {
      setActiveCategory(categoryStore.categories?.data?.[0].id)
    }
  }, [categoryStore.categories, activeCategory])

  useEffect(() => {
    categoryStore.activeCateId = activeCategory;
    jobStore.filterData.category = activeCategory;
    jobStore.filterData.offset = 0;
    refetch?.();
  }, [activeCategory])

  runCategoryStore();

  return <Flex fullWidth my={1} center column>
    <Flex fullWidth maxWidth={PAGE_MAX_WIDTH} border={"solid 1px rgba(255,255,255, 0.1)"} p={1} column>
      <Flex fullWidth>
        <Text mt={1} whiteSpace={"nowrap"} className={globalStyle.textKanitBold18}>Loại công việc: </Text>
        <Flex fullWidth flexWrap={"wrap"} ml={2}>
          {(categoryStore.categories?.data || []).map((category) => (
            <Flex key={category.id} px={3} py={1} border={"solid 1px rgba(255,255,255, 0.3)"} m={1} borderRadius={"8px"}
              cursorPointer onClick={() => setActiveCategory?.(category.id)}
            >
              <Text whiteSpace={"nowrap"} className={globalStyle.textKanit16} color={activeCategory === category.id ? "red" : "#FFF"}>
                {category.name}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex fullWidth centerY p={1} py={2}>
        <Text whiteSpace={"nowrap"} className={globalStyle.textKanitBold18}>Search: </Text>
        <Flex ml={2} p={0.5} px={2} border={"solid 1px rgba(255,255,255,0.2)"} borderRadius={"8px"}>
          <Input placeholder="Tìm kiếm" fullWidth
            onChange={(event: any) => {
              jobStore.filterData.query = event.target.value;
            }}
          />
          <OutlinedButton style={{ marginLeft: 8, padding: "8px 16px", border: "none" }}>
            <Text whiteSpace={"nowrap"} className={globalStyle.textKanitBold18}
              onClick={() => {
                jobStore.filterData.offset = 0;
                refetch?.()
              }}
            >Tìm</Text>
          </OutlinedButton>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
})