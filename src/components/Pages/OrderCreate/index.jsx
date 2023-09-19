import { useEffect, useRef, useState } from "react";

import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert";
import ReactCodeInput from "react-verification-code-input";
import { orderActions } from "@/store/Order/order";
import { setStation } from "@/services/setOrder";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OrderCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [orderNumber, setOrderNumber] = useState();
  const [isOrderNumError, setIsOrderNumError] = useState(false);
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertProps, setErrorAlertProps] = useState({});
  const [isClearInput, setIsClearInput] = useState(false);
  const inputRef = useRef();

  const handleSetStation = () => {
    setStation({
      data: {
        with_relations: false,
        station_id: orderNumber,
      },
    }).then((res) => {
      if (
        res?.data?.data?.response[0]?.status == false &&
        res?.data?.data?.response[0]?.merchant_list_id != ""
      ) {
        setErrorAlertOpen(true);
        setErrorAlertProps({
          text: t("station_is_offline"),
          action: () => setErrorAlertOpen(false),
        });
      } else if (res?.data?.data?.count == 0) {
        setErrorAlertOpen(true);
        setErrorAlertProps({
          text: t("station_is_not_found"),
          action: () => setErrorAlertOpen(false),
        });
      } else if (
        res?.data?.data?.response[0]?.status == false &&
        res?.data?.data?.response[0]?.merchant_list_id == ""
      ) {
        setErrorAlertOpen(true);
        setErrorAlertProps({
          text: t("station_is_disabled"),
          action: () => setErrorAlertOpen(false),
        });
      } else if (res?.data?.data?.response[0]?.status == true) {
        dispatch(orderActions.setOrderId(res.data?.data ?? {}));
        res?.data?.data?.count > 0 && navigate("/payment");
      }
    });
  };

  const handleOrderCode = (value) => {
    setIsOrderNumError(false);
    setOrderNumber(value);
  };

  useEffect(() => {
    if (inputRef?.current && isClearInput) {
      setOrderNumber("");
      inputRef.current.__clearvalues__();
      setIsClearInput(false);
    }
  }, [isClearInput]);

  useEffect(() => {
    if (orderNumber?.length == 6) {
      handleSetStation();
    }
  }, [orderNumber]);

  return (
    <div className={styles.addingCardWrap}>
      <p className={`text-center text-[#686B70] font-medium mb-8 ${styles.enterCode}`}>
        {t("enter_station_code")}
      </p>
      <div
        className={`${
          isOrderNumError || isErrorAlertOpen
            ? styles.otpErrWrap
            : styles.otpWrap
        }`}
      >
        <ReactCodeInput
          ref={inputRef}
          value={orderNumber}
          onChange={handleOrderCode}
        ></ReactCodeInput>
      </div>{" "}
      {isOrderNumError == true && (
        <p className="text-red-600 text-center">{t("incorrect_otp_leng")}</p>
      )}
      <ErrorAlert
        action={errorAlertProps.action}
        openAlert={isErrorAlertOpen}
        setOpenAlert={setErrorAlertOpen}
        errorMesage={errorAlertProps.text}
        dependency={() => {
          setIsClearInput(true);
        }}
      />
      <div className={styles.addBtn}>
        <button
          className={styles.Btn}
          onClick={() => {
            if (orderNumber?.length == 6) {
              handleSetStation();
            } else {
              setIsOrderNumError(true);
            }
          }}
        >
          {t("confirm")}
        </button>
      </div>
    </div>
  );
};

export default OrderCreate;
