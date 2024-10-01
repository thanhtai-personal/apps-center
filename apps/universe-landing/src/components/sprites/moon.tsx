const Moon = (props: any) => {

  return (
    <div className="absolute moon-orbit transition-all"
      style={{
        transitionDuration: "1s",
        top: props.top,
        left: props.left,
        width: 6 * (props.width || 20),
        height: 6 * (props.height || 20),
      }}
    >
      <div className="moon"
        style={{
          width: props.width || 20,
          height: props.height || 20,
        }}></div>
    </div>
  )
}

export default Moon