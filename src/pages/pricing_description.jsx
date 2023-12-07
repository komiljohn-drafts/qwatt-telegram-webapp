import { useEffect, useState } from "react"

import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert"
import FullScreenSpinner from "@/components/atoms/FullScreenSpinner"
import MobileHeader from "@/components/UI/MobileHeader"
import { getTariffs } from "@/services/getTariffs"
import styles from "./style.module.scss"
import { useTranslation } from "react-i18next"

const langObj = {
  en: "english",
  ru: "russian",
  uz: "uzbek",
}

const Tarif = () => {
  const [data, setData] = useState(null)
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const lang = langObj[i18n?.language]

  useEffect(() => {
    getTariffs({
      data: {
        documents_type: "pricing",
        description_language: lang,
      },
    })
      .then((res) => {
        if (res.data.data.response[0].description) {
          setData(res.data.data.response[0].description)
        } else {
          setErrorAlertOpen(true)
        }
      })
      .catch(() => {
        setErrorAlertOpen(true)
      })
  }, [])

  return (
    <div>
      <MobileHeader title={t("tariffs")} isBlueBg={true} />

      {!data && <FullScreenSpinner />}

      <ErrorAlert
        openAlert={isErrorAlertOpen}
        setOpenAlert={setErrorAlertOpen}
      />

      <div
        className={styles.priceHtml}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  )
}

export default Tarif
