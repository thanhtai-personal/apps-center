import { useLanguage } from "@/hooks/useLanguage";
import { useGlobalStyles } from "@/styles/globalStyle";
import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text, useResponsive } from "@core-ui/react-mui-core";
import { ProjectItem } from "./ProjectItem";
import { Grid } from "@core-ui/react-mui-core/materials";
import tgminiapp from "@/assets/images/tgminiapp.jpg"
import oxtool from "@/assets/icons/0xtool.svg"
import flymore from "@/assets/images/plane.png"
import titan from "@/assets/images/titan.png"
import commandcenter from "@/assets/images/command_center.png"
import { Animates, HexagonMask } from "@core-ui/react-animates";
import { Layers } from "@/styles/layers";
import { IntersectionObserverView } from "@core-ui/react-viewframe";


export const Projects = observer(() => {
  const { tabletSizeDown } = useResponsive();

  return (
    <Flex fullWidth center position={"relative"}>
      <Flex position={"absolute"} top={19} right={-150} zIndex={Layers.layer2}>
        <Animates.GlowingBallAnim id="light-1" width={40} />
      </Flex>
      <Flex position={"absolute"} bottom={19} left={-150} zIndex={Layers.layer2}>
        <Animates.GlowingBallAnim id="light-2" width={40} />
      </Flex>
      {!tabletSizeDown && <Flex position={"absolute"} top={"50%"} left={"50%"} zIndex={Layers.layer2}>
        <Animates.GlowingBallAnim id="light-2" width={1}
          center={{
            width: 10,
            height: 10
          }}
          middle={{
            width: 20,
            height: 20
          }}
          farest={{
            width: 30,
            height: 30
          }}
        />
      </Flex>}

      {tabletSizeDown ? <ProjectsContent /> : <HexagonMask id="projects-bg" config={{}}>
        <ProjectsContent />
      </HexagonMask>}
    </Flex>
  )
})

const ProjectsContent = observer(() => {
  const globalStyles = useGlobalStyles();
  const { tabletSizeDown } = useResponsive();
  const { getText } = useLanguage(projectsLangObj);

  return (
    <Flex fullWidth maxWidth={PAGE_MAX_WIDTH} column>
      <Flex mt={tabletSizeDown ? 6 : 10} fullWidth center>
        <Text className={tabletSizeDown ? globalStyles.textOrbiBold24
          : globalStyles.textOrbiBold32}>
          {getText("Projects")}
        </Text>
      </Flex>

      <Flex mt={1} fullWidth center>
        <Text className={tabletSizeDown ? globalStyles.textKanit16
          : globalStyles.textKanit24}
          color={"#FFFFDD"}
        >
          {getText("Compilation of projects that I was joined")}
        </Text>
      </Flex>

      <Flex fullWidth column mt={8} position={"relative"}>
        <Flex fullWidth style={{ opacity: 0 }}>
          <GridContent projects={projects} getText={getText} />
        </Flex>
        <Flex fullSize position={"absolute"} zIndex={Layers.layer5}>
          <GridContent projects={projects} getText={getText} />
        </Flex>
      </Flex>
    </Flex>
  )
})

const GridContent = ({ projects, getText }) => {

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
      {projects.map((project, index) => (
        <Grid item sm={12} md={6} lg={4} key={project.id || `p-${index}`} >
          <Flex fullSize minHeight={320}>
            <IntersectionObserverView isInfinite={false}>
              {index % 2 === 0 ? <Animates.SlideRightAppear delay={0.25}>
                <ProjectItem data={project} getText={getText} />
              </Animates.SlideRightAppear> :
              <Animates.SlideLeftAppear delay={0.25}>
                <ProjectItem data={project} getText={getText} />
              </Animates.SlideLeftAppear>}
            </IntersectionObserverView>
          </Flex>
        </Grid>))}
    </Grid>
  )
}

