import Flex from "src/components/common/Flex";
import useLocalize from "src/hooks/useLocalize";
import useSelector from "src/hooks/useSelector";
import { useSliderStyle } from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import LazyLoadImage from "src/components/common/LazyImage";

SwiperCore.use([Autoplay]);

const renderItem = (item) => {
  return (
    <Flex width={"100%"} cursor={"pointer"}>
      <LazyLoadImage src={item.url} style={{ width: "100%" }} />
    </Flex>
  );
};

const Slider = (props) => {
  const classes = useSliderStyle(props);
  const localizeState = useSelector((state) => state.localize);
  const { t } = useLocalize(localizeState.key);
  const { sliderImagesDataList } = useSelector((state) => state.home);

  return (
    <Flex
      width={"100%"}
      className={classes.root}
      center
      centerY
      position={"relative"}
      column
    >
      <Flex width={"100%"} height={"100%"} center overflow={"hidden"}>
        <Swiper slidesPerView={1} effect={"slide"} autoplay={{ delay: 7000 }}>
          {[...sliderImagesDataList].map((item, index) => (
            <SwiperSlide key={`${item.id}-${index}`}>
              {renderItem(item)}
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
    </Flex>
  );
};

export default Slider;
