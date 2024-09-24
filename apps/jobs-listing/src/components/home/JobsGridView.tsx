import { observer } from "@core-ui/react-mobx-state"
import { Flex } from "@core-ui/react-mui-core"

export interface IJobsGridViewProps {
  data: any[];
  paging?: any;
  title?: string;
}

export const JobsGridView = observer(({ }: IJobsGridViewProps) => {
  
  return <Flex fullWidth column></Flex>
})