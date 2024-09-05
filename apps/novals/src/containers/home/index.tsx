import { PageLayout } from "@/components/layout";
import { useStore } from "@/store/index";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text } from "@core-ui/react-mui-core";

const HomePage = () => {
  const { uiStore } = useStore();

  return (
    <PageLayout>
      <Flex fullWidth>
        <Text color={uiStore.colors.black}>
        </Text>
      </Flex>
    </PageLayout>
  )
}

export default observer(HomePage)
