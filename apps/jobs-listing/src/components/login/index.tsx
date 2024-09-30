import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { observer } from "@core-ui/react-mobx-state";
import { Grid } from "@core-ui/react-mui-core/materials"
import { Flex, LazyImage } from "@core-ui/react-mui-core";
import { LoginForm } from "./LoginForm";
import recruiterBg from "@/assets/images/bg/recruiter_bg.png"
import Carousel from 'react-material-ui-carousel';

const images = [
  "https://truyen.tangthuvien.vn/images/slide3.jpg",
  "https://truyen.tangthuvien.vn/images/slide7.jpg",
  "https://truyen.tangthuvien.vn/images/slide9.jpg",
  "https://truyen.tangthuvien.vn/images/slide8.jpg",
];

export const LoginComponent = observer(() => {

  return (
    <Flex fullWidth center className="login_page">
      <Flex
        width={"100vw"}
        height={"100vh"}
        center
        style={{
          backgroundImage: `url(${recruiterBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Flex fullWidth maxWidth={PAGE_MAX_WIDTH} column>
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
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
            {images.map((image, index) => {
              return (
                <Grid item xs={12} key={index} sm={6} md={3}>
                  <Flex fullSize cursorPointer>
                    <LazyImage
                      src={image}
                      alt={`Slide ${index + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", maxWidth: PAGE_MAX_WIDTH, borderRadius: 16 }}
                      imgStyle={{ width: "100%", height: "100%", objectFit: "cover", maxWidth: PAGE_MAX_WIDTH, borderRadius: 16 }}
                    />
                  </Flex>
                </Grid>
              )
            })}
          </Grid>
        </Flex>
      </Flex>
      <LoginForm />
    </Flex>
  )
})