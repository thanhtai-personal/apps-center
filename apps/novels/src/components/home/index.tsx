import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { Banner } from "./Banner";
import { Ranking } from "./Ranking";
import { Footer } from "./Footer";
import { runCategoryStore, runCommentStore, runNovelStore, useNovelsStore } from "@core-logic-hooks/react-novels";
import { IntersectionObserverView } from "@core-ui/react-viewframe";
import { Animates } from "@core-ui/react-animates";

export const HomePageContent = observer(() => {
  const { novelStore } = useNovelsStore();

  runNovelStore();
  runCategoryStore();
  runCommentStore();

  return <Flex fullWidth column>
    <Banner />
    <IntersectionObserverView>
      <Animates.SlideUpAppear delay={1}>
        <Ranking />
      </Animates.SlideUpAppear>
    </IntersectionObserverView>
    <Footer />
  </Flex>;
})