import { ForwardIcon } from "@/screen-capture/icons"
// import icon from "@/assets/images/rusIcon.png";
import styles from "./style.module.scss"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const DocPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      {/* <div className={styles.langBox}>
        <p className={styles.langText}>{t("rus")}</p>
        <img src={icon}></img>
      </div> */}

      <div className={styles.docWrap}>
        <div
          className={styles.document}
          onClick={() => navigate("/uz/term&conditions")}
        >
          <p>{t("user_agreements")}</p>
          <ForwardIcon />
        </div>
        <div
          className={styles.document}
          onClick={() => navigate("/uz/privacypolicy")}
        >
          <p>{t("data_processing")}</p>
          <ForwardIcon />
        </div>
        <div
          className={styles.document}
          onClick={() => navigate("/uz/requisites")}
        >
          <p>{t("requisites")}</p>
          <ForwardIcon />
        </div>
      </div>
    </div>
  )
}

export default DocPage
