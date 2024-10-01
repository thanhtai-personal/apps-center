import Image from "next/image"

const Earth = (props: any) => {

  return (
    <div className="absolute rounded-full transition-all z-10"
      style={{
        transitionDuration: "2s",
        left: props.left || "250%",
        top: props.top || "150%",
        width: props.width || 100,
        height: props.height || 100,
      }}
    >
      <div className="earth-wrapper">
        <div className="earth">
          <Image src={"/images/earth-asia.svg"} alt="earth-asia" width={props.width || 100} height={props.height || 100} />
        </div>
      </div>
    </div>
  )
}

export default Earth