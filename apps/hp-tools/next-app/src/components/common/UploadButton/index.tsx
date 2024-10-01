import { IconButton } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Flex from "src/components/common/Flex";

const UploadButton = (props: any) => {
  const { handleUpload, ...otherProps } = props;

  return (
    <Flex center title={"Upload image"} column width={"100%"}>
      <Flex
        width={75}
        height={75}
        m={1}
        borderRadius={"8px"}
        border={props.noBorder ? "unset" : "solid 1px rgb(31, 199, 212)"}
        center
        {...otherProps}
      >
        <IconButton color="primary" component="label">
          <input
            hidden
            accept="image/*"
            multiple={false}
            type="file"
            onChange={handleUpload}
          />
          <PhotoCamera />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default UploadButton;
