import { useEffect, useRef } from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const ObserverLoadingContainer = (props) => {
  const componentRef: any = useRef(null);
  const styles: any = useStyles(props);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (componentRef.current.className === "hidden") {
            componentRef.current.className = props.className || styles.root;
          }
        } else if (!props.once) {
          if (componentRef.current.className !== "hidden") {
            componentRef.current.className = "hidden";
          }
        }
      });
    });
    observer.observe(componentRef.current);
    return () => {
      observer.disconnect();
    };
  }, [props.className]);

  return (
    <div style={{ width: "100%" }} ref={componentRef} className={"hidden"}>
      {props.children}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      animation: "$init_section 400ms ease-in-out",
    },
    "@keyframes init_section": {
      "0%": {
        opacity: 0,
        transform: (props: any) =>
          props.faceOnly ? "unset" : "translateY(100px)",
      },
      "100%": {
        opacity: 1,
      },
    },
  })
);

export default ObserverLoadingContainer;
