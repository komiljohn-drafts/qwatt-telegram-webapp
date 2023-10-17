import { useTranslation } from "react-i18next"
import styles from "./ContactUs.module.scss"

const ContactUsPage = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.contactUsWrapper}>
      <div className={styles.container}>
        <p className={styles.label}>{ t("our_phone_number") }</p>
        <a href="tel:+998954748080">+998 95 474 80 80</a>
        
        <p className={styles.label}>{ t("website") }</p>
        <a href="https://qwatt.uz/">qwatt.uz</a>

        <p className={styles.label}>{ t("email") }</p>
        <a href="mailto:mail@qwatt.uz">mail@qwatt.uz</a>
      </div>
    </div>
  )
}

export default ContactUsPage