const projectsLangObj = {
  "VI": {
    "Projects": "Dự án",
    "Compilation of projects that I was joined": "Tập hợp các dự án, công việc đã tham gia.",
    "Goat Tap is a Telegram mini-app that creates 'Tap to earn' games. The main content of the game involves clicking on the Goat avatar to accumulate points.\n\nGoat Tap is part of the Goat games system, along with other games such as Wheel Lottery, Up and Down, and Trust Battle.\n\nIn Wheel Lottery, a prize wheel is used to randomly select a winner from all participants. The more value a player contributes to the prize pool, the higher their chance of winning.\n\nUp and Down involves predicting whether the token price will go up or down after 30 seconds. Trust Battle pits two teams against each other in a 24-hour competition over token amounts. After 24 hours, the team with the larger total token amount wins. Participants on the winning team will receive rewards proportional to the percentages of tokens they contributed."
      : "Goat Tap là một mini-app trên Telegram tạo ra các trò chơi 'Tap to earn'. Nội dung chính của trò chơi liên quan đến việc nhấp vào hình đại diện của Goat để tích lũy điểm.\n\nGoat Tap là một phần của hệ thống trò chơi Goat, cùng với các trò chơi khác như Wheel Lottery, Up and Down, và Trust Battle.\n\nTrong Wheel Lottery, một bánh thưởng được sử dụng để ngẫu nhiên chọn một người chiến thắng từ tất cả người tham gia. Giá trị mà người chơi đóng góp vào quỹ giải thưởng càng lớn thì cơ hội chiến thắng càng cao.\n\nUp and Down liên quan đến việc dự đoán xem giá token sẽ tăng hay giảm sau 30 giây. Trust Battle đối đầu hai đội với nhau trong một cuộc thi kéo dài 24 giờ về số lượng token. Sau 24 giờ, đội có tổng số token lớn hơn sẽ thắng. Những người tham gia trong đội chiến thắng sẽ nhận được phần thưởng tương ứng với tỷ lệ phần trăm token mà họ đã đóng góp.",
    "0xtool is a project that offers tools for tracking token shark accounts, reviewing tokens, and NFTs. This project is being developed by myself and one other developer. My responsibility lies in the UI aspect of the project, which is being handled using React with TypeScript"
      : "0xtool là một dự án cung cấp công cụ để theo dõi các tài khoản 'Cá mập', xem xét các token và NFT. Dự án này đang được phát triển bởi tôi và một nhà phát triển khác. Tôi phụ trách phần giao diện người dùng của dự án, được thực hiện bằng React với TypeScript.",
    "Flymore is another project of TiTan. It is developed by approximately 20 developers and is a TypeScript full-stack e-commerce application available on both web and mobile platforms, utilizing PostgreSQL.\n\nThis project employs a microservices architecture communicated by event-driven in its structure.\n\nMy responsibility in this project is to implement new features and fix bugs. Some of the features I have worked on include creating agreements and handling the bidding system, and creating a migrated database script"
      : "Flymore là một dự án khác của TiTan. Dự án này được phát triển bởi khoảng 20 lập trình viên và là một ứng dụng thương mại điện tử full-stack sử dụng TypeScript, có sẵn trên cả nền tảng web và di động, với cơ sở dữ liệu PostgreSQL.\n\nDự án này sử dụng kiến trúc microservices và giao tiếp qua các sự kiện trong cấu trúc của nó.\n\nTrách nhiệm của tôi trong dự án này là triển khai các tính năng mới và sửa lỗi. Một số tính năng mà tôi đã làm việc bao gồm tạo hợp đồng, xử lý hệ thống đấu thầu và tạo script di chuyển cơ sở dữ liệu.",
    "TiTan Core is a pivotal project within TiTan, designed to create modular bases for utilization across various other projects within the typescript stack. This monorepo source encompasses several tiers, including client modules, SDKs, applications, and domains. Clients aggregate all UI packages, applications encapsulate business logic packages, domains provide API packages, and SDKs consolidate all SDK packages that facilitate the connection and usage of API packages by UI packages.\n\nIn this project, my primary responsibility lies in implementing all UI packages and SDK packages for the initial phase. This includes React-core, unittest-vitest, SDKs for user management and authentication, as well as UI packages for authentication and user management. Additionally, I am tasked with documenting each component thoroughly."
      : "TiTan Core là một dự án quan trọng trong TiTan, được thiết kế để tạo ra các nền tảng mô-đun để sử dụng cho nhiều dự án khác nhau trong ngăn xếp TypeScript. Mã nguồn monorepo này bao gồm nhiều tầng, bao gồm các mô-đun client, SDK, ứng dụng và miền. Các client tập hợp tất cả các gói UI, ứng dụng bao gồm các gói logic nghiệp vụ, miền cung cấp các gói API và SDK tích hợp tất cả các gói SDK giúp kết nối và sử dụng các gói API bởi các gói UI.\n\nTrong dự án này, trách nhiệm chính của tôi là triển khai tất cả các gói UI và gói SDK cho giai đoạn đầu. Điều này bao gồm React-core, unittest-vitest, SDK cho quản lý người dùng và xác thực, cũng như các gói UI cho xác thực và quản lý người dùng. Ngoài ra, tôi còn được giao nhiệm vụ tài liệu hóa kỹ lưỡng từng thành phần.",
    "Auvenir/Deloitte Auditing platform": "Hệ thông hổ trợ kiểm toán cho Deloite",
    "Developed by more than 200 developers, this is a significant outsourced project and the flagship endeavor of TiTan. The backend is built on .Net Core microservices, the database is a SQL project, and the frontend is developed in ReactJS.\n\nMy responsibility in this project is to implement new features and fix bugs. Some of the features I have worked on include creating an engagement screen, handling logout in multi-tab, multi-browser scenarios, and managing content updates,..."
      : "Được phát triển bởi hơn 200 lập trình viên, đây là một dự án gia công quan trọng và là nỗ lực chủ chốt của TiTan. Phần backend được xây dựng trên kiến trúc vi dịch vụ .Net Core, cơ sở dữ liệu là một dự án SQL, và phần frontend được phát triển bằng ReactJS.\n\nTrách nhiệm của tôi trong dự án này là triển khai các tính năng mới và sửa lỗi. Một số tính năng tôi đã làm việc bao gồm tạo màn hình tương tác, xử lý đăng xuất trong các tình huống đa tab và đa trình duyệt, cũng như quản lý cập nhật nội dung,...",
    "Command center": "Trung tâm điều hành bệnh viện",
    "The Command Center project in the medical field serves as an operational hub within a hospital. It connects to another Electronic Medical Record project of ISOFH to display patient records, manage inpatient and outpatient information, and oversee medical record management.\n\nThis project utilizes Java for the backend and ReactJS with Redux for the frontend. My primary responsibility in this project is to implement all UI features"
      : "Dự án Command Center trong lĩnh vực y tế phục vụ như một trung tâm điều hành trong bệnh viện. Nó kết nối với một dự án Hồ sơ Y tế Điện tử của ISOFH để hiển thị hồ sơ bệnh nhân, quản lý thông tin nội trú và ngoại trú, cũng như giám sát việc quản lý hồ sơ y tế.\n\nDự án này sử dụng Java cho phần backend và ReactJS với Redux cho phần frontend. Trách nhiệm chính của tôi trong dự án này là triển khai tất cả các tính năng giao diện người dùng.",
    "The Maestro Celebrity Event Planning Platform, developed by approximately 20 developers, utilizes .NET for the backend and ReactJS for the frontend.\n\nIn this project, my role as a frontend developer entails implementing various features on ReactJS. Specifically, I focus on functionalities like calendar event management and report printing services"
      : "Nền tảng Lập Kế Hoạch Sự Kiện Maestro Celebrity, được phát triển bởi khoảng 20 lập trình viên, sử dụng .NET cho phần backend và ReactJS cho phần frontend.\n\nTrong dự án này, vai trò của tôi với tư cách là lập trình viên frontend bao gồm việc triển khai các tính năng khác nhau trên ReactJS. Cụ thể, tôi tập trung vào các chức năng như quản lý sự kiện trên lịch và dịch vụ in báo cáo.",
    "Swallow, a product of CityNow, focuses on Japan Study & Job Recruitment, offering insights into job and study opportunities in Japan. Following Delorean, this project is built by a small team of 7 developers, utilizing a JavaScript stack.\n\nMy role in this project involves implementing full features from backend to frontend. A notable contribution of mine is the development of a rich text editor, facilitating the posting of content on public sites."
      : "Swallow, một sản phẩm của CityNow, tập trung vào việc nghiên cứu và tuyển dụng việc làm tại Nhật Bản, cung cấp thông tin về cơ hội việc làm và học tập tại Nhật. Sau Delorean, dự án này được xây dựng bởi một đội ngũ nhỏ gồm 7 lập trình viên, sử dụng công nghệ JavaScript.\n\nVai trò của tôi trong dự án này liên quan đến việc triển khai đầy đủ các tính năng từ backend đến frontend. Một đóng góp đáng chú ý của tôi là phát triển một trình chỉnh sửa văn bản phong phú, tạo điều kiện cho việc đăng nội dung trên các trang công cộng.",
    "TankVN is a nostalgic yet innovative project inspired by the classic Battle City game. With a fresh user interface and exciting new features, TankVN brings the beloved retro gaming experience into the modern era.\n\nTankVN is developed by a small team with me and 1 other utilizing microsoft XNA 4.0, and AI technique for enemy objects in game (find the shortest way to go and kill player). At its core, TankVN retains the essence of Battle City, where players navigate a maze-like battlefield, strategically maneuvering their tanks to eliminate enemy forces and defend their base. However, TankVN goes beyond mere homage by introducing captivating new elements, including visually stunning graphics and challenging boss battles."
      : "TankVN là một dự án vừa hoài cổ vừa đổi mới, lấy cảm hứng từ trò chơi cổ điển Battle City. Với giao diện người dùng mới mẻ và các tính năng thú vị, TankVN mang trải nghiệm chơi game retro yêu thích vào thời đại hiện đại.\n\nTankVN được phát triển bởi một đội ngũ nhỏ gồm tôi và một người khác, sử dụng công nghệ Microsoft XNA 4.0 và kỹ thuật AI cho các đối tượng kẻ thù trong trò chơi (tìm đường ngắn nhất để tiếp cận và tiêu diệt người chơi). Cốt lõi của TankVN vẫn giữ nguyên bản chất của Battle City, nơi người chơi điều khiển một trận địa giống như mê cung, khéo léo di chuyển xe tăng của mình để tiêu diệt lực lượng kẻ thù và bảo vệ căn cứ. Tuy nhiên, TankVN không chỉ đơn thuần là một sự tri ân, mà còn giới thiệu các yếu tố mới hấp dẫn, bao gồm đồ họa ấn tượng và những trận đánh boss đầy thử thách.",
    "HP Tool — Online Shopping is a learning project of mine, aimed at utilizing Next.js to construct an e-commerce website. Data is crawled through the Cheerio tool and stored in an Atlas database powered by MongoDB.\n\nThe user interface comprises a products page, showcasing and facilitating the search of all available products. Additionally, an admin page is included to manage operations such as posting new content or editing crawled data."
      : "HP Tool — Mua sắm trực tuyến là một dự án học tập của tôi, nhằm mục đích luyện tập sử dụng Next.js để xây dựng một trang web thương mại điện tử. Dữ liệu được thu thập thông qua công cụ Cheerio và lưu trữ trong cơ sở dữ liệu Atlas do MongoDB cung cấp.\n\nGiao diện người dùng bao gồm một trang sản phẩm, hiển thị và hỗ trợ tìm kiếm tất cả các sản phẩm có sẵn. Ngoài ra, còn có một trang quản trị để quản lý các hoạt động như đăng nội dung mới hoặc chỉnh sửa dữ liệu đã thu thập.",
  }
}

