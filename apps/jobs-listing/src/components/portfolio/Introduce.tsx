import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text, useResponsive } from "@core-ui/react-mui-core";
import { BubbleMask } from "@core-ui/react-animates"
import { useGlobalStyles } from "@/styles/globalStyle";
import { useLanguage } from "@/hooks/useLanguage";

const contentTexts = {
  "VI": {
    "Introduce": "Giới thiệu",
    "🎉 Hello, I’m Tài Trần – Full Stack Web Developer! 🎉\n\nI have experience in developing web applications using ReactJS on the front-end and NestJS for the back-end. I enjoy combining beautiful user interfaces with strong server-side systems to create a smooth user experience. From building user-friendly interfaces to managing systems and data on the back-end, I always strive to find the most suitable solutions for each project.\n\nOn the front-end, I work primarily with ReactJS, creating responsive and optimized web interfaces for easy user interaction. As for the back-end, I utilize NestJS to build robust and scalable systems. I often work with PostgreSQL as my database of choice because of its reliability and flexibility for various types of applications.\n\nAdditionally, I have experience deploying applications on Google Cloud, ensuring that projects run stably and efficiently in cloud environments. I continuously learn new technologies to improve my skills and deliver the best value in my work.\n\nI enjoy tackling challenges in development and am always eager to explore ways to optimize solutions. If you need a Full Stack Developer with experience in ReactJS, NestJS, PostgreSQL, and Google Cloud deployment, I’d be happy to collaborate with you to bring your project to life!🚀"
      : `🎉 Chào bạn, mình là Tài Trần – Lập trình viên Full Stack! 🎉\n\nMình có kinh nghiệm trong việc phát triển các ứng dụng web với ReactJS ở phần front-end và NestJS cho back-end. Mình yêu thích việc kết hợp giữa giao diện đẹp mắt và hệ thống máy chủ mạnh mẽ để mang đến trải nghiệm người dùng mượt mà. Từ việc xây dựng giao diện người dùng thân thiện đến việc quản lý hệ thống và dữ liệu phía sau, mình luôn cố gắng tìm ra giải pháp phù hợp nhất cho từng dự án.\n\nVề front-end, mình thường làm việc với ReactJS, tạo ra các giao diện web tương thích, tối ưu hóa để người dùng có thể dễ dàng tương tác. Còn về back-end, mình sử dụng NestJS để xây dựng các hệ thống logic mạnh mẽ và có khả năng mở rộng. Cơ sở dữ liệu mình thường sử dụng là PostgreSQL, vì nó đáng tin cậy và linh hoạt cho nhiều loại ứng dụng khác nhau.\n\nBên cạnh đó, mình cũng đã có kinh nghiệm triển khai ứng dụng trên Google Cloud, đảm bảo các dự án chạy ổn định và hiệu quả trong môi trường đám mây. Mình không ngừng học hỏi các công nghệ mới để cải thiện kỹ năng và mang lại giá trị tốt nhất cho công việc.\n\nMình thích những thách thức trong lập trình và luôn sẵn sàng tìm hiểu để tối ưu hóa các giải pháp. Nếu bạn cần một lập trình viên Full Stack am hiểu về ReactJS, NestJS, PostgreSQL và triển khai trên Google Cloud, mình rất sẵn lòng tham gia cùng bạn để thực hiện dự án!`
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
                  className={tabletSizeDown ? globalStyles.textKanit18
                    : globalStyles.textKanit24}
                  whiteSpace={"pre-line"}
                  style={{
                    lineHeight: "125%"
                  }}
                >
                  {getText("🎉 Hello, I’m Tài Trần – Full Stack Web Developer! 🎉\n\nI have experience in developing web applications using ReactJS on the front-end and NestJS for the back-end. I enjoy combining beautiful user interfaces with strong server-side systems to create a smooth user experience. From building user-friendly interfaces to managing systems and data on the back-end, I always strive to find the most suitable solutions for each project.\n\nOn the front-end, I work primarily with ReactJS, creating responsive and optimized web interfaces for easy user interaction. As for the back-end, I utilize NestJS to build robust and scalable systems. I often work with PostgreSQL as my database of choice because of its reliability and flexibility for various types of applications.\n\nAdditionally, I have experience deploying applications on Google Cloud, ensuring that projects run stably and efficiently in cloud environments. I continuously learn new technologies to improve my skills and deliver the best value in my work.\n\nI enjoy tackling challenges in development and am always eager to explore ways to optimize solutions. If you need a Full Stack Developer with experience in ReactJS, NestJS, PostgreSQL, and Google Cloud deployment, I’d be happy to collaborate with you to bring your project to life!🚀")}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </BubbleMask>
      </Flex>
    </Flex>
  )
})