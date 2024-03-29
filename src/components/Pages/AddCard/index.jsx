import { useEffect, useRef, useState } from "react"

import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert"
import InputMask from "react-input-mask"
import { cardDetailsActions } from "@/store/CardDetails/cardDetails"
import cardicon from "@/assets/images/card.jpg"
import { checkCardType } from "@/helpers/checkCardType"
import { getCards, setCardToken } from "@/services/getCards"
import styles from "./style.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const AddingCard = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const params = new URLSearchParams(document.location.search)
  const navigate = useNavigate()
  const expiryDateRef = useRef()
  const cardNumberRef = useRef()
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cardTypeIcon, setCardTypeIcon] = useState(null)
  const [isCardNumError, setIsCardNumError] = useState(false)
  const [isExpiryDateError, setIsExpiryDateError] = useState(false)
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false)
  const [errorAlertText, setErrorAlertText] = useState("")
  const userData = useSelector((state) => state.userData?.data)
  const [myCards, setMyCards] = useState([])
  const [isBtnDisabled, setIsBtnDisabled] = useState(false)

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value)
    const { icon } = checkCardType(event.target.value)
    setCardTypeIcon(icon)
    setIsCardNumError(false)
  }

  const getMyCards = () => {
    getCards({
      data: {
        user: userData?.guid,
      },
    })
      .then((res) => {
        const responseData = res?.data?.data?.data?.response
        if (Array.isArray(responseData)) {
          setMyCards(responseData)
        } else {
          setErrorAlertOpen(true)
        }
      })
      .catch(() => {
        setErrorAlertOpen(true)
      })
  }

  const checkIfExists = () => {
    if (!myCards.length) return false
    const starredNumber =
      cardNumber.slice(0, 4) +
      cardNumber.slice(5, 7) +
      "******" +
      cardNumber.slice(15, 19)

    return !!myCards.find((item) => item.credit_card === starredNumber)
  }

  const handleExpiryDateChange = (event) => {
    let value = event.target.value
    value = value.replace(/\D/g, "")
    let val = value.replace(/^(\d{2})(\d)/, "$1/$2")
    let d = new Date()
    setExpiryDate(val)
    if (
      val[0] + val[1] > 12 ||
      val[3] + val[4] <
        d.getFullYear().toString()[2] + d.getFullYear().toString()[3]
    ) {
      setIsExpiryDateError(true)

      return
    } else if (
      val[0] + val[1] < d.getMonth() + 1 &&
      val[3] + val[4] ==
        d.getFullYear().toString()[2] + d.getFullYear().toString()[3]
    ) {
      setIsExpiryDateError(true)
      return
    }

    setIsExpiryDateError(false)
  }

  const handleCheckCardValid = () => {
    if (isBtnDisabled) return
    if (cardNumber.length < 16) {
      setIsCardNumError(true)
      return
    } else if (expiryDate.length < 5) {
      setIsExpiryDateError(true)
      return
    } else if (isCardNumError || isExpiryDateError) {
      return
    } else if (checkIfExists()) {
      setErrorAlertOpen(true)
      setErrorAlertText(t("youHaveAlreadyAddedThisCard"))
      return
    }

    setIsBtnDisabled(true)
    setCardToken({
      data: {
        card: cardNumber.trim().replace(/\s/g, ""),
        expired_date: expiryDate.replace("/", ""),
      },
    })
      .then((res) => {
        if (res?.data?.data?.data?.error_note) {
          setErrorAlertOpen(true)
          setErrorAlertText(res?.data?.data?.data?.error_note)
        } else if (res?.data?.data?.status == "done") {
          dispatch(
            cardDetailsActions.setCardDetails({
              ...res.data?.data?.data?.response?.[0],
              card_number: cardNumber.trim().replace(/\s/g, ""),
              expire_date: expiryDate.replace("/", ""),
            })
          )
          setIsBtnDisabled(false)
          if (params.get("from") == "order") {
            navigate("/uz/otp?from=order", { replace: true })
          } else if (params.get("from") == "payment") {
            navigate("/uz/otp?from=payment", { replace: true })
          } else {
            navigate(`/uz/otp?card_number=${cardNumber}`)
          }
        } else {
          setErrorAlertOpen(true)
        }
      })
      .catch(() => {
        setErrorAlertOpen(true)
      })
      .finally(() => {
        setIsBtnDisabled(false)
      })
  }

  useEffect(() => {
    getMyCards()
  }, [])

  useEffect(() => {
    if (
      cardNumber.trim().replace(/\s/g, "").length == 16 &&
      expiryDate.length == 5
    ) {
      handleCheckCardValid()
    }
  }, [cardNumber, expiryDate])

  useEffect(() => {
    if (
      expiryDateRef?.current &&
      cardNumber.trim().replace(/\s/g, "").length == 16
    ) {
      expiryDateRef?.current?.focus()
    }
  }, [cardNumber])

  return (
    <div className={styles.addingCardWrap}>
      <div className={styles.cardHeaderText}>{t("card_is_secured")}</div>
      <div className={styles.addCardBox}>
        <div className={styles.cardNumber}>
          <p>{t("card_number")}</p>
          <div className={styles.cardBody}>
            <img
              src={cardTypeIcon || cardicon}
              className={`h-[32px] w-[32px] p-1`}
              alt="card"
            ></img>
            <InputMask
              ref={cardNumberRef}
              mask="9999 9999 9999 9999"
              autoFocus={cardNumber.trim().replace(/\s/g, "").length != 16}
              maskChar={null}
              placeholder={t("card_number")}
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>
          {isCardNumError && (
            <div className="text-sm text-red-600">
              {t("card_num_validation_error")}
            </div>
          )}
        </div>
        <div className={styles.cardData}>
          <div className={styles.cardInfo}>
            <p>
              {t("month")} / {t("year")}
            </p>
            <div className={styles.cardDate}>
              <input
                ref={expiryDateRef}
                maxLength={5}
                className={styles.InputMask}
                placeholder={t("expiry_date")}
                value={expiryDate}
                onChange={handleExpiryDateChange}
              ></input>
            </div>
            {isExpiryDateError && (
              <div className="text-sm text-red-600">
                {t("expiry_date_validation_error")}
              </div>
            )}
          </div>
        </div>
      </div>

      <ErrorAlert
        openAlert={isErrorAlertOpen}
        setOpenAlert={setErrorAlertOpen}
        errorMesage={errorAlertText}
      />

      <button
        className={`${isBtnDisabled ? styles.disabledBtn : ""} ${
          styles.addBtn
        }`}
        onClick={handleCheckCardValid}
      >
        {t("confirm")}
      </button>
    </div>
  )
}

export default AddingCard