const projects = [
  {
    id: 1,
    name: "Goat games",
    image: tgminiapp,
    description: `Goat Tap is a Telegram mini-app that creates 'Tap to earn' games. The main content of the game involves clicking on the Goat avatar to accumulate points.\n\nGoat Tap is part of the Goat games system, along with other games such as Wheel Lottery, Up and Down, and Trust Battle.\n\nIn Wheel Lottery, a prize wheel is used to randomly select a winner from all participants. The more value a player contributes to the prize pool, the higher their chance of winning.\n\nUp and Down involves predicting whether the token price will go up or down after 30 seconds. Trust Battle pits two teams against each other in a 24-hour competition over token amounts. After 24 hours, the team with the larger total token amount wins. Participants on the winning team will receive rewards proportional to the percentages of tokens they contributed.`,
  },
  {
    id: 2,
    name: "0xtool",
    image: oxtool,
    description: "0xtool is a project that offers tools for tracking token shark accounts, reviewing tokens, and NFTs. This project is being developed by myself and one other developer. My responsibility lies in the UI aspect of the project, which is being handled using React with TypeScript",
  },
  {
    id: 3,
    name: "Flymore",
    image: flymore,
    description: "Flymore is another project of TiTan. It is developed by approximately 20 developers and is a TypeScript full-stack e-commerce application available on both web and mobile platforms, utilizing PostgreSQL.\n\nThis project employs a microservices architecture communicated by event-driven in its structure.\n\nMy responsibility in this project is to implement new features and fix bugs. Some of the features I have worked on include creating agreements and handling the bidding system, and creating a migrated database script",
  },
  {
    id: 4,
    name: "Titan core",
    image: titan,
    description: "TiTan Core is a pivotal project within TiTan, designed to create modular bases for utilization across various other projects within the typescript stack. This monorepo source encompasses several tiers, including client modules, SDKs, applications, and domains. Clients aggregate all UI packages, applications encapsulate business logic packages, domains provide API packages, and SDKs consolidate all SDK packages that facilitate the connection and usage of API packages by UI packages.\n\nIn this project, my primary responsibility lies in implementing all UI packages and SDK packages for the initial phase. This includes React-core, unittest-vitest, SDKs for user management and authentication, as well as UI packages for authentication and user management. Additionally, I am tasked with documenting each component thoroughly.",
  },
  {
    id: 5,
    name: "Auvenir/Deloitte Auditing platform",
    image: titan,
    description: "Developed by more than 200 developers, this is a significant outsourced project and the flagship endeavor of TiTan. The backend is built on .Net Core microservices, the database is a SQL project, and the frontend is developed in ReactJS.\n\nMy responsibility in this project is to implement new features and fix bugs. Some of the features I have worked on include creating an engagement screen, handling logout in multi-tab, multi-browser scenarios, and managing content updates,...",
  },
  {
    id: 6,
    name: "Command center",
    image: commandcenter,
    description: "The Command Center project in the medical field serves as an operational hub within a hospital. It connects to another Electronic Medical Record project of ISOFH to display patient records, manage inpatient and outpatient information, and oversee medical record management.\n\nThis project utilizes Java for the backend and ReactJS with Redux for the frontend. My primary responsibility in this project is to implement all UI features",
  },
  {
    id: 7,
    name: "Maestro",
    image: "",
    description: "The Maestro Celebrity Event Planning Platform, developed by approximately 20 developers, utilizes .NET for the backend and ReactJS for the frontend.\n\nIn this project, my role as a frontend developer entails implementing various features on ReactJS. Specifically, I focus on functionalities like calendar event management and report printing services",
  },
  {
    id: 8,
    name: "Swallow",
    description: "Swallow, a product of CityNow, focuses on Japan Study & Job Recruitment, offering insights into job and study opportunities in Japan. Following Delorean, this project is built by a small team of 7 developers, utilizing a JavaScript stack.\n\nMy role in this project involves implementing full features from backend to frontend. A notable contribution of mine is the development of a rich text editor, facilitating the posting of content on public sites.",
  },
  {
    id: 9,
    name: "TankVN (Battle city)",
    image: "",
    description: "TankVN is a nostalgic yet innovative project inspired by the classic Battle City game. With a fresh user interface and exciting new features, TankVN brings the beloved retro gaming experience into the modern era.\n\nTankVN is developed by a small team with me and 1 other utilizing microsoft XNA 4.0, and AI technique for enemy objects in game (find the shortest way to go and kill player). At its core, TankVN retains the essence of Battle City, where players navigate a maze-like battlefield, strategically maneuvering their tanks to eliminate enemy forces and defend their base. However, TankVN goes beyond mere homage by introducing captivating new elements, including visually stunning graphics and challenging boss battles.",
  },
  {
    id: 10,
    name: "HP tool — Online shopping",
    image: "",
    description: "HP Tool — Online Shopping is a learning project of mine, aimed at utilizing Next.js to construct an e-commerce website. Data is crawled through the Cheerio tool and stored in an Atlas database powered by MongoDB.\n\nThe user interface comprises a products page, showcasing and facilitating the search of all available products. Additionally, an admin page is included to manage operations such as posting new content or editing crawled data.",
  }
]