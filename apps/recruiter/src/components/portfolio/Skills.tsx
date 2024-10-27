import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text, useResponsive } from "@core-ui/react-mui-core";
import { useGlobalStyles } from "@/styles/globalStyle";
import { useLanguage } from "@/hooks/useLanguage";
import { BasicRadarChart, HorizontalBarChart } from "@core-ui/react-charts"
import { PAGE_MAX_WIDTH } from "@/utils/constants";

export const Skills = observer(() => {
  const globalStyles = useGlobalStyles();
  const { tabletSizeDown } = useResponsive();
  const { getText } = useLanguage(contentTexts);

  return (
    <Flex fullWidth center column minHeight={450} mt={4} mb={4} position={"relative"}>
      <Flex fullWidth center>
        <Text className={tabletSizeDown ? globalStyles.textOrbiBold24
          : globalStyles.textOrbiBold32}>{getText("SKILLS")}</Text>
      </Flex>
      <Flex fullWidth flexDirection={tabletSizeDown ? "column" : "row"} mt={4} maxWidth={PAGE_MAX_WIDTH}>
        <Flex fullSize center
          flex={tabletSizeDown ? "unset" : 2}
          data-aos={"fade-up"}
          minHeight={450}
        >
          <HorizontalBarChart
            data={[
              {
                name: 'ReactJS',
                v1: 90,
                valueKey: "v1",
              },
              {
                name: 'HTML/CSS',
                valueKey: "v1",
                v1: 90,
              },
              {
                name: 'NodeJS/NestJS',
                valueKey: "v1",
                v1: 70,
              },
              {
                name: 'PostgreSQL',
                valueKey: "v1",
                v1: 70,
              },
              {
                name: '.Net',
                valueKey: "v1",
                v1: 50,
              },
              {
                name: 'Git',
                valueKey: "v1",
                v1: 90,
              },
              {
                name: 'Jira, Trello',
                valueKey: "v1",
                v1: 60,
              },
              {
                name: 'google cloud',
                valueKey: "v1",
                v1: 60,
              },
              {
                name: 'Vercel, heroku',
                valueKey: "v1",
                v1: 40,
              },
            ]}
            bars={[
              {
                name: "v1",
                background: "#202020",
              }
            ]}
            config={{
              hideX: true,
              useLegend: false,
              useTooltip: false,
              useGrid: false,
              barSize: 20,
            }}
            styles={{
              margin: {
                left: 100,
                right: 48
              }
            }}
            title={""}
            unit={1}
          />
        </Flex>
        <Flex fullSize center
          flex={tabletSizeDown ? "unset" : 1}
          data-aos={"fade-up"}
          minHeight={450}
        >
          <BasicRadarChart
            data={
              [
                {
                  name: getText('Frontend'),
                  v1: 90,
                  fullMark: 100,
                },
                {
                  name: getText('Backend'),
                  v1: 65,
                  fullMark: 100,
                },
                {
                  name: getText('Independent'),
                  v1: 90,
                  fullMark: 100,
                },
                {
                  name: getText('Teamwork'),
                  v1: 80,
                  fullMark: 100,
                },
                {
                  name: getText('Deployment'),
                  v1: 50,
                  fullMark: 100,
                },
                {
                  name: getText('UI/UX'),
                  v1: 80,
                  fullMark: 100,
                },
              ]}
            config={{
              name: getText("skills")
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  )
})


const contentTexts = {
  "VI": {
    "SKILLS": "KỸ NĂNG",
  }
}