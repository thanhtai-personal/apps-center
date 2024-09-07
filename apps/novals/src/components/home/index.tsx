import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { Banner } from "./Banner";
import { Ranking } from "./Ranking";
import { runCategoryStore, runCommentStore, runNovalStore } from "@core-ui/react-novals";

export const HomePageContent = observer(() => {
  
  runNovalStore();
  runCategoryStore();
  runCommentStore();

  return <Flex fullWidth column>
    <Banner />
    <Ranking />
  </Flex>;
})