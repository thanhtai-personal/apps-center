import Moon from "./sprites/moon"
import Saturn from "./sprites/saturn"
import StarBg from "./sprites/starBg"
import Sun from "./sprites/sun"
import Earth from "./sprites/earth"

const BackgroundContainer = (props: any) => {

  const sunProps = props.useSun ? {
    left: "65%",
    top: "40px",
    width: 1500,
    height: 1500,
  } : {}

  const moonProps = props.showMoon ? {
    left: "25%",
    top: "60%",
    width: 40,
    height: 40,
  } : {}

  const saturnProps = props.showSaturn ? {
    left: "25%",
    top: "180px",
    width: 100,
    height: 100,
  } : {}

  const earthProps = props.showEarth ? {
    left: "15%",
    top: "650px",
    width: 100,
    height: 100,
  } : {}

  return (
    <div className={`w-full h-full bg-cover bg-no-repeat backdrop-blur-sm overflow-hidden bg-black relative`}
      style={{
        backgroundImage: props.image,
      }}
    >
      <Saturn {...saturnProps} />
      <Sun {...sunProps} />
      <Moon {...moonProps} />
      <Earth {...earthProps} />
      {props.showStarBg && <StarBg />}
      <div className={`w-full h-full absolute z-20 bg-transparent ${props.className}`}>
        {props.children}
      </div>
    </div>
  )
}

export default BackgroundContainer