import "./custom.style.css"
import "@core-ui/react-animates/dist/BubbleWrapper.style.css"


import { observer, useLocalObservable } from "@core-ui/react-mobx-state";
import { Flex, Text } from "@core-ui/react-mui-core";
import lightbg from "@/assets/images/lightbg.png";
import avt from "@/assets/images/avatar.png";
import onlineSignal from "@/assets/icons/online-signal.svg"
import { useGlobalStyles } from "@/styles/globalStyle";
import { Animates } from "@core-ui/react-animates";
import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { TopMenu } from "./TopMenu";
import { SkillsSet } from "./SkillSet";
import { useEffect } from "react";

export const Banner = observer(() => {

  return (
    <Flex fullSize column position={"relative"} minHeight={"100vh"}>
      <div id="section-welcome"></div>
      <Flex fullWidth center mt={2}>
        <Flex fullWidth center maxWidth={PAGE_MAX_WIDTH}>
          <Animates.GrowDownAppear delay={1}>
            <Flex fullWidth center mt={2}>
              <TopMenu />
            </Flex>
          </Animates.GrowDownAppear>
        </Flex>
      </Flex>

      <Bg1 />
      <Bg2 />
      <Bg4 />
      <Content />
    </Flex>
  )
})

const Bg1 = () => {
  return (
    <div className="framer-001" style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: 'absolute',
          borderRadius: 'inherit',
          top: 0,
          left: "-50%",
          width: "200%",
        }}
      >
        <img
          src={lightbg}
          alt=""
          srcSet={`
        ${lightbg}?scale-down-to=512 512w,
        ${lightbg}?scale-down-to=1024 1024w,
        ${lightbg}?scale-down-to=2048 2048w,
        ${lightbg} 3828w
      `}
          sizes="calc(260vw + 192px)"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            objectPosition: 'center',
            objectFit: 'fill',
            imageRendering: 'auto'
          }}
        />
      </div>
    </div>
  );
}

const Bg2 = observer(() => {
  const state = useLocalObservable(() => ({
    rotate: false,
  }))

  const handleClickDocument = () => {
    state.rotate = !state.rotate;
  }

  useEffect(() => {
    document.addEventListener('click', handleClickDocument);

    return () => {
      document.removeEventListener('click', handleClickDocument);
    }
  }, [])

  return (
    <div className="framer-002" style={{ pointerEvents: "none" }}>
      {state.rotate && <Flex
        position={"absolute"}
        top={5}
        left={"50%"}
        center
        width={5}
        height={5}
        className="bigger"
      >
        <Flex fontSize={2}>
          <Animates.GlowingBallAnim id="bg-plasma" width={5} />
        </Flex>
      </Flex>}
      <div
        className={`framer-003 ${state.rotate ? "rotate" : ""}`}
        data-border="true"
        style={{ animationDuration: "2.65s" }}
      ></div>
      <div
        className={`framer-004 ${state.rotate ? "rotate-invert" : ""}`}
        data-border="true"
        style={{ animationDuration: "2.55s" }}
      ></div>
      <div
        className={`framer-005 ${state.rotate ? "rotate" : ""}`}
        data-border="true"
        style={{ animationDuration: "2.35s" }}
      ></div>
      <div
        className={`framer-006 ${state.rotate ? "rotate-invert" : ""}`}
        data-border="true"
        style={{ animationDuration: "2.25s" }}
      ></div>
    </div>

  )
})

