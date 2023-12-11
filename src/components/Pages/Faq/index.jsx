import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert"
import FullScreenSpinner from "@/components/atoms/FullScreenSpinner"
import { getFaqs } from "@/services/getPrice"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import styles from "./Faq.module.scss"
import { DownIcon, UpIcon } from "@/screen-capture/icons"

const FaqPage = () => {
  const [data, setData] = useState(null)
  const [getElement, setGetElement] = useState("")
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false)
  const [openCard, setOpenCard] = useState(null)
  const { i18n } = useTranslation()

  const langObj = {
    en: "english",
    ru: "russian",
    uz: "uzbek",
  }

  const lang = langObj[i18n?.language]

  const { t } = useTranslation()

  const getFaq = () => {
    getFaqs({
      data: {
        language: lang,
        type: "Faq",
      },
    })
      .then((res) => {
        if (res?.data?.data?.data?.response) {
          setData(res?.data?.data?.data?.response)
        } else if (res?.data?.data?.data?.error) {
          setErrorAlertOpen(true)
        } else if (res?.data?.data?.data?.response == null) {
          setData([])
        }
      })
      .catch(() => {
        setErrorAlertOpen(true)
      })
  }

  useEffect(() => {
    getFaq()
  }, [])

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

  if (!data) return <FullScreenSpinner />
  return (
    <div className={styles.faqWrapper}>
      {data?.map((item, index) => (
        <div
          key={index}
          className={
            getElement === "dark"
              ? styles.questionCard
              : styles.questionCardWhite
          }
        >
          <p className={styles.question}>{item.title}</p>

          <div
            className={`${styles.openCard} ${
              openCard == index ? "" : styles.card
            }`}
          >
            <p className={styles.answer}>{item.description}</p>
          </div>

          <div className={styles.moreWrap}>
            <div
              onClick={() =>
                setOpenCard((oldV) => (oldV == index ? null : index))
              }
            >
              {openCard != index ? t("more") : t("close")}
            </div>
            {openCard != index ? <DownIcon /> : <UpIcon />}
          </div>
        </div>
      ))}

      <ErrorAlert
        openAlert={isErrorAlertOpen}
        setOpenAlert={setErrorAlertOpen}
      />
    </div>
  )
}

export default FaqPage
