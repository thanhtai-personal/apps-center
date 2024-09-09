import { observer } from "@core-ui/react-mobx-state";
import { Flex, LazyImage, Text } from "@core-ui/react-mui-core";
import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { useNovalsStore } from "@core-ui/react-novals";
import { useGlobalStyles } from "@/styles/globalStyle";
import { useStore } from "@/store/index";
import { INovalResponse } from "@core-ui/novals-types";


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
    <Flex fullWidth key={noval.id} centerY justifyContent="space-between">
      <Flex column maxWidth="70%">
        <Text className={globalStyle.textKanit16}>NO.1</Text>
        <Text className={globalStyle.textKanit16} textOverflow="ellipsis" whiteSpace="nowrap">{noval.name}</Text>
        <Text color={uiStore.colors.red} className={globalStyle.textKanit16}>
          {`${noval[sortKey] || 0} ${description}`}
        </Text>
      </Flex>
    </Flex>
  );

  const renderOtherItem = (noval: INovalResponse, index: number) => (
    <Flex fullWidth key={noval.id} centerY justifyContent="space-between">
      <Flex centerY maxWidth="80%">
        <Text className={globalStyle.textKanit16}>{index + 1}</Text>
        <Text className={globalStyle.textKanit16} ml={1} maxWidth="80%" textOverflow="ellipsis" whiteSpace="nowrap">
          {noval.name}
        </Text>
      </Flex>
      <Text className={globalStyle.textKanit14} color={uiStore.colors.gray}>
        {noval[sortKey] || 0}
      </Text>
    </Flex>
  );

  return (
    <Flex fullWidth column>
      {renderHeader()}
      <Flex fullWidth column borderTop="solid 1px rgba(255,255,255, 0.1)">
        {novals.map((noval, index) => 
          index === 0 ? renderTopItem(noval) : renderOtherItem(noval, index)
        )}
      </Flex>
    </Flex>
  );
})


export const Ranking = observer(() => {
  const { novalStore } = useNovalsStore();

  return (
    <Flex fullWidth center>
      <Flex mt={1} py={2} fullWidth center borderTop={"solid 1px rgba(255,255,255, 0.1)"} maxWidth={PAGE_MAX_WIDTH}>
        <Flex flex={1} column fullHeight>
          <RankingList novals={novalStore.topVote || []} title="Đề cử" sortKey="star" description="Đề cử" />
        </Flex>

        <Flex flex={1} column fullHeight>
          <RankingList novals={novalStore.topView || []} title="Xem nhiều" sortKey="like" description="Lượt xem"  />
        </Flex>

        <Flex flex={1} column fullHeight>
          <RankingList novals={novalStore.topLike || []} title="Yêu thích" sortKey="like" description="Lượt thích"  />
        </Flex>

        <Flex flex={1} column fullHeight>
          <RankingList novals={novalStore.topFollow || []} title="Theo dõi" sortKey="follow" description="Lượt theo dõi"  />
        </Flex>
      </Flex >
    </Flex>
  );
});