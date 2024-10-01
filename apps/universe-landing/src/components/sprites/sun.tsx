const Sun = (props: any) => {

  return (
    <div className="absolute rounded-full transition-all z-10"
      style={{
        transitionDuration: "2s",
        left: props.left || "250%",
        top: props.top || "150%",
        background: props.background || "radial-gradient(#f4c313, #ec7e08)",
        boxShadow: "0 0 50px #f5c91a",
        animation: "sunFlare 4s infinite alternate",
        width: props.width || 100,
        height: props.height || 100,
      }}
    >

    </div>
  )
}

export default Sun