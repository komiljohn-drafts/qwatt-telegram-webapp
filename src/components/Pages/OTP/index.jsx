import { setCard, setCardOtp, setCardToken, setConfirmCardToken } from "@/services/getCards";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert";
import ReactCodeInput from "react-verification-code-input";
import { cardVerifyActions } from "@/store/slices/cardVerify";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cardDetailsActions } from "@/store/CardDetails/cardDetails";

const OTPcode = () => {
  const params = new URLSearchParams(document.location.search);
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [isOtpError, setIsOtpError] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
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
      .then((res) => { // setCardOtp
        dispatch(cardVerifyActions.setCardVerify(true));

        if (res?.data?.data?.data?.error_code) {
          setOtp("");

          setErrorAlertOpen(true);

          setErrorAlertProps({
            text: res?.data?.data?.data?.error_note,
            action: () => {
              setErrorAlertOpen(false);
            },
          });
          return;
        } // end if

        setCard({ 
          data: {
              credit_card: res?.data?.data?.data?.response?.[0]?.card_number,
              card_token: res?.data?.data?.data?.response?.[0]?.card_token,
              main_card: true,
              user_id: userData?.guid,
              credit_card_status: true
          }
        })
          .then(()=>{ // setCard
            if (params.get("from") == "order") {
              navigate("/uz/order", { replace: true });
            } else if (params.get("from") == "payment") {
              navigate("/uz/payment", { replace: true });
            } else {
              navigate("/uz/my-cards", { replace: true });
            }
          })
          .catch((err) => { // setCard
            setErrorAlertOpen(true);
            setErrorAlertProps({
              text: err?.data?.data,
              action: () => {
                if (params.get("from") == "order") {
                  navigate("/uz/order", { replace: true });
                } else if (params.get("from") == "payment") {
                  navigate("/uz/payment", { replace: true });
                } else {
                  navigate("/uz/my-cards", { replace: true });
                }
              },
            });
            setOtp("");
          })
      })
      .catch((err) => { // setCardOtp
        setErrorAlertOpen(true);
        dispatch(cardVerifyActions.setCardVerify(false));
        setOtp("");
      });
  };

  const sendAgain = () => {
    setCardToken({
      data: {
        card: cardDetails?.card_number,
        expired_date: cardDetails?.expire_date,
      },
    })
      .then((res) => {
        if (res?.data?.data?.status == "done") {
          dispatch(
            cardDetailsActions.setCardDetails({
              ...res.data?.data?.data?.response?.[0],
              card_number: cardDetails?.card_number,
              expire_date: cardDetails?.expire_date,
            })
          );
          dispatch(cardVerifyActions.setCardVerify(false));
          setSeconds(30)
          setMinutes(1)
        } else {
          setErrorAlertOpen(true);
          setErrorAlertProps({
            text: res?.data?.data?.data?.error_note,
            action: () => {
              setErrorAlertOpen(false);
            },
          });
        }
        navigate("/uz/otp");
      })
      .catch(() => {
        setErrorAlertOpen(true);
      });
  }

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

  useEffect(() => {
    setMinutes(1)
    setSeconds(30)
    dispatch(cardVerifyActions.setCardVerify(false))
  },[])

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
              // onClick={() => {
              //   setConfirmCardToken({
              //     service_id: Number(clickCredentials?.service_id),
              //     card_number: cardDetails?.card_number,
              //     expire_date: cardDetails?.expire_date,
              //     temporary: 0,
              //   })
              //     .then(() => {
              //       setOtp("");
              //       dispatch(cardVerifyActions.setCardVerify(false));
              //       setSeconds(30);
              //       setMinutes(1);
              //       setClickErrorNote("");
              //       setOtp("");
              //     })
              //     .catch((err) => {
              //       console.log("click err", err);
              //     });
              // }}
              onClick={sendAgain}
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
