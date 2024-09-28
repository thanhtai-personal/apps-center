import { useGlobalStyles } from "@/styles/globalStyle";
import { Flex, Text } from "@core-ui/react-mui-core";
import { goToSection } from "@/utils/index";
import { AppTheme } from "@core-ui/react-mui-core";
import { makeStyles, createStyles } from "@core-ui/react-mui-core/style"
import clsx from "@core-ui/react-mui-core/clsx";

const menuItems = [{
  id: 1,
  label: 'Welcome',
  targetContent: "section-welcome"
}, {
  id: 2,
  label: 'Introduce',
  targetContent: "section-introduce"
}, {
  id: 3,
  label: 'Experience',
  targetContent: "section-experience"
}, {
  id: 4,
  label: 'Projects',
  targetContent: "section-projects"
}, {
  id: 5,
  label: 'Contact',
  targetContent: "section-contact"
},
]

export const TopMenu = () => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();

  return (
    <Flex
      fullWidth
      maxWidth={800}
      centerY
      bgcolor={"rgba(255,255,255,0.25)"}
      borderRadius={"16px"}
      style={{
        backdropFilter: "blur(4px)",
        overflow: "hidden"
      }}
      px={2}
      py={1}
    >
      <Flex fullSize m={0} center style={{
        maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10.5%, rgb(0, 0, 0) 90.5%, rgba(0, 0, 0, 0) 100%)'
        , overflow: 'hidden'
      }}>
        <Flex fullSize center>
          {menuItems.map((item) => (
            <Flex className={styles.hoveredButton} mx={2} key={item.id} cursorPointer center
              onClick={() => {
                goToSection(item.targetContent);
              }}
            >
              <Text className={clsx(globalStyles.textKanitBold16)}>{item.label}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>

  )
}

const useStyles = makeStyles((_theme: AppTheme) =>
  createStyles({
    hoveredButton: {
      "&:hover>div>div": {
        color: "#FFAA00 !important"
      }
    }
  }))