import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text, useResponsive } from "@core-ui/react-mui-core";
import { BubbleMask } from "@core-ui/react-animates"
import { useGlobalStyles } from "@/styles/globalStyle";
import { useLanguage } from "@/hooks/useLanguage";

const contentTexts = {
  "VI": {
    "Introduce": "Giới thiệu",
    "🎉I have experience in developing web applications using ReactJS for the front end and NestJS for the back end.\n I enjoy building project structures to ensure resource management that facilitates easy reuse and scalability, as well as researching CSS to enhance the aesthetics of web interfaces.\n\n In terms of technical skills, I have a relatively comprehensive understanding of the various stages involved in software creation, along with some knowledge of other stages in software development.\n I possess the necessary skills to design and build a web application, starting from database design—typically using PostgreSQL—to creating APIs in a microservice architecture or a modular design.\n For APIs, I usually use NestJS.\n On the client side, I use ReactJS, breaking down functionalities into individually packaged components that allow for easy reuse and feature expansion.\n In terms of dev-ops skills, I can deploy applications to several supported servers, such as Google Cloud virtual machines, Vercel, and Heroku.\n\n I am a full-stack developer.🚀"
      : `🎉 Tôi có kinh nghiệm trong việc phát triển các ứng dụng web với ReactJS ở phần front-end và NestJS cho back-end.\n Tôi yêu thích việc xây dựng cấu trúc dự án để có một cấu trúc quản lý resource đảm bảo sự dễ dàng tái sử dụng và mở rộng, cùng với việc nghiên cứu sử dụng CSS để làm đẹp cho giao diện website.\n\n Về kỹ thuật trong công việc, bản thân tôi có sự hiểu biết tương đối tổng quát trong các khâu tạo ra một phần mềm, cùng với một ít hiểu biết về các khâu khác trong sự phát triển của phần mềm.\n Tôi có đầy đủ kỹ năng để thiết kế và xây dựng một ứng dụng web, từ việc thiết kế database—thường sử dụng PostgreSQL—đến việc tạo các API trong mô hình microservice hoặc mô hình thiết kế theo module.\n Ở API, tôi thường dùng NestJS.\n Cho đến việc xây dựng ứng dụng ở phía khách hàng, tôi dùng ReactJS với việc chia các chức năng ra thành các thành phần được đóng gói riêng biệt, thuận lợi cho việc tái sử dụng và mở rộng tính năng.\n Ở phần kỹ năng dev-ops, tôi có thể đẩy ứng dụng lên một số server được hỗ trợ như máy ảo Google Cloud, Vercel, Heroku...\n\n Tôi là một lập trình viên full-stack.`
  }
}

export const Introduce = observer(() => {
  const globalStyles = useGlobalStyles();
  const { tabletSizeDown } = useResponsive();
  const { getText } = useLanguage(contentTexts);

  return (
    <Flex fullWidth center position={"relative"} minHeight={600}>
      <Flex fullSize column borderRadius={2}
        overflow={"hidden"}
      >
        <BubbleMask id="introduce-content" config={{
          "background": {
            "color": {
              "value": "rgba(0,0,0, 0.25)"
            },
            "image": "",
            "position": "",
            "repeat": "",
            "size": "",
            "opacity": 1
          },
        }}>
          <Flex fullWidth maxWidth={PAGE_MAX_WIDTH} p={2} center minHeight={600}>
            <Flex column fullSize
              bgcolor={"#000"}
              borderRadius={2} p={2}
              data-aos="fade-up"
              data-aos-anchor-placement="center-center"
              style={{
                boxShadow: `
                  0 2px 5px rgb(55, 120, 251,0.3)
                `
              }}
            >
              <Flex fullWidth center>
                <Text className={tabletSizeDown ? globalStyles.textOrbiBold24
                  : globalStyles.textOrbiBold32}>{getText("Introduce")}</Text>
              </Flex>
              <Flex fullWidth center mt={2}>
                <Text
                  color={"#FFFFDD"}
                  className={tabletSizeDown ? globalStyles.textKanit16
                    : globalStyles.textKanit18}
                  whiteSpace={"pre-line"}
                  textAlign="left"
                  style={{
                    lineHeight: "125%"
                  }}
                >
                  {getText("🎉I have experience in developing web applications using ReactJS for the front end and NestJS for the back end.\n I enjoy building project structures to ensure resource management that facilitates easy reuse and scalability, as well as researching CSS to enhance the aesthetics of web interfaces.\n\n In terms of technical skills, I have a relatively comprehensive understanding of the various stages involved in software creation, along with some knowledge of other stages in software development.\n I possess the necessary skills to design and build a web application, starting from database design—typically using PostgreSQL—to creating APIs in a microservice architecture or a modular design.\n For APIs, I usually use NestJS.\n On the client side, I use ReactJS, breaking down functionalities into individually packaged components that allow for easy reuse and feature expansion.\n In terms of dev-ops skills, I can deploy applications to several supported servers, such as Google Cloud virtual machines, Vercel, and Heroku.\n\n I am a full-stack developer.🚀")}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </BubbleMask>
      </Flex>
    </Flex>
  )
})