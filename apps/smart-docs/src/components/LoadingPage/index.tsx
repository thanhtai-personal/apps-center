import styles from "app/styles/loading.module.css";
import { useEffect, useState } from "react";

const LoadingPage = (props: any) => {
  const [circleDisplay, setCircleDisplay] = useState(false);
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCircleDisplay(true);
    }, 1200);
    setTimeout(() => {
      setRotate(true);
    }, 4500);
  }, []);

  return (
    <div className={styles.loadingPage}>
      <div className={styles.relative}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
        <div className={styles.absolute}>
          <div
            className={styles.circle}
            style={{
              display: circleDisplay ? "flex" : "none",
            }}
          >
            <div
              className={styles.circle2}
              style={{
                display: circleDisplay ? "flex" : "none",
              }}
            >
              <div
                className={rotate ? styles.rotate : styles.halfCircleWrap}
                style={{
                  display: circleDisplay ? "flex" : "none",
                }}
              >
                <div
                  className={styles.halfCircle}
                  style={{
                    display: circleDisplay ? "flex" : "none",
                  }}
                ></div>
              </div>
              <div
                className={styles.circle4}
                style={{
                  display: circleDisplay ? "flex" : "none",
                }}
              >
                <div className={styles.iconWrapper}>
                  <div className={styles.icon1}>
                    <img src={"/images/icon-1.png"} />
                  </div>
                  <div className={rotate ? styles.icon2Rotate : styles.icon2}>
                    <img src={"/images/icon-2.png"} />
                  </div>
                  <div className={styles.icon3}>
                    <img src={"/images/icon-3.png"} />
                  </div>
                  <div className={styles.icon4}>
                    <img src={"/images/icon-4.png"} />
                  </div>
                  <div className={styles.icon5}>
                    <img src={"/images/icon-5.png"} />
                  </div>
                  <div className={rotate ? styles.icon6Rotate : styles.icon6}>
                    <img src={"/images/icon-6.png"} />
                  </div>
                  <div className={styles.icon7}>
                    <img src={"/images/icon-7.png"} />
                  </div>
                  <div className={styles.intelligent}>
                    <img src={"/images/intelligent.png"} />
                  </div>
                  <div className={styles.map}>
                    <img src={"/images/map.png"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
