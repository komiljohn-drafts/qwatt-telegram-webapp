import { ForwardIcon } from "@/screen-capture/icons";
import icon from "@/assets/images/rusIcon.png";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const DocPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.langBox}>
        <p className={styles.langText}>Русский </p>
        <img src={icon}></img>
      </div>

      <div className={styles.docWrap}>
        <div
          className={styles.document}
          onClick={() => navigate("/term&conditions")}
        >
          <div>Пользовательские соглашения</div>
          <ForwardIcon />
        </div>
        <div
          className={styles.document}
          onClick={() => navigate("/privacypolicy")}
        >
          <div>Обработка данных</div>
          <ForwardIcon />
        </div>
        <div className={styles.document} onClick={() => navigate("/faq")}>
          <div>Реквизиты</div>
          <ForwardIcon />
        </div>
      </div>
    </div>
  );
};

export default DocPage;
