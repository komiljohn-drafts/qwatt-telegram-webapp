import { ForwardIcon } from "@/screen-capture/icons";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const DocPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.langBox}>
        <p className={styles.langText}>Русский </p>
        <img src="./images/rusIcon.png"></img>
      </div>

      <div className={styles.docWrap}>
        <div
          className={styles.document}
          onClick={() => navigate("/doc/term&conditions")}
        >
          <div>Пользовательские соглашения</div>
          <ForwardIcon />
        </div>
        <div
          className={styles.document}
          onClick={() => navigate("/doc/privacypolicy")}
        >
          <div>Обработка данных</div>
          <ForwardIcon />
        </div>
        <div className={styles.document} onClick={() => navigate("/doc/faq")}>
          <div>Реквизиты</div>
          <ForwardIcon />
        </div>
      </div>
    </div>
  );
};

export default DocPage;
