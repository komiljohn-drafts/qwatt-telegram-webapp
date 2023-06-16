import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert";
import ReactCodeInput from "react-verification-code-input";
import { orderActions } from "@/store/Order/order";
import { setStation } from "@/services/setOrder";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const OrderCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [isOrderNumError, setIsOrderNumError] = useState(false);
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertProps, setErrorAlertProps] = useState({});

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
          text: "Автомат находится в неисправном состоянии и не может выдавать аренду (offline)",
          action: () => setErrorAlertOpen(false),
        });
      } else if (
        res?.data?.data?.response[0]?.status == false &&
        res?.data?.data?.response[0]?.merchant_list_id == ""
      ) {
        setErrorAlertOpen(true);
        setErrorAlertProps({
          text: "Автомат находится в неисправном состоянии и не может выдавать аренду (disabled)",
          action: () => setErrorAlertOpen(false),
        });
      } else if (res?.data?.data?.response[0]?.status == true) {
        dispatch(orderActions.setOrderId(res.data?.data ?? {}));
        res.data.data.count > 0 && navigate("/payment");
      }
    });
  };

  const handleOrderCode = (value) => {
    setErrorMsg(null);
    setIsOrderNumError(false);
    setOrderNumber(value);
  };

  return (
    <div className={styles.addingCardWrap}>
      <p className="text-center text-[#686B70] font-medium mb-8">
        Введи 6-значный код который написан на станции.
      </p>
      <div className={styles.otpWrap}>
        <ReactCodeInput
          style={{
            width: "48px",
            height: "48px",
          }}
          value={orderNumber}
          onChange={handleOrderCode}
        ></ReactCodeInput>
        {errorMsg?.count == 0 && (
          <p className={styles.errorMessage}>Неверный код</p>
        )}
        {isOrderNumError == true && (
          <p className={styles.errorMessage}>
            Введите действительный код станции
          </p>
        )}
      </div>

      <ErrorAlert
        action={errorAlertProps.action}
        openAlert={isErrorAlertOpen}
        setOpenAlert={setErrorAlertOpen}
        errorMesage={errorAlertProps.text}
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
          Привязать
        </button>
      </div>
    </div>
  );
};

export default OrderCreate;
