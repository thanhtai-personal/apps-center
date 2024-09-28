import { Animates } from "@core-ui/react-animates"
import { Flex } from "@core-ui/react-mui-core"

import reactIcon from "@/assets/icons/react.png";
import htmlIcon from "@/assets/icons/html.png";
import nestjsIcon from "@/assets/icons/nestjs.jpg";
import nodejsIcon from "@/assets/icons/nodejs.png";
import cssIcon from "@/assets/icons/css.png";
import postgresqlIcon from "@/assets/icons/postgresql.png";
import gcloudIcon from "@/assets/icons/gcloud.png";

const skills = [
  {
    id: 4,
    image: htmlIcon,
    title: 'HTML',
  },
  {
    id: 2,
    image: nodejsIcon,
    title: 'NodeJS',
  },
  {
    id: 5,
    image: cssIcon,
    title: 'CSS',
  },
  {
    id: 1,
    image: reactIcon,
    title: 'ReactJS',
  },
  {
    id: 3,
    image: nestjsIcon,
    title: 'NestJS',
  },
  {
    id: 7,
    image: gcloudIcon,
    title: 'Google cloud',
  },
  {
    id: 6,
    image: postgresqlIcon,
    title: 'PostgreSQL',
  },
]
export const SkillsSet = () => {

  return (
    <Flex
      fullWidth
      maxWidth={800}
      centerY
      bgcolor={"rgba(255,255,255,0.01)"}
      borderRadius={"16px"}
      style={{
        backdropFilter: "blur(4px)",
        overflow: "hidden"
      }}
    >
      <Flex fullSize m={0} center style={{
        maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 40.5%, rgb(0, 0, 0) 60.5%, rgba(0, 0, 0, 0) 100%)'
        , overflow: 'hidden'
      }}>
        <Flex fullSize center>
          <marquee loop onMouseOver={(e) => { e.target.stop() }} onMouseOut={(e) => { e.target.start() }}>
            <Flex centerY style={{ pointerEvents: "none" }}>
              {[...skills, ...skills, ...skills, ...skills, ...skills, ...skills].map((item, index) => (
                <Flex mx={2} key={item.id} title={item.title}>
                  <Animates.BubbleWrapper id={`bubble-${item.id}-${index}`} style={{ padding: 8, fontSize: 14 }}>
                    <img src={item.image} alt=""
                      style={{ width: 'auto', height: '50px', borderRadius: "100%" }}
                    />
                  </Animates.BubbleWrapper>
                </Flex>
              ))}
            </Flex>
          </marquee>
        </Flex>
      </Flex>
    </Flex>

  )
}