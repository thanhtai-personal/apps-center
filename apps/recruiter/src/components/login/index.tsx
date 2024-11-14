import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { observer } from "@core-ui/react-mobx-state";
import { Grid } from "@core-ui/react-mui-core/dist/base/materials"
import { Flex, LazyImage } from "@core-ui/react-mui-core";
import recruiterBg from "@/assets/images/bg/recruiter_bg.png"
import Carousel from 'react-material-ui-carousel';
import jobspage from "@/assets/images/bg/jobspage.png"
import novels_page from "@/assets/images/bg/novels_page.png"
import portfolio_preview from "@/assets/images/bg/portfolio_preview.png"
import performanceResult from "@/assets/images/bg/performance-result.png"
import { Link } from "@core-ui/react-core";
import { LoginForm } from "@/components/login/LoginForm";
import { useGlobalStyles } from "@/styles/globalStyle";

const images = [
  {
    src: portfolio_preview,
    url: "/me"
  }, {
    src: jobspage,
    url: "/jobs"
  }, {
    src: novels_page,
    url: "/novels"
  }, {
    src: performanceResult,
    url: "https://pagespeed.web.dev/analysis/https-my-projects-delta-orcin-vercel-app-me/vcos3fthy7?form_factor=desktop"
  }
];

export const LoginComponent = observer(() => {
  const globalStyles = useGlobalStyles();

  return (
    <Flex fullWidth center className="login_page">
      <Flex
        width={"100vw"}
        minHeight={"100vh"}
        center
        p={2}
        py={4}
        style={{
          backgroundImage: `url(${recruiterBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Flex fullWidth maxWidth={PAGE_MAX_WIDTH} column>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
            {images.map((image, index) => {
              return (
                <Grid item xs={12} key={index} sm={6} md={3}>
                  <Link to={image.url} target="_blank">
                    <Flex fullSize cursorPointer className={globalStyles.hoverTransition}>
                      <LazyImage
                        src={image.src}
                        alt={`Slide ${index + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", maxWidth: PAGE_MAX_WIDTH, borderRadius: 16 }}
                        imgStyle={{ width: "100%", height: "100%", objectFit: "cover", maxWidth: PAGE_MAX_WIDTH, borderRadius: 16 }}
                      />
                    </Flex>
                  </Link>
                </Grid>
              )
            })}
          </Grid>
        </Flex>
      </Flex>
      <LoginForm  />
    </Flex>
  )
})