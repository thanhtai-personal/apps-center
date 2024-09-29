import { observer } from "@core-ui/react-mobx-state";
import { AppTheme, Flex, LazyImage, OutlinedButton, Text, useResponsive } from "@core-ui/react-mui-core";
import { PAGE_MAX_WIDTH } from "@/utils/constants";
import Carousel from 'react-material-ui-carousel';
import { useNovalsStore } from "@core-ui/react-novals";
import { Link } from "@core-ui/react-core";
import { useGlobalStyles } from "@/styles/globalStyle";
import clsx from "@core-ui/react-mui-core/clsx";
import { Grid } from "@core-ui/react-mui-core/materials";
import { useStore } from "@/store/index";
import { Animates } from "@core-ui/react-animates";
import sword2 from "@/assets/icons/sword2.png"
import { makeStyles, createStyles } from "@core-ui/react-mui-core/style"

const images = [
  "https://truyen.tangthuvien.vn/images/slide3.jpg",
  "https://truyen.tangthuvien.vn/images/slide7.jpg",
  "https://truyen.tangthuvien.vn/images/slide9.jpg",
  "https://truyen.tangthuvien.vn/images/slide8.jpg",
];

export const Banner = observer(() => {
  const { categoryStore } = useNovalsStore();
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const { uiStore } = useStore();
  const { fullSizeDown } = useResponsive({ fullSizeDown: PAGE_MAX_WIDTH + 350 });

  return (
    <Flex fullWidth center>
      {!fullSizeDown && <>
        <Flex position={"absolute"} left={"-50vw"} top={-350} >
          <Animates.Smoke id={"smk-1"} blur={2} wind={15} />
        </Flex>
        <Flex position={"absolute"} left={"45vw"} top={-350}>
          <Animates.Smoke id={"smk-2"} blur={2} wind={-5} />
        </Flex>
        <Flex position={"absolute"} left={"-50vw"} top={0} >
          <Animates.Smoke id={"smk-1"} blur={2} wind={15} />
        </Flex>
        <Flex position={"absolute"} left={"45vw"} top={0}>
          <Animates.Smoke id={"smk-2"} blur={2} wind={-5} />
        </Flex>
      </>}
      <Flex fullWidth center height={450} maxWidth={PAGE_MAX_WIDTH} px={2} position={"relative"}>
        <Flex flex={1} pr={2}>
          <Grid container spacing={2}>
            {(categoryStore.categories?.data || []).map((category, index) => (
              <Grid item xs={4}>
                <Link key={category.id} to={`/the-loai/${category.name}`}>
                  <Animates.SlideRightAppear delay={2 + (index + 1) / 4}>
                    {/* <OutlinedButton style={{ width: "100%", borderColor: "rgba(255,255,255,0.1)" }}> */}
                    <Flex cursorPointer center column fullSize position={"relative"} pb={3} className={styles.iconWithTextHover}>
                      <Text className={clsx(globalStyles.hoverUnderLine, globalStyles.textCharka14)}>{category.name}</Text>
                      <Flex position={"absolute"} bottom={1}>
                        <img src={sword2} alt="sword" style={{ height: 24 }} />
                      </Flex>
                    </Flex>
                    {/* </OutlinedButton> */}
                  </Animates.SlideRightAppear>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Flex>

        <Flex flex={2}>
          <Carousel
            animation={"slide"}
            interval={10000}
            swipe
            fullHeightHover
            navButtonsWrapperProps={{
              style: { margin: "0 10px" },
            }}
          >
            {images.map((image, index) => (
              <Flex key={index} fullSize>
                <LazyImage
                  src={image}
                  alt={`Slide ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", maxWidth: PAGE_MAX_WIDTH, borderRadius: 16 }}
                  imgStyle={{ width: "100%", height: "100%", objectFit: "cover", maxWidth: PAGE_MAX_WIDTH, borderRadius: 16 }}
                />
              </Flex>
            ))}
          </Carousel>
        </Flex>

        <Flex flex={1} pl={2} pt={8} pb={12} fullSize centerY>
          <Flex borderRadius={8} border={"solid 1px rgba(255,255,255, 0.25)"} fullSize center>
            <Text>ADS</Text>
          </Flex>
        </Flex>
      </Flex >
    </Flex >
  );
});

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    iconWithTextHover: {
      "& img": {
        transition: "transform 0.3s ease-in-out",
      },
      "&:hover img": {
        transform: "translateY(15%)",
      },
    },
  })
);