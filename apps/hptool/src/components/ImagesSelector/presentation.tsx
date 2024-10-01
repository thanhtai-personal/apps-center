import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import UploadButton from "src/components/common/UploadButton";
import { Button, TextField } from "@material-ui/core";
import { useGlobalStyle } from "src/styles";
import useLocalize from "src/hooks/useLocalize";
import { useImageSelectorStyle } from "./styles";
import SearchIcon from "@material-ui/icons/Search";
import LazyLoadImage from "../common/LazyImage";
import LoadingPage from "../LoadingPage";

const ImagesPresentation = (props) => {
  const {
    height,
    selectedImages = [],
    handleChangeSearchText,
    searchImages,
    handleUpload,
    id,
    handleSelectImage,
    handleUnselectImage,
    label,
    addImageUrl,
    setUrl,
    setName,
    handleEnterSearchText,
    loadingSearch,
    loading,
    inputSearchRef,
    width,
  } = props;
  const { t } = useLocalize();
  const globalClasses = useGlobalStyle(props);
  const classes = useImageSelectorStyle(props);

  return (
    <Flex
      width={"100%"}
      maxWidth={width || "unset"}
      height={"100%"}
      minHeight={height}
      column
      border={"solid 1px rgba(0,0,0,0.24)"}
      borderRadius={"1rem"}
    >
      {loading ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <>
          <Flex width={"100%"} p={2} column>
            <Flex>
              <Text className={globalClasses.labelText}>{label}</Text>
            </Flex>
            <Flex
              width={"100%"}
              height={250}
              flexWrap={"wrap"}
              style={{
                overflowY: "auto",
              }}
            >
              {[...(selectedImages || [])].map((image: any) => (
                <Flex
                  width={100}
                  height={100}
                  key={image._id}
                  m={2}
                  borderRadius={".5rem"}
                  border={"solid 4px rgba(0,0,0, 0.5)"}
                  onClick={handleUnselectImage(image)}
                  cursor={"pointer"}
                >
                  <LazyLoadImage
                    src={image.url}
                    alt={image.alt_name}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Flex>
              ))}
            </Flex>
          </Flex>

          <Flex
            mt={4}
            borderRadius={"1rem"}
            border={"solid 1px rgba(0,0,0, 0.2)"}
          >
            <Flex column flex={2} p={2}>
              <Flex
                width={"100%"}
                center
                border="solid 1px rgba(0,0,0,0.12)"
                borderRadius="1rem"
                p={1}
              >
                <TextField
                  variant="standard"
                  fullWidth
                  id={id}
                  inputRef={inputSearchRef}
                  placeholder={t("Enter to search")}
                  aria-describedby={`${id}-helper-text`}
                  onChange={handleChangeSearchText}
                  onKeyDown={handleEnterSearchText}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
                <SearchIcon
                  style={{ width: 24, height: 24, marginLeft: "16px" }}
                />
              </Flex>
              <Flex
                width={"100%"}
                flexWrap={"wrap"}
                p={2}
                centerX
                mt={2}
                maxHeight={350}
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {loadingSearch ? (
                  <>
                    <Text>Searching...</Text>
                  </>
                ) : (
                  (searchImages || [])
                    .filter((image) => {
                      const imageIdx = selectedImages.findIndex(
                        (img) => img._id === image._id
                      );
                      return imageIdx === -1;
                    })
                    .map((image: any) => (
                      <Flex
                        width={100}
                        height={100}
                        key={image._id}
                        m={2}
                        borderRadius={".5rem"}
                        border={"solid 4px rgba(0,0,0, 0.5)"}
                        onClick={handleSelectImage(image)}
                        cursor={"pointer"}
                      >
                        <LazyLoadImage
                          src={image.url}
                          alt={image.alt_name}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </Flex>
                    ))
                )}
              </Flex>
            </Flex>
            <Flex
              flex={1}
              column
              py={4}
              px={2}
              borderLeft={"solid 1px rgba(0,0,0, 0.2)"}
            >
              <Flex column center>
                <UploadButton handleUpload={handleUpload} />
                <Text className={globalClasses.labelText}>Upload</Text>
              </Flex>

              <Flex
                position={"relative"}
                center
                borderBottom={"solid 1px black"}
                my={4}
              >
                <Text
                  className={globalClasses.text}
                  style={{
                    transform: "translateY(14px)",
                    background: "#FFF",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                  }}
                >
                  OR
                </Text>
              </Flex>

              <Flex column width={"100%"}>
                <Text className={globalClasses.labelText}>URL:</Text>
                <TextField
                  onChange={(e) => setUrl(e.target.value)}
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
              <Flex column width={"100%"} mt={1}>
                <Text className={globalClasses.labelText}>Name:</Text>
                <TextField
                  onChange={(e) => setName(e.target.value)}
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
              <Flex width={"100%"} justifyContent={"flex-end"} mt={2}>
                <Button
                  className={globalClasses.buttonText}
                  variant="contained"
                  onClick={addImageUrl}
                >
                  Save Image
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default ImagesPresentation;