const Bg4 = () => {

  return (
    <Flex fullWidth position={"absolute"} style={{ pointerEvents: "none" }}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1134 580">
        <g opacity="0.2">
          <defs>
            <linearGradient id="idss3678186748_1g1109944988" x1="0" x2="1" y1="0.7445597065487722" y2="0.25544029345122776">
              <stop offset="0" stopColor="rgb(198,252,166)" stopOpacity="1"></stop>
              <stop offset="1" stopColor="rgba(167,252,238,0.74)" stopOpacity="0.74"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 301.51 77.943 L 309.493 85.274 L 319.537 80.144 L 311.832 88.43 L 316.545 98.232 L 308.562 90.901 L 298.518 96.031 L 306.223 87.745 Z"
            fill="url(#idss3678186748_1g1109944988)"
          ></path>
        </g>
        <g opacity="0.2">
          <defs>
            <linearGradient id="idss3678186748_2g-1109944964" x1="0.8258206905684056" x2="0.17417930943159454" y1="1" y2="0">
              <stop offset="0" stopColor="rgb(198,252,166)" stopOpacity="1"></stop>
              <stop offset="1" stopColor="rgba(167,252,238,0.74)" stopOpacity="0.74"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 279.445 137.012 L 283.389 131.773 L 279.489 126.168 L 284.942 130.311 L 290.426 126.677 L 286.482 131.917 L 290.381 137.522 L 284.929 133.378 Z"
            fill="url(#idss3678186748_2g-1109944964)"
          ></path>
        </g>
        <path
          d="M 1021 579.192 C 1021.7 553.241 1032.22 489.695 1068.69 443.123"
          fill="transparent"
          strokeWidth="2.80556"
          stroke="rgb(NaN,NaN,NaN)"
          strokeMiterlimit="10"
          strokeDasharray=""
        ></path>
        <path
          d="M 73.346 249.084 C 70.467 237.474 59.456 209.915 38.442 192.558"
          fill="transparent"
          strokeWidth="1.29265"
          stroke="rgb(NaN,NaN,NaN)"
          strokeMiterlimit="10"
          strokeDasharray=""
        ></path>
        <g opacity="0.2">
          <defs>
            <linearGradient id="idss3678186748_5g-1109945003" x1="0.592401935106172" x2="0.40759806489382805" y1="1" y2="0">
              <stop offset="0" stopColor="rgb(198,252,166)" stopOpacity="1"></stop>
              <stop offset="1" stopColor="rgba(167,252,238,0.74)" stopOpacity="0.74"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 983.592 250.416 L 996.604 242.733 L 993.239 227.363 L 1001.2 240.988 L 1016.08 238.081 L 1003.06 245.764 L 1006.43 261.133 L 998.47 247.508 Z"
            fill="url(#idss3678186748_5g-1109945003)"
          ></path>
        </g>
        <g transform="translate(131.87 2.026)" id="ss3678186748_6">
          <g>
            <defs>
              <radialGradient id="idss3678186748_7g-1943131669" cy="1.0942496759955325" cx="11.160324215276955" r="0.7566035478087627">
                <stop offset="0" stopColor="rgb(153,217,183)" stopOpacity="1"></stop>
                <stop offset="1" stopColor="rgb(97,255,184)" stopOpacity="1"></stop>
              </radialGradient>
            </defs>
            <path
              d="M 4.396 12.611 C 3.986 12.485 3.743 12.08 3.817 11.636 C 4.417 7.663 4.061 6.975 0.532 5.439 C 0.127 5.259 -0.09 4.807 0.036 4.397 C 0.163 3.982 0.586 3.738 1.027 3.805 C 4.815 4.411 5.401 4.105 7.225 0.513 C 7.428 0.114 7.845 -0.088 8.249 0.036 C 8.665 0.164 8.903 0.566 8.84 1.014 C 8.23 4.978 8.586 5.666 12.109 7.2 C 12.525 7.39 12.739 7.829 12.61 8.25 C 12.484 8.659 12.072 8.907 11.62 8.837 C 7.823 8.239 7.244 8.541 5.432 12.138 C 5.216 12.538 4.795 12.733 4.396 12.611 Z"
              fill="url(#idss3678186748_7g-1943131669)"
            ></path>
          </g>
        </g>
        {/* Continue for the rest of the SVG content */}
      </svg>
    </Flex>
  )
}

const Content = () => {
  const globalStyle = useGlobalStyles();

  return (
    <Flex fullWidth center column minHeight={800}>
      <Flex fullWidth maxWidth={500} center column>
        <Flex column center>
          <Flex fullWidth center>
            <Animates.SlideUpAppear delay={0.5}>
              <Flex fullWidth center>
                <img src={avt} style={{ width: 60 }} />
              </Flex>
            </Animates.SlideUpAppear>
          </Flex>
          <Flex centerY
            bgcolor={"rgba(255,255,255,0.2)"}
            px={1}
            py={0.5}
            borderRadius={"8px"}
            style={{
              transform: "translateY(-10px)",
              backdropFilter: "blur(2px)",
            }}>
            <img src={onlineSignal} className="animate-live" />
            <Text className={globalStyle.textKanit12}
            >
              Available for opportunities
            </Text>
          </Flex>
        </Flex>
        <Flex fullWidth center>
          <Animates.GrowUpAppear delay={1} >
            <Flex fullWidth center>
              <Text className={globalStyle.textOrbiBold32}
                whiteSpace={"pre-line"}
                style={{ lineHeight: "90%" }}
              >
                {`
                    Welcome to \n
                    my digital humble abode
                  `}
              </Text>
            </Flex>
          </Animates.GrowUpAppear>
        </Flex>
        <Flex fullWidth center>
          <Animates.FadeAppear delay={1} >
            <Flex fullWidth center>
              <Text className={globalStyle.textKanit16}
                color={"#FFFFFF66"}
                whiteSpace={"pre-line"}
                style={{ lineHeight: "90%", marginTop: "16px" }}>
                {
                  `I’m an independent developer.\n
                  My interest lies in brand experience, and user experience.`
                }
              </Text>
            </Flex>
          </Animates.FadeAppear>
        </Flex>
      </Flex>

      <Flex fullWidth center mt={18}>
        <Animates.GrowUpAppear delay={2}>
          <Flex fullWidth center>
            <SkillsSet />
          </Flex>
        </Animates.GrowUpAppear>
      </Flex>
    </Flex>
  )
}