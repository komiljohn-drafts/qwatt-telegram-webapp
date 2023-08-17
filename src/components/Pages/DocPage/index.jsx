import { ForwardIcon } from "@/screen-capture/icons";
// import icon from "@/assets/images/rusIcon.png";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DocPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      {/* <div className={styles.langBox}>
        <p className={styles.langText}>{t("rus")}</p>
        <img src={icon}></img>
      </div> */}

      <div className={styles.docWrap}>
        <div
          className={styles.document}
          onClick={() => navigate("/term&conditions")}
        >
          <div>{t("user_agreements")}</div>
          <ForwardIcon />
        </div>
        <div
          className={styles.document}
          onClick={() => navigate("/privacypolicy")}
        >
          <div>{t("data_processing")}</div>
          <ForwardIcon />
        </div>
        <div className={styles.document} onClick={() => navigate("/requisites")}>
          <div>{t("requisites")}</div>
          <ForwardIcon />
        </div>
      </div>
    </div>
  );
};

export default DocPage;
