import { observer } from "@core-ui/react-mobx-state";
import { Flex, LazyImage, Text } from "@core-ui/react-mui-core";
import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { useNovalsStore } from "@core-ui/react-novals";
import { useGlobalStyles } from "@/styles/globalStyle";
import { useStore } from "@/store/index";
import { INovalResponse } from "@core-ui/novals-types";
import { Link } from "@core-ui/react-core";


export const Ranking = observer(() => {
  const { novalStore } = useNovalsStore();

  return (
    <Flex fullWidth center>
      <Flex mt={1} p={2} fullWidth centerX
        borderTop={"solid 1px rgba(255,255,255, 0.1)"}
        maxWidth={PAGE_MAX_WIDTH}
        overflow={"hidden"}
      >
        <Flex flex={1} column overflow={"hidden"}>
          <RankingList novals={novalStore.topVote || []} title="Đề cử" sortKey="star" description="Đề cử" />
        </Flex>

        <Flex flex={1} column overflow={"hidden"}>
          <RankingList novals={novalStore.topView || []} title="Xem nhiều" sortKey="like" description="Lượt xem" />
        </Flex>

        <Flex flex={1} column overflow={"hidden"}>
          <RankingList novals={novalStore.topLike || []} title="Yêu thích" sortKey="like" description="Lượt thích" />
        </Flex>

        <Flex flex={1} column overflow={"hidden"}>
          <RankingList novals={novalStore.topFollow || []} title="Theo dõi" sortKey="follow" description="Lượt theo dõi" />
        </Flex>
      </Flex >
    </Flex>
  );
});


const RankingList = observer(({ novals, title, description, sortKey }: {
  novals: INovalResponse[];
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

  const renderTopItem = (noval: INovalResponse) => (
    <Link key={noval.id} to={`/noval/${noval.id}`} target={`noval_${noval.id}`}>
      <Flex fullWidth centerY justifyContent="space-between" cursorPointer>
        <Flex column>
          <Text className={globalStyle.textKanitBold16} color={uiStore.colors.red}>NO.1</Text>
          <Text className={globalStyle.textKanit16} color={uiStore.colors.green}>{noval.name}</Text>
          <Text color={uiStore.colors.red} className={globalStyle.textKanit16}>
            {`${noval[sortKey] || 0} ${description}`}
          </Text>
        </Flex>

        <Flex ml={2} p={2}>
          <LazyImage src={noval.thumb} style={{ height: 180, borderRadius: "16px" }}
            imgStyle={{ height: 180, borderRadius: "16px", }}
          />
        </Flex>
      </Flex>
    </Link>
  );

  const renderOtherItem = (noval: INovalResponse, index: number) => (
    <Link key={noval.id} to={`/noval/${noval.id}`} target={`noval_${noval.id}`}>
      <Flex fullWidth key={noval.id} justifyContent="space-between" cursorPointer>
        <Flex>
          <Text className={globalStyle.textKanit16}>{index + 1}</Text>
          <Text overflow={"hidden"}
            textAlign={"start"}
            className={globalStyle.textKanit16} ml={1}>
            {noval.name}
          </Text>
        </Flex>
        <Text ml={1} className={globalStyle.textKanit14} color={uiStore.colors.gray}>
          {noval[sortKey] || 0}
        </Text>
      </Flex>
    </Link>
  );

  return (
    <Flex fullWidth column px={2} overflow={"hidden"}>
      {renderHeader()}
      <Flex fullWidth column borderTop="solid 1px rgba(255,255,255, 0.1)">
        {novals.map((noval, index) =>
          index === 0 ? renderTopItem(noval) : renderOtherItem(noval, index)
        )}
      </Flex>
    </Flex>
  );
})