import { observer } from "@core-ui/react-mobx-state";
import { Flex, LazyImage, ResponsiveFlex4Column, Text, useResponsive } from "@core-ui/react-mui-core";
import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { useNovelsStore } from "@core-ui/react-novels";
import { useGlobalStyles } from "@/styles/globalStyle";
import { useStore } from "@/store/index";
import { INovelResponse } from "@core-ui/novels-types";
import { Link } from "@core-ui/react-core";


export const Ranking = observer(() => {
  const { novelStore } = useNovelsStore();
  const { tabletSizeDown, webviewSizeDown } = useResponsive();

  return (
    <Flex fullWidth center>
      <Flex mt={1} p={2} fullWidth centerX
        borderTop={"solid 1px rgba(255,255,255, 0.1)"}
        maxWidth={PAGE_MAX_WIDTH}
        overflow={"hidden"}
      >
        <ResponsiveFlex4Column
          items={[
            <RankingList novels={novelStore.topVote || []} title="Đề cử" sortKey="star" description="Đề cử" />,
            <RankingList novels={novelStore.topView || []} title="Xem nhiều" sortKey="like" description="Lượt xem" />,
            <RankingList novels={novelStore.topLike || []} title="Yêu thích" sortKey="like" description="Lượt thích" />,
            <RankingList novels={novelStore.topFollow || []} title="Theo dõi" sortKey="follow" description="Lượt theo dõi" />
          ]}
        />
      </Flex >
    </Flex>
  );
});


const RankingList = observer(({ novels, title, description, sortKey }: {
  novels: INovelResponse[];
  title: string,
  description: string,
  sortKey: string;
}) => {
  const globalStyle = useGlobalStyles();
  const { uiStore } = useStore();

  const renderHeader = () => (
    <Flex fullWidth justifyContent="space-between" centerY p={2}>
      <Text className={globalStyle.textKanit16}>{title}</Text>
      <Flex centerY className={globalStyle.hoverUnderline}>
        <Text className={globalStyle.textKanit16} color={uiStore.colors.gray}>Tất cả</Text>
      </Flex>
    </Flex>
  );

  const renderTopItem = (novel: INovelResponse) => (
    <Link key={novel.id} to={`/novel/${novel.id}`} target={`novel_${novel.id}`}>
      <Flex fullWidth centerY justifyContent="space-between" cursorPointer>
        <Flex column>
          <Text className={globalStyle.textKanitBold16} color={uiStore.colors.red}>NO.1</Text>
          <Text className={globalStyle.textKanit16} color={uiStore.colors.green}>{novel.name}</Text>
          <Text color={uiStore.colors.red} className={globalStyle.textKanit16}>
            {`${novel[sortKey] || 0} ${description}`}
          </Text>
        </Flex>

        <Flex ml={2} p={2}>
          <LazyImage src={novel.thumb} style={{ height: 180, borderRadius: "16px" }}
            imgStyle={{ height: 180, borderRadius: "16px", }}
          />
        </Flex>
      </Flex>
    </Link>
  );

  const renderOtherItem = (novel: INovelResponse, index: number) => (
    <Link key={novel.id} to={`/novel/${novel.id}`} target={`novel_${novel.id}`}>
      <Flex fullWidth key={novel.id} justifyContent="space-between" cursorPointer>
        <Flex>
          <Text className={globalStyle.textKanit16}>{index + 1}</Text>
          <Text overflow={"hidden"}
            textAlign={"start"}
            className={globalStyle.textKanit16} ml={1}>
            {novel.name}
          </Text>
        </Flex>
        <Text ml={1} className={globalStyle.textKanit14} color={uiStore.colors.gray}>
          {novel[sortKey] || 0}
        </Text>
      </Flex>
    </Link>
  );

  return (
    <Flex fullWidth column px={2} overflow={"hidden"}>
      {renderHeader()}
      <Flex fullWidth column borderTop="solid 1px rgba(255,255,255, 0.1)">
        {novels.map((novel, index) =>
          index === 0 ? renderTopItem(novel) : renderOtherItem(novel, index)
        )}
      </Flex>
    </Flex>
  );
})