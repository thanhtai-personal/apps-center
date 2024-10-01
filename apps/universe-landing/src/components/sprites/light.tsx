const Light = (props: any) => {

  return (
    <div className="absolute rounded-full transition-all z-10"
      style={{
        transitionDuration: "2s",
        left: props.left || "250%",
        top: props.top || "150%",
        filter: "blur(100px)",
        width: props.width || 100,
        height: props.height || 100,
        background: props.background || `linear-gradient(146deg, rgba(255, 80, 64, 0.502) 0%, rgba(255, 210, 72, 0.35) 50%, rgba(94, 219, 124, 0.280) 100%)`,
      }}
    >

    </div>
  )
}

export default Light