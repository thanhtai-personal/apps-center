import Flex from "src/components/common/Flex";
import useLocalize from "src/hooks/useLocalize";
import useSelector from "src/hooks/useSelector";
import { useBranchsStyle } from "./styles";
import { useEffect, useMemo, useState } from "react";
import { searchBranchs } from "src/actions/branch.actions";
import { isEmpty } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import { useMediaQuery, useTheme } from "@material-ui/core";
import LazyLoadImage from "src/components/common/LazyImage";
import ContentLoader from "react-content-loader";

SwiperCore.use([Autoplay]);

const Branchs = (props) => {
  const classes = useBranchsStyle(props);
  const localizeState = useSelector((state) => state.localize);
  const { t } = useLocalize(localizeState.key);
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { branchsDataList } = useSelector((state) => state.home);
  const { branchs } = useSelector((state) => state.branchs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await searchBranchs({});
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const mappingBranch = (_branchs) =>
    _branchs
      .filter((item) => item.logoObj)
      .map((item) => ({
        image: item.logoObj?.url,
        name: item.name,
        id: item._id,
      }));

  const showingBranchs = useMemo(
    () =>
      mappingBranch(
        branchsDataList && !isEmpty(branchsDataList)
          ? branchsDataList
          : branchs && !isEmpty(branchs)
          ? branchs
          : []
      ),
    [branchsDataList, branchs]
  );
  return (
    <Flex
      width={"100%"}
      className={classes.root}
      center
      my={10}
      position={"relative"}
      column
    >
      <Flex
        width={"100%"}
        height={"100%"}
        center
        overflow={"hidden"}
        maxWidth={1170}
      >
        {loading ? (
          <Flex width={"100%"} center minHeight={120}>
            <ContentLoader
              speed={2}
              viewBox="0 0 360 80"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="10" y="5" width="60" height="60" />
              <rect x="80" y="5" width="60" height="60" />
              <rect x="150" y="5" width="60" height="60" />
              <rect x="220" y="5" width="60" height="60" />
              <rect x="300" y="5" width="60" height="60" />
            </ContentLoader>
          </Flex>
        ) : (
          <Swiper
            slidesPerView={smDown ? 1 : mdDown ? 4 : 6}
            effect={"slide"}
            autoplay={{ delay: 2000 }}
          >
            {[
              ...(showingBranchs || []),
              ...(showingBranchs || []),
              ...(showingBranchs || []),
            ]
              .filter((item) => item.image)
              .map((item, index) => (
                <SwiperSlide key={`${item.id}-${index}`}>
                  <Flex
                    width={170}
                    cursor={"pointer"}
                    center
                    onClick={() => {
                      window.open(
                        `/products?branch=${(item.name || "").toUpperCase()}`,
                        "_blank"
                      );
                    }}
                  >
                    <LazyLoadImage
                      src={item.image}
                      style={{ width: 170, maxHeight: 120 }}
                    />
                  </Flex>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </Flex>
    </Flex>
  );
};

export default Branchs;
