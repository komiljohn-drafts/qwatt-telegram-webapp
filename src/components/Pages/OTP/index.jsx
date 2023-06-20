import { setCard, setCardOtp, setConfirmCardToken } from "@/services/getCards";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert";
import ReactCodeInput from "react-verification-code-input";
import { cardVerifyActions } from "@/store/slices/cardVerify";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OTPcode = () => {
  const params = new URLSearchParams(document.location.search);
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [isOtpError, setIsOtpError] = useState(false);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const cardVerified = useSelector((state) => state.cardVerify?.verified);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData?.data);
  const clickCredentials = useSelector((state) => state.clickCredentials?.data);
  const cardDetails = useSelector((state) => state.cardDetails?.data);
  const [clickErrorNote, setClickErrorNote] = useState(false);
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertProps, setErrorAlertProps] = useState({});

  const handleSendOtp = () => {
    if (otp.length < 5) {
      setIsOtpError(true);
      return;
    }

    setCardOtp({
      data: {
        card_token: cardDetails?.card_token,
        sms_code: Number(otp),
      },
    })
      .then((res) => {
        dispatch(cardVerifyActions.setCardVerify(true));
        console.log("card sms res", res);

        if (res?.data?.data?.data?.error_code) {
          console.log("error code", res?.data?.data?.data?.error_code);
          setErrorAlertOpen(true);
          setErrorAlertProps({
            text: res?.data?.data?.data?.error_note,
            action: () => {
              setErrorAlertOpen(false);
            },
          });
          return;
        }

        setCard({
          data: {
            credit_card: res?.data?.data?.data?.response?.[0]?.card_number,
            card_token: res?.data?.data?.data?.response?.[0]?.card_token,
            user_id: userData?.guid,
          },
        })
          .then(() => {
            console.log("card list success");
            if (params.get("from") == "order") {
              navigate("/order", { replace: true });
            } else if (params.get("from") == "payment") {
              navigate("/payment", { replace: true });
            } else {
              console.log("redirect to my cards");
              navigate("/my-cards", { replace: true });
            }
          })
          .catch((err) => {
            console.log("card list err", err);
            setErrorAlertOpen(true);
            setErrorAlertProps({
              text: err?.data?.data,
              action: () => {
                setErrorAlertOpen(false);
              },
            });
          });
      })
      .catch((err) => {
        console.log("click verify err", err);
        dispatch(cardVerifyActions.setCardVerify(false));
      });
  };

  useEffect(() => {
    if (cardVerified == true) {
      return;
    }
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <div className={styles.addingCardWrap}>
      <div className={styles.cardHeaderText}>
        {t("weHaveSentConfirmationCodeToYourPhoneNumber")} {""}
        {userData?.phone}
      </div>
      <div className={isOtpError ? styles.topErrWrap : styles.otpWrap}>
        <ReactCodeInput
          fields={5}
          value={otp}
          onChange={(val) => {
            setOtp(val);
            setIsOtpError(false);
          }}
          style={{ width: "48px", height: "48px" }}
        ></ReactCodeInput>
        {isOtpError && (
          <p className="text-sm text-red-600">Введите действительный отп</p>
        )}
        {clickErrorNote && (
          <p className="text-sm text-red-600">{clickErrorNote}</p>
        )}
      </div>

      <div className={styles.addBtn}>
        <div className="countdown-text">
          {(seconds > 0 || minutes > 0) && !cardVerified ? (
            <p className={styles.second}>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p>
          ) : (
            <p
              onClick={() => {
                setConfirmCardToken({
                  service_id: Number(clickCredentials?.service_id),
                  card_number: cardDetails?.card_number,
                  expire_date: cardDetails?.expire_date,
                  temporary: 0,
                })
                  .then(() => {
                    setOtp("");
                    dispatch(cardVerifyActions.setCardVerify(false));
                    setSeconds(30);
                    setMinutes(1);
                    setClickErrorNote("");
                    setOtp("");
                  })
                  .catch((err) => {
                    console.log("click err", err);
                  });
              }}
              className="font-semibold cursor-pointer text-center mb-4 text-[#12ADC1]"
            >
              {t("sendAgain")}
            </p>
          )}
        </div>

        <ErrorAlert
          errorMesage={errorAlertProps.text}
          openAlert={isErrorAlertOpen}
          setOpenAlert={setErrorAlertOpen}
          action={errorAlertProps.action}
        />

        <button className={styles.Btn} onClick={handleSendOtp}>
          {t("bind")}
        </button>
      </div>
    </div>
  );
};

export default OTPcode;
