import { SuccessIcon } from "@/screen-capture/icons";
import styles from "./style.module.scss";

const SuccessPage = () => {
  return (
    <div className={styles.successBox}>
      <div className={styles.successWrap}>
        <SuccessIcon />
        <h1 className={styles.header}>Успешно арендовано</h1>
        <p className={styles.text}>Заряжайте и наслаждайтесь использованием.</p>
      </div>

      <a href="/">
        <button className={styles.goMainBtn}>В главное меню</button>
      </a>
    </div>
  );
};

export default SuccessPage;
