const Saturn = (props: any) => {

  return (
    <div className="absolute transition-all z-10"
      style={{
        transitionDuration: "900ms",
        borderRadius: "50%",
        left: props.left || "-150%",
        top: props.top || "70%",
        width: props.width || 320,
        height: props.height || 320,
        boxShadow: "0 0 60px -20px rgba(255, 189, 3, 0.72), -14px -15px 40px -10px rgba(255, 238, 191, 0.23)",
      }}
    >
      <div className="space">
        <div className="planet" style={{
          width: props.width || 320,
          height: props.height || 320,
        }}>
          <div className="circle1"
            style={{
              left: `${100 * ((props.width || 320) / 320)}px`,
              top: `${290 * ((props.height || 320) / 320)}px`,
              width: 40 * ((props.width || 320) / 320),
              height: 45 * ((props.height || 320) / 320),
            }}
          ></div>
          <div className="circle2"
            style={{
              top: `${90 * ((props.height || 320) / 320)}px`,
              left: `${120 * ((props.width || 320) / 320)}px`,
              width: 65 * ((props.width || 320) / 320),
              height: 75 * ((props.height || 320) / 320),
            }}
          ></div>
          <div className="circle3" style={{
            top: `${70 * ((props.height || 320) / 320)}px`,
            left: `${20 * ((props.width || 320) / 320)}px`,
            width: 55 * ((props.width || 320) / 320),
            height: 75 * ((props.height || 320) / 320),
          }}></div>
          <div className="circle4"
            style={{
              top: `${170 * ((props.height || 320) / 320)}px`,
              left: `${230 * ((props.width || 320) / 320)}px`,
              width: 80 * ((props.width || 320) / 320),
              height: 100 * ((props.height || 320) / 320),
            }}
          ></div>
          <div className="circle5"
            style={{
              top: `${30 * ((props.height || 320) / 320)}px`,
              left: `${90 * ((props.width || 320) / 320)}px`,
              width: 45 * ((props.width || 320) / 320),
              height: 55 * ((props.height || 320) / 320),
            }}
          ></div>
        </div>
        <div className="bigCircle" style={{
          width: 500 * ((props.width || 320) / 320),
          height: 100 * ((props.height || 320) / 320),
        }}></div>
      </div>
    </div >
  )
}

export default Saturn