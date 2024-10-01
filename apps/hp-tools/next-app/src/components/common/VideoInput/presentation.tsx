import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import { Button, TextField } from "@material-ui/core";
import { useGlobalStyle } from "src/styles";
import useLocalize from "src/hooks/useLocalize";
import { useVideoSelectorStyle } from "./styles";
import CloseIcon from "@material-ui/icons/Close";

const VideosPresentation = (props) => {
  const {
    height,
    label,
    setEmbedCode,
    onAddVideo,
    videos,
    embededCode,
    onRemoveVideo,
  } = props;
  const { t } = useLocalize();
  const globalClasses = useGlobalStyle(props);
  const classes = useVideoSelectorStyle(props);

  return (
    <Flex
      width={"100%"}
      height={"100%"}
      minHeight={height}
      column
      border={"solid 1px rgba(0,0,0,0.24)"}
      borderRadius={"1rem"}
    >
      <Flex width={"100%"} p={2} column>
        <Flex>
          <Text className={globalClasses.labelText}>{label}</Text>
        </Flex>
        <Flex width={"100%"} minHeight={250} center column>
          {(videos || []).map((videoCode) => (
            <Flex>
              <div dangerouslySetInnerHTML={{ __html: videoCode }}></div>
              <Button onClick={() => onRemoveVideo && onRemoveVideo(videoCode)}>
                <CloseIcon style={{ width: 24, height: 24 }} />
              </Button>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex mt={4} borderRadius={"1rem"} border={"solid 1px rgba(0,0,0, 0.2)"}>
        <Flex flex={1} column py={4} px={2}>
          <Flex column width={"100%"}>
            <Text className={globalClasses.labelText}>Youtube embed code:</Text>
            <TextField
              onChange={(e) => setEmbedCode(e.target.value)}
              value={embededCode}
              multiline
              minRows={5}
              variant={"standard"}
              style={{
                border: "solid 1px rgba(0,0,0, 0.25)",
                borderRadius: ".5rem",
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Flex>
          <Flex justifyContent={"flex-end"} my={2}>
            <Button variant="contained" onClick={onAddVideo}>
              Add
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VideosPresentation;
