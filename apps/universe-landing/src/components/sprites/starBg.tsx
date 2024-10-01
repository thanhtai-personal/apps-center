const StarBg = (props: any) => {
  return (
    <div>
      {!props.hide1 && <div id='stars'></div>}
      {!props.hide2 && <div id='stars2'></div>}
      {!props.hide3 && <div id='stars3'></div>}
    </div>
  )
}

export default StarBg