import { setCard, setCardOtp, setConfirmCardToken } from "@/services/getCards";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

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
  const [isClearInput, setIsClearInput] = useState(false);
  const inputRef = useRef();

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

        if (res?.data?.data?.data?.error_code) {
          console.log("error code", res?.data?.data?.data?.error_code);
          setOtp("");

          setErrorAlertOpen(true);

          setErrorAlertProps({
            text: res?.data?.data?.data?.error_note,
            action: () => {
              setErrorAlertOpen(false);
            },
          });
          console.log("otp", otp);
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
            setOtp("");
          });
      })
      .catch((err) => {
        console.log("click verify err", err);
        dispatch(cardVerifyActions.setCardVerify(false));
        setOtp("");
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

  useEffect(() => {
    if (inputRef?.current && isClearInput) {
      setOtp("");
      inputRef.current.__clearvalues__();
      setIsClearInput(false);
    }
  }, [isClearInput]);

  useEffect(() => {
    if (otp.length == 5 && !isOtpError) {
      handleSendOtp();
    }
  }, [otp]);

  return (
    <div className={styles.addingCardWrap}>
      <div className={styles.cardHeaderText}>
        {t("we_send_code")} {""}
        {cardDetails?.phone_number}
      </div>
      <div
        className={
          isOtpError || isErrorAlertOpen ? styles.topErrWrap : styles.otpWrap
        }
      >
        <ReactCodeInput
          ref={inputRef}
          fields={5}
          value={isErrorAlertOpen ? "" : otp}
          onChange={(val) => {
            setIsOtpError(false);
            setOtp(val);
          }}
          style={{ width: "48px", height: "48px" }}
        ></ReactCodeInput>

        {isOtpError && (
          <p className="text-sm text-red-600 text-center">
            {t("incorrect_otp_leng")}
          </p>
        )}
        {clickErrorNote && (
          <p className="text-sm text-red-600 text-center">{clickErrorNote}</p>
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
              {t("send_again")}
            </p>
          )}
        </div>

        <ErrorAlert
          errorMesage={errorAlertProps.text}
          openAlert={isErrorAlertOpen}
          setOpenAlert={setErrorAlertOpen}
          action={errorAlertProps.action}
          dependency={() => {
            setIsClearInput(true);
          }}
        />

        <button
          className={styles.Btn}
          onClick={() => {
            handleSendOtp(otp);
          }}
        >
          {t("confirm")}
        </button>
      </div>
    </div>
  );
};

export default OTPcode;
