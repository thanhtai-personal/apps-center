//globalStyle.ts
import { AppTheme } from "@core-ui/react-mui-core";
import { makeStyles, createStyles } from "@core-ui/react-mui-core/style"

export const useGlobalStyles = makeStyles((_theme: AppTheme) =>
  createStyles({
    hoverUnderLine: {
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline"
      }
    },
    hoverTransition: {
      cursor: "pointer",
      transitionDuration: 250,
      "&:hover": {
        transform: "translateY(-5%)"
      }
    },
    borderTopBox: {
      boxShadow: "0px -4px 0px #305AE8",
      borderRadius: "24px"
    },
    textCharka12: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 400,
      fontSize: 12,
      lineHeight: "125%",
    },
    textCharka14: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "125%",
    },
    textCharka16: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "125%",
    },
    textCharka18: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 400,
      fontSize: 18,
      lineHeight: "125%",
    },
    textCharka20: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 400,
      fontSize: 20,
      lineHeight: "125%",
    },
    textCharka24: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 400,
      fontSize: 24,
      lineHeight: "125%",
    },
    textCharka32: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 400,
      fontSize: 32,
      lineHeight: "125%",
    },
    textCharka40: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 400,
      fontSize: 40,
      lineHeight: "125%",
    },
    textCharka48: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 400,
      fontSize: 48,
      lineHeight: "125%",
    },
    textCharka56: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 400,
      fontSize: 56,
      lineHeight: "125%",
    },

    textCharkaBold12: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 600,
      fontSize: 12,
      lineHeight: "125%",
    },
    textCharkaBold14: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 600,
      fontSize: 14,
      lineHeight: "125%",
    },
    textCharkaBold16: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: "125%",
    },
    textCharkaBold18: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 600,
      fontSize: 18,
      lineHeight: "125%",
    },
    textCharkaBold20: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 600,
      fontSize: 20,
      lineHeight: "125%",
    },
    textCharkaBold24: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 600,
      fontSize: 24,
      lineHeight: "125%",
    },
    textCharkaBold32: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 600,
      fontSize: 32,
      lineHeight: "125%",
    },
    textCharkaBold40: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 600,
      fontSize: 40,
      lineHeight: "125%",
    },
    textCharkaBold48: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 600,
      fontSize: 48,
      lineHeight: "125%",
    },
    textCharkaBold56: {
      fontFamily: '"Chakra Petch", sans-serif',
      fontWeight: 600,
      fontSize: 56,
      lineHeight: "125%",
    },

    textOrbi12: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 400,
      fontSize: 12,
      lineHeight: "125%",
    },
    textOrbi14: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "125%",
    },
    textOrbi16: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "125%",
    },
    textOrbi18: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 400,
      fontSize: 18,
      lineHeight: "125%",
    },
    textOrbi20: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 400,
      fontSize: 20,
      lineHeight: "125%",
    },
    textOrbi24: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 400,
      fontSize: 24,
      lineHeight: "125%",
    },
    textOrbi32: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 400,
      fontSize: 32,
      lineHeight: "125%",
    },
    textOrbi36: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 400,
      fontSize: 36,
      lineHeight: "125%",
    },
    textOrbi40: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 400,
      fontSize: 40,
      lineHeight: "125%",
    },
    textOrbi48: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 400,
      fontSize: 48,
      lineHeight: "125%",
    },
    textOrbi56: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 400,
      fontSize: 56,
      lineHeight: "125%",
    },

    textOrbiBold12: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
      fontSize: 12,
      lineHeight: "125%",
    },
    textOrbiBold14: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
      fontSize: 14,
      lineHeight: "125%",
    },
    textOrbiBold16: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: "125%",
    },
    textOrbiBold18: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
      fontSize: 18,
      lineHeight: "125%",
    },
    textOrbiBold20: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
      fontSize: 20,
      lineHeight: "125%",
    },
    textOrbiBold24: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
      fontSize: 24,
      lineHeight: "125%",
    },
    textOrbiBold32: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
      fontSize: 32,
      lineHeight: "125%",
    },
    textOrbiBold36: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
      fontSize: 36,
      lineHeight: "125%",
    },
    textOrbiBold40: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
      fontSize: 40,
      lineHeight: "125%",
    },
    textOrbiBold48: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
      fontSize: 48,
      lineHeight: "125%",
    },
    textOrbiBold56: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
      fontSize: 56,
      lineHeight: "125%",
    },

    textGeo12: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 400,
      fontSize: 12,
      lineHeight: "125%",
    },
    textGeo14: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "125%",
    },
    textGeo16: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "125%",
    },
    textGeo18: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 400,
      fontSize: 18,
      lineHeight: "125%",
    },
    textGeo20: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 400,
      fontSize: 20,
      lineHeight: "125%",
    },
    textGeo24: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 400,
      fontSize: 24,
      lineHeight: "125%",
    },
    textGeo32: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 400,
      fontSize: 32,
      lineHeight: "125%",
    },
    textGeo40: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 400,
      fontSize: 40,
      lineHeight: "125%",
    },
    textGeo48: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 400,
      fontSize: 48,
      lineHeight: "125%",
    },
    textGeo56: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 400,
      fontSize: 56,
      lineHeight: "125%",
    },

    textGeoBold12: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 600,
      fontSize: 12,
      lineHeight: "125%",
    },
    textGeoBold14: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 600,
      fontSize: 14,
      lineHeight: "125%",
    },
    textGeoBold16: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: "125%",
    },
    textGeoBold18: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 600,
      fontSize: 18,
      lineHeight: "125%",
    },
    textGeoBold20: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 600,
      fontSize: 20,
      lineHeight: "125%",
    },
    textGeoBold24: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 600,
      fontSize: 24,
      lineHeight: "125%",
    },
    textGeoBold32: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 600,
      fontSize: 32,
      lineHeight: "125%",
    },
    textGeoBold40: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 600,
      fontSize: 40,
      lineHeight: "125%",
    },
    textGeoBold48: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 600,
      fontSize: 48,
      lineHeight: "125%",
    },
    textGeoBold56: {
      fontFamily: 'Geom Graphic W03 Bold',
      fontWeight: 600,
      fontSize: 56,
      lineHeight: "125%",
    },

    textHelvetica12: {
      fontFamily: 'Helvetica',
      fontWeight: 400,
      fontSize: 12,
      lineHeight: "125%",
    },
    textHelvetica14: {
      fontFamily: 'Helvetica',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "125%",
    },
    textHelvetica16: {
      fontFamily: 'Helvetica',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "125%",
    },
    textHelvetica18: {
      fontFamily: 'Helvetica',
      fontWeight: 400,
      fontSize: 18,
      lineHeight: "125%",
    },
    textHelvetica24: {
      fontFamily: 'Helvetica',
      fontWeight: 400,
      fontSize: 24,
      lineHeight: "125%",
    },
    textHelvetica32: {
      fontFamily: 'Helvetica',
      fontWeight: 400,
      fontSize: 32,
      lineHeight: "125%",
    },
    textHelvetica40: {
      fontFamily: 'Helvetica',
      fontWeight: 400,
      fontSize: 40,
      lineHeight: "125%",
    },
    textHelvetica48: {
      fontFamily: 'Helvetica',
      fontWeight: 400,
      fontSize: 48,
      lineHeight: "125%",
    },
    textHelvetica56: {
      fontFamily: 'Helvetica',
      fontWeight: 400,
      fontSize: 56,
      lineHeight: "125%",
    },

    textHelveticaBold12: {
      fontFamily: 'Helvetica',
      fontWeight: 600,
      fontSize: 12,
      lineHeight: "125%",
    },
    textHelveticaBold14: {
      fontFamily: 'Helvetica',
      fontWeight: 600,
      fontSize: 14,
      lineHeight: "125%",
    },
    textHelveticaBold16: {
      fontFamily: 'Helvetica',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: "125%",
    },
    textHelveticaBold18: {
      fontFamily: 'Helvetica',
      fontWeight: 600,
      fontSize: 18,
      lineHeight: "125%",
    },
    textHelveticaBold24: {
      fontFamily: 'Helvetica',
      fontWeight: 600,
      fontSize: 24,
      lineHeight: "125%",
    },
    textHelveticaBold32: {
      fontFamily: 'Helvetica',
      fontWeight: 600,
      fontSize: 32,
      lineHeight: "125%",
    },
    textHelveticaBold40: {
      fontFamily: 'Helvetica',
      fontWeight: 600,
      fontSize: 40,
      lineHeight: "125%",
    },
    textHelveticaBold48: {
      fontFamily: 'Helvetica',
      fontWeight: 600,
      fontSize: 48,
      lineHeight: "125%",
    },
    textHelveticaBold56: {
      fontFamily: 'Helvetica',
      fontWeight: 600,
      fontSize: 56,
      lineHeight: "125%",
    },

    textKanit12: {
      fontFamily: 'Kanit',
      fontWeight: 400,
      fontSize: 12,
      lineHeight: "125%",
    },
    textKanit14: {
      fontFamily: 'Kanit',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "125%",
    },
    textKanit16: {
      fontFamily: 'Kanit',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "125%",
    },
    textKanit18: {
      fontFamily: 'Kanit',
      fontWeight: 400,
      fontSize: 18,
      lineHeight: "125%",
    },
    textKanit20: {
      fontFamily: 'Kanit',
      fontWeight: 400,
      fontSize: 20,
      lineHeight: "125%",
    },
    textKanit24: {
      fontFamily: 'Kanit',
      fontWeight: 400,
      fontSize: 24,
      lineHeight: "125%",
    },
    textKanit32: {
      fontFamily: 'Kanit',
      fontWeight: 400,
      fontSize: 32,
      lineHeight: "125%",
    },
    textKanit40: {
      fontFamily: 'Kanit',
      fontWeight: 400,
      fontSize: 40,
      lineHeight: "125%",
    },
    textKanit48: {
      fontFamily: 'Kanit',
      fontWeight: 400,
      fontSize: 48,
      lineHeight: "125%",
    },
    textKanit56: {
      fontFamily: 'Kanit',
      fontWeight: 400,
      fontSize: 56,
      lineHeight: "125%",
    },

    textKanitBold12: {
      fontFamily: 'Kanit',
      fontWeight: 600,
      fontSize: 12,
      lineHeight: "125%",
    },
    textKanitBold14: {
      fontFamily: 'Kanit',
      fontWeight: 600,
      fontSize: 14,
      lineHeight: "125%",
    },
    textKanitBold16: {
      fontFamily: 'Kanit',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: "125%",
    },
    textKanitBold18: {
      fontFamily: 'Kanit',
      fontWeight: 600,
      fontSize: 18,
      lineHeight: "125%",
    },
    textKanitBold20: {
      fontFamily: 'Kanit',
      fontWeight: 600,
      fontSize: 20,
      lineHeight: "125%",
    },
    textKanitBold24: {
      fontFamily: 'Kanit',
      fontWeight: 600,
      fontSize: 24,
      lineHeight: "125%",
    },
    textKanitBold32: {
      fontFamily: 'Kanit',
      fontWeight: 600,
      fontSize: 32,
      lineHeight: "125%",
    },
    textKanitBold40: {
      fontFamily: 'Kanit',
      fontWeight: 600,
      fontSize: 40,
      lineHeight: "125%",
    },
    textKanitBold48: {
      fontFamily: 'Kanit',
      fontWeight: 600,
      fontSize: 48,
      lineHeight: "125%",
    },
    textKanitBold56: {
      fontFamily: 'Kanit',
      fontWeight: 600,
      fontSize: 56,
      lineHeight: "125%",
    },
  })
);