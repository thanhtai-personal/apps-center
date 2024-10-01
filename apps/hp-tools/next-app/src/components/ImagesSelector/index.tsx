import { useCallback, useEffect, useRef, useState } from "react";
import { uploadImage, getImage } from "libs/firebase";
import { NotiStackInstance } from "pages/_app";
import { createImage } from "src/actions/image.actions";
import Presentation from "./presentation";

interface ImagesSelectorProps {
  item: any;
  viewMode?: boolean;
  height?: number | string;
  width?: number | string;
}

const ImagesSelectorComponent = (props: ImagesSelectorProps) => {
  const { item, viewMode, height, width } = props;
  const [url, setUrl] = useState("");
  const [searchImages, setSearchImages] = useState([]);
  const [paging, setPaging] = useState({
    page: 1,
    total: 0,
    size: 20,
  });
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [name, setName] = useState("");
  const {
    searchImagesAction,
    selectedImages,
    selectImage,
    unselectImage,
    id,
    label,
    updateFilter,
    multipleSelect,
    loading,
  } = item;
  const inputSearchRef: any = useRef();

  const handleSearch = useCallback(() => {
    if (!inputSearchRef?.current?.value) return;
    (async () => {
      try {
        setLoadingSearch(true);
        const response = await searchImagesAction({
          alt_name: { regex: inputSearchRef?.current?.value },
        });
        setSearchImages(response.data?.data || []);
        setPaging((prev) => ({
          ...prev,
          total: response.data?.total,
        }));
      } catch (error) {
        NotiStackInstance.push({
          variant: "error",
          children: "Search images failed!",
        });
      } finally {
        setLoadingSearch(false);
      }
    })();
  }, [setSearchImages, setLoadingSearch, searchImagesAction]);

  const handleChangeSearchText = useCallback(
    (e: any) => {
      updateFilter &&
        updateFilter({
          alt_name: { regex: e.target.value },
        });
    },
    [updateFilter]
  );

  const handleEnterSearchText = useCallback((e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }, []);

  const handleUpload = async (e: any) => {
    try {
      const file = e.target.files[0];
      const firebaseImage: any = await uploadImage(file, `images/${file.name}`);
      const downloadUrl: string = await getImage(
        firebaseImage.metadata.fullPath
      );

      if (downloadUrl) {
        await createImage({
          url: downloadUrl,
          alt_name: file.name,
        });
      }
    } catch (error) {
      console.log("error", error);
      NotiStackInstance.push({
        children: "Upload image error!",
        variant: "error",
      });
    }
  };

  const handleSelectImage = (image: any) => () => {
    selectImage &&
      selectImage(
        multipleSelect ? [image, ...(selectedImages || [])] : [image]
      );
  };

  const handleUnselectImage = (image: any) => () => {
    if (!multipleSelect) return;
    selectImage &&
      selectImage(
        (selectedImages || []).filter((img) => img._id !== image._id)
      );
  };

  const handleAddImageUrl = async () => {
    try {
      const uploadedImage = await createImage({
        url: url,
        alt_name: name,
      });
      NotiStackInstance.push({
        children: "created image",
        variant: "success",
      });
      handleSearch();
    } catch (error) {
      NotiStackInstance.push({
        children: "created image failed",
        variant: "error",
      });
    }
  };

  return (
    <Presentation
      height={height}
      width={width}
      selectedImages={selectedImages}
      handleChangeSearchText={handleChangeSearchText}
      handleEnterSearchText={handleEnterSearchText}
      searchImages={searchImages}
      handleUpload={handleUpload}
      handleSelectImage={handleSelectImage}
      handleUnselectImage={handleUnselectImage}
      addImageUrl={handleAddImageUrl}
      id={id}
      label={label}
      setUrl={setUrl}
      setName={setName}
      loadingSearch={loadingSearch}
      loading={loading}
      inputSearchRef={inputSearchRef}
    />
  );
};

export default ImagesSelectorComponent;
