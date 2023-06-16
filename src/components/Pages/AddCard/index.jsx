import { useNavigate, useParams } from "react-router-dom";

import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert";
import InputMask from "react-input-mask";
import { cardDetailsActions } from "@/store/CardDetails/cardDetails";
import { setCardToken } from "@/services/getCards";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";

const AddingCard = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isCardNumError, setIsCardNumError] = useState(false);
  const [isExpiryDateError, setIsExpiryDateError] = useState(false);
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertProps, setErrorAlertProps] = useState({});

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
    setIsCardNumError(false);
  };

  const handleExpiryDateChange = (event) => {
    const val = event.target.value;
    let d = new Date();
    setExpiryDate(val);
    if (
      val[0] + val[1] > 12 ||
      val[3] + val[4] <
        d.getFullYear().toString()[2] + d.getFullYear().toString()[3]
    ) {
      setIsExpiryDateError(true);

      return;
    } else if (
      val[0] + val[1] < d.getMonth() + 1 &&
      val[3] + val[4] ==
        d.getFullYear().toString()[2] + d.getFullYear().toString()[3]
    ) {
      setIsExpiryDateError(true);
      return;
    }

    setIsExpiryDateError(false);
  };

  const handleCheckCardValid = () => {
    if (cardNumber.length < 16) {
      setIsCardNumError(true);
      return;
    } else if (expiryDate.length < 5) {
      setIsExpiryDateError(true);
      return;
    } else if (isCardNumError || isExpiryDateError) {
      return;
    }

    setCardToken({
      data: {
        card: cardNumber.trim().replace(/\s/g, ""),
        expired_date: expiryDate.replace("/", ""),
      },
    })
      .then((res) => {
        console.log("card create res", res);
        if (res?.data?.data?.status == "done") {
          dispatch(
            cardDetailsActions.setCardDetails({
              ...res.data?.data?.data?.response?.[0],
              card_number: cardNumber.trim().replace(/\s/g, ""),
              expire_date: expiryDate.replace("/", ""),
            })
          );
          if (params?.from == "order") {
            navigate("/otp", { from: "order" });
          } else if (params?.from == "payment") {
            navigate("/otp", { from: "payment" });
          } else {
            navigate("/otp");
          }
        } else {
          setErrorAlertOpen(true);
          setErrorAlertProps({
            text: res?.data?.data?.data?.error_note,
            action: () => {
              setErrorAlertOpen(false);
            },
          });
        }
      })
      .catch((err) => console.log("card create err", err));
  };

  return (
    <div className={styles.addingCardWrap}>
      <div className={styles.cardHeaderText}>
        Данные вашей карты надёжно защищены. При дальнейших платежах повторно
        вводить данные не потребуется
      </div>
      <div className={styles.addCardBox}>
        <div className={styles.cardNumber}>
          <p>Номер карты</p>
          <div className={styles.cardBody}>
            <img src="images/Frame.svg" alt="icon"></img>
            <InputMask
              mask="9999 9999 9999 9999"
              maskChar={null}
              placeholder="Номер карты"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>
          {isCardNumError && (
            <div className="text-sm text-red-600">
              Номер карты должен состоять из 16 цифр
            </div>
          )}
        </div>
        <div className={styles.cardData}>
          <div className={styles.cardInfo}>
            <p>Месяц / год</p>
            <div className={styles.cardDate}>
              <InputMask
                className={styles.InputMask}
                mask="99/99"
                maskChar={null}
                placeholder="Срок действия"
                value={expiryDate}
                onChange={handleExpiryDateChange}
              ></InputMask>
            </div>
            {isExpiryDateError && (
              <div className="text-sm text-red-600">
                Введите действительный срок действия
              </div>
            )}
          </div>
        </div>
      </div>

      <ErrorAlert
        openAlert={isErrorAlertOpen}
        setOpenAlert={setErrorAlertOpen}
        errorMesage={errorAlertProps.text}
        action={errorAlertProps.action}
      />

      <button className={styles.addBtn} onClick={handleCheckCardValid}>
        Привязать
      </button>
    </div>
  );
};

export default AddingCard;
