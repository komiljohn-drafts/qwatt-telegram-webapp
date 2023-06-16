import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert";
import SuccessAlert from "@/components/UI/SuccessAlert/SuccessAlert";
import { SwipeableDrawer } from "@mui/material";
import { getCards } from "@/services/getCards";
import { getPrice } from "@/services/getPrice";
import { orderDetailsActions } from "@/store/Order/orderDetails";
import { setOrder } from "@/services/setOrder";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const PaymentInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.orders);
  const [myCards, setMyCards] = useState([]);
  const userData = useSelector((state) => state.userData?.data);
  const [selectedCardId, setSelectedCardId] = useState(
    myCards?.at(-1)?.guid || ""
  );
  const [isCardSelectOpen, setCardSelectOpen] = useState(false);
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertProps, setErrorAlertProps] = useState({});
  const [isSuccessAlertOpen, setSuccessAlertOpen] = useState(false);
  const [successAlertProps, setSuccessAlertProps] = useState({});
  const [data, setData] = useState([]);

  const selectorRes = useMemo(() => {
    if (
      selector &&
      selector?.orderIds &&
      selector?.orderIds?.response &&
      selector?.orderIds?.response?.length > 0
    ) {
      return selector?.orderIds?.response[0];
    }
  }, [selector]);

  const handleCreateOrder = () => {
    setOrder({
      data: {
        user_id: userData?.guid,
        cabine_lists_id: selectorRes?.guid,
        merchant_list_id: selectorRes?.merchant_list_id,
        credit_card_list_id: selectedCardId,
      },
    })
      .then((res) => {
        if (res.status === "CREATED") {
          console.log("order create success", res?.data?.data?.data);
          setSuccessAlertOpen(true);
          setSuccessAlertProps({
            action: () => {
              setSuccessAlertOpen(false);
              dispatch(
                orderDetailsActions?.setOrderDetails({
                  ...res?.data?.data?.data,
                })
              );
              navigate("/", {
                place:
                  selectorRes?.merchant_list_id_data?.venune_name_in_english,
              });
            },
          });
        }
      })
      .catch((err) => {
        setErrorAlertOpen(true);
        setErrorAlertProps({
          text: err?.data?.data,
          action: () => setErrorAlertOpen(false),
        });
        console.log("order create error", err?.data?.data);
      });
  };

  const getOrderPrice = () => {
    if (!selectorRes?.merchant_list_id_data?.merchant_pricing_id) return;

    getPrice({
      data: {
        with_relations: false,
        merchant_pricing_id:
          selectorRes?.merchant_list_id_data?.merchant_pricing_id,
        pricing_languages: "russian",
      },
    }).then((res) => {
      setData(res?.data?.data?.response);
    });
  };

  const getMyCards = () => {
    getCards({
      data: {
        with_relations: false,
        user_id: userData?.guid,
      },
    }).then((res) => {
      setMyCards(res?.data?.data?.response);
      if (selectedCardId === "") {
        setSelectedCardId(res?.data?.data?.response?.at(-1)?.guid || "");
      }
    });
  };

  useEffect(() => {
    getOrderPrice();
    getMyCards();
  }, []);

  return (
    <div className={styles.PaymentWrap}>
      <div className={styles.stationHeader}>Информация о станции</div>
      <div className={styles.stationBox}>
        {" "}
        <div className={styles.stationAddress}>
          <h1>{selectorRes?.merchant_list_id_data?.venune_name_in_english}</h1>
          <p>{selectorRes?.merchant_list_id_data?.detail_address_in_english}</p>
        </div>
        <div className={styles.stationInfo}>
          <div className={styles.stationDetail}>
            <p>Кабинет ID</p>
            <div className={styles.tarifLine}></div>
            <span>{selectorRes?.station_id}</span>
          </div>
          <div className={styles.stationDetail}>
            {" "}
            <p>Статус</p>
            <div className={styles.tarifLine}></div>
            <span>{selectorRes?.status ? "Онлайн" : "оффлайн"}</span>
          </div>
        </div>
      </div>
      <div className={styles.stationHeader}>Информация об оплате</div>
      <div className={styles.paymentPlan}>
        {data?.map((item) => (
          <div className={styles.paymentBox} key={item?.guid}>
            <p>{item?.title}</p>
            <div className={styles.tarifLine}></div>
            <span>{item?.pricing}</span>
          </div>
        ))}
      </div>
      <div className={styles.stationHeader}>Способ оплаты</div>

      <div className="flex flex-col gap-4">
        <div className={styles.paymentMethod}>
          <div className={styles.editCard}>
            <img
              className={styles.images}
              src="images/Frame.svg"
              alt="icon"
            ></img>
            <div>
              **** ****{" "}
              {selectedCardId
                ? myCards
                    .filter((card) => card?.guid == selectedCardId)?.[0]
                    ?.credit_card?.slice(-8)
                : myCards?.at(-1)?.credit_card?.slice(8)}
            </div>
          </div>
          <button
            className={styles.editBtn}
            onClick={() => setCardSelectOpen(true)}
          >
            Изменить
          </button>
          <SwipeableDrawer
            anchor="bottom"
            classes={"!border-t-2 !border-white !rounded-t-2xl"}
            className=""
            open={isCardSelectOpen}
            onClose={() => setCardSelectOpen(false)}
            PaperProps={{
              sx: {
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              },
            }}
          >
            <div className="flex flex-col gap-4 p-6 pt-4">
              <div
                className="rounded-2xl h-1 w-10 self-center"
                style={{ background: "rgba(133, 127, 127, 0.15)" }}
              />
              <h2 className="text-center text-lg font-semibold mb-2">
                Выбрать способ оплаты
              </h2>
              {myCards?.map((card) => (
                <div
                  onClick={() => setSelectedCardId(card?.guid)}
                  key={card?.card_token}
                  className={`flex flex-row justify-between border cursor-pointer ${
                    card?.guid == selectedCardId
                      ? "border-[#12ADC1]"
                      : "border-[#F1F1F1]"
                  }  py-3 px-4 rounded-2xl items-center`}
                >
                  <div className={"flex flex-row gap-6"}>
                    <img
                      className={"w-4 h-4"}
                      src="images/Frame.svg"
                      alt="icon"
                    ></img>
                    <div>**** **** {card?.credit_card?.slice(-8)}</div>
                  </div>
                  <button
                    className={`${
                      card?.guid == selectedCardId ? "block" : "hidden"
                    }`}
                  >
                    <CheckCircleIcon sx={{ color: "#12ADC1" }} />
                  </button>
                </div>
              ))}
              <button
                style={{ background: "rgba(104, 107, 112, 0.05)" }}
                className="p-3 rounded-2xl text-[#686B70] font-medium"
                onClick={() => {
                  navigate("/add-card", { from: "payment" });
                }}
              >
                + Добавить карту
              </button>
              <button
                style={{ background: "rgba(133, 127, 127, 0.15)" }}
                onClick={() => {
                  handleCreateOrder();
                  setCardSelectOpen(false);
                }}
                className="p-3 rounded-2xl text-[#686B70] font-medium"
              >
                Продолжить
              </button>
            </div>
          </SwipeableDrawer>
        </div>
      </div>

      <SuccessAlert
        openAlert={isSuccessAlertOpen}
        setOpenAlert={setSuccessAlertOpen}
        action={successAlertProps?.action}
      />

      <div className={styles.question}>
        Что будет если не вернуть повербанк?
      </div>

      <ErrorAlert
        title={errorAlertProps?.title}
        errorMesage={errorAlertProps?.text}
        action={errorAlertProps?.action}
        openAlert={isErrorAlertOpen}
        setOpenAlert={setErrorAlertOpen}
      />

      <button
        className={styles.rentBtn}
        onClick={() => {
          if (selectorRes?.status == false) {
            return;
          } else {
            handleCreateOrder();
          }
        }}
      >
        Арендовать сейчас
      </button>
    </div>
  );
};

export default PaymentInfo;
