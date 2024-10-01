import useSelector from "src/hooks/useSelector";
import Flex from "../Flex";
import { fieldStyles } from "./styles";

interface FieldProps {
  model: any;
}

const FormField = (props: FieldProps) => {
  const classes = fieldStyles();
  const { model } = props;
  const { render, selector = (state) => ({}), ...nestedProps } = model;
  const storeData = useSelector(selector);

  return (
    <Flex width={"100%"} marginTop={"8px"} my={2}>
      {render({ ...nestedProps, ...storeData })}
    </Flex>
  );
};
export default FormField;
