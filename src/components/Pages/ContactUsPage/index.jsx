import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
import styles from "./ContactUs.module.scss"

const ContactUsPage = () => {
  const { t } = useTranslation()
  const [getElement, setGetElement] = useState("")

  useEffect(() => {
    const theme = document?.documentElement?.getAttribute("data-theme")

    if (theme) {
      setGetElement(theme)
    }

    const observer = new MutationObserver((mutations) => {
      const themeMutation = mutations.find(
        (mutation) =>
          mutation.attributeName === "data-theme" &&
          mutation.target === document.documentElement
      )

      if (themeMutation) {
        setGetElement(themeMutation.target.getAttribute("data-theme"))
      }
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className={styles.contactUsWrapper}>
      <div
        className={
          getElement === "dark" ? styles.container : styles.containerWhite
        }
      >
        <p className={styles.label}>{t("our_phone_number")}</p>
        <button onClick={() => window.open("tel:+998954748080", "_blank")}>
          +998 95 474 80 80
        </button>

        <p className={styles.label}>Telegram</p>
        <button
          onClick={() => window.open("https://t.me/qwattsupbot", "_blank")}
        >
          @qwattsupbot
        </button>

        <p className={styles.label}>{t("website")}</p>
        <button onClick={() => window.open("https://qwatt.uz/", "_blank")}>
          qwatt.uz
        </button>

        <p className={styles.label}>{t("email")}</p>
        <button onClick={() => window.open("mailto:mail@qwatt.uz", "_blank")}>
          mail@qwatt.uz
        </button>
      </div>
    </div>
  )
}

export default ContactUsPage
