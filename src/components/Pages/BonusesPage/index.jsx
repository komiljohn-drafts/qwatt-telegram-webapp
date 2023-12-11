import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { BiggerStarIcon } from "@/screen-capture/icons"
import { getBonus, giveGifts } from "@/services/getProfile"
import styles from "./BonusesPage.module.scss"

const BonusesPage = () => {
  const userData = useSelector((state) => state.userData?.data)
  const [promocode, setPromocode] = useState("")
  const [getElement, setGetElement] = useState("")
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false)
  const [errorAlertOptions, setErrorAlertOptions] = useState("")
  const [bonus, setBonus] = useState("")
  const { t } = useTranslation()

  const fetchBonus = () => {
    if (!userData?.guid) {
      setErrorAlertOpen(true)
      return
    }
    getBonus({
      data: {
        offset: 1,
        limit: 10,
        user_id: [userData?.guid],
      },
    })
      .then((res) => {
        if (res?.status === "OK") {
          if (res?.data?.data?.response?.length > 0) {
            setBonus(res?.data?.data?.response?.[0]?.balance)
          } else {
            setBonus(0)
          }
        } else {
          setErrorAlertOpen(true)
        }
      })
      .catch((err) => {
        setErrorAlertOpen(true)
      })
  }

  const submit = () => {
    giveGifts({
      data: {
        guid: userData?.guid,
        name_promocode: promocode,
      },
    })
      .then((res) => {
        console.log("res", res) // log
        if (res?.data?.data?.data?.error_note === 500) {
          setErrorAlertOptions({
            title: "",
            message: t("already_used_promocode"),
          })
          setErrorAlertOpen(true)
        } else if (res?.data?.data?.status === "done") {
          fetchBonus()
          setPromocode("")
          setErrorAlertOptions({
            title: t("promo_code_enabled"),
            message: " ",
          })
          setErrorAlertOpen(true)
        }
      })
      .catch((err) => {
        console.log("err", err) // log
      })
  }

  useEffect(() => {
    fetchBonus()
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

  return (
    <div className={styles.container}>
      <div className={styles.blueBg}>
        <div className={styles.bonusesContainer}>
          <p>{t("scores")}</p>
          <div className={styles.bonuses}>
            <p>{bonus}</p>
            <BiggerStarIcon />
          </div>
        </div>
      </div>

      <div
        className={
          getElement === "dark"
            ? styles.promocodeContainer
            : styles.promocodeContainerWhite
        }
      >
        <label>{t("get_bonuses")}</label>
        <input
          type="text"
          value={promocode}
          onChange={(e) => setPromocode(e.target.value)}
          placeholder={t("promo_code")}
        />
        <button onClick={submit}>{t("activate")}</button>
      </div>
      <ErrorAlert
        openAlert={isErrorAlertOpen}
        setOpenAlert={setErrorAlertOpen}
        title={errorAlertOptions.title}
        errorMesage={errorAlertOptions.message}
      />
    </div>
  )
}

export default BonusesPage
