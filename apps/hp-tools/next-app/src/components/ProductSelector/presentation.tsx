import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import { useGlobalStyle } from "src/styles";
import useLocalize from "src/hooks/useLocalize";
import { useProductSelectorStyle } from "./styles";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const ProductSelectorPresentation = (props) => {
  const { height, label, searchText, setSearchText, products = [] } = props;
  const { t } = useLocalize();
  const globalClasses = useGlobalStyle(props);
  const classes = useProductSelectorStyle(props);

  return (
    <Flex
      width={"100%"}
      height={"100%"}
      column
      minHeight={height}
      border={"solid 1px rgba(0,0,0,0.24)"}
      borderRadius={"1rem"}
      p={2}
    >
      <Text className={globalClasses.labelText}>{label}</Text>
      <Flex width={"100%"} minHeight={150}></Flex>
      <Flex
        width={"100%"}
        borderTop={"solid 1px rgba(0,0,0, 0.25)"}
        pt={4}
        column
      >
        <Flex
          width={"100%"}
          borderRadius={".5rem"}
          border={"solid 1px rgba(0,0,0, 0.24)"}
          p={1}
          centerY
        >
          <TextField
            variant="standard"
            fullWidth
            placeholder="Search products"
            InputProps={{
              disableUnderline: true,
            }}
          />
          <SearchIcon style={{ width: 24, height: 24, marginLeft: "16px" }} />
        </Flex>
        <Flex width={"100%"}></Flex>
      </Flex>
    </Flex>
  );
};

export default ProductSelectorPresentation;
