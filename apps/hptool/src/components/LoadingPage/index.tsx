import styles from "./loading.module.css";

const LoadingPage = (props: any) => {
  return (
    <div className={styles.loadingPageDF}>
      <div className={styles.content}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
};

export default LoadingPage;
