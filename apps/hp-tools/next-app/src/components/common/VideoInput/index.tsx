import { useState } from "react";
import Presentation from "./presentation";

interface ImagesSelectorProps {
  item: any;
  height?: number | string;
}

const VideoInput = (props: ImagesSelectorProps) => {
  const { item, height } = props;
  const [embededCode, setEmbedCode] = useState("");
  const { id, label, selector, updateVideos, videos } = item;

  const handleAddVideo = async () => {
    try {
      updateVideos && updateVideos([...(videos || []), embededCode]);
      setEmbedCode("");
    } catch (error) {}
  };

  const handleRemoveVideo = async (v) => {
    try {
      updateVideos && updateVideos(videos.filter((_v) => _v !== v));
      setEmbedCode("");
    } catch (error) {}
  };

  return (
    <Presentation
      height={height}
      id={id}
      label={label}
      setEmbedCode={setEmbedCode}
      onAddVideo={handleAddVideo}
      onRemoveVideo={handleRemoveVideo}
      videos={videos}
      embededCode={embededCode}
    />
  );
};

export default VideoInput;
