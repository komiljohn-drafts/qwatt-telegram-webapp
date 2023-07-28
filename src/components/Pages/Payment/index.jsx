import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert";
import FullScreenSpinner from "@/components/atoms/FullScreenSpinner";
import { SwipeableDrawer } from "@mui/material";
import cardicon from "@/assets/images/card.jpg";
import { checkCardType } from "@/helpers/checkCardType";
import { getCards } from "@/services/getCards";
import { getPrice } from "@/services/getPrice";
import { orderErrorNoteActions } from "@/store/Order/orderErrorNote";
import { setOrder } from "@/services/setOrder";
import { slotActions } from "@/store/Order/Slot";
import styles from "./style.module.scss";
import { useCheckUserBlocked } from "@/hooks/useCheckUserBlocked";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatCardNumber } from "@/helpers/formatCardNumber";

const PaymentInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserBlocked = useCheckUserBlocked();
  const { t } = useTranslation();
  const selector = useSelector((state) => state.orders);
  const [myCards, setMyCards] = useState(null);
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertProps, setErrorAlertProps] = useState({});
  const userData = useSelector((state) => state.userData?.data);
  const [selectedCardId, setSelectedCardId] = useState(
    Array.isArray(myCards) && myCards.length > 0 ? myCards?.[myCards.length-1]?.guid || "" : ""
  );
  const [isCardSelectOpen, setCardSelectOpen] = useState(false);
  const [selectedCardIcon, setSelectedCardIcon] = useState(cardicon);
  const [data, setData] = useState(null);

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
    if (isUserBlocked == true) {
      console.log("blocked");
      setErrorAlertOpen(true);
      setErrorAlertProps({
        text: t("account_is_blocked"),
        action: () => setErrorAlertOpen(false),
      });
      return;
    }

    navigate("/rent", { replace: true });

    setOrder({
      data: {
        userId: userData?.guid,
        cabine_lists_id: selectorRes?.guid,
        merchant_list_id: selectorRes?.merchant_list_id,
        credit_card_list_id: selectedCardId,
      },
    })
      .then((res) => {
        if (res?.data?.data?.data?.error_note) {
          dispatch(
            orderErrorNoteActions.setOrderErrorNote(
              res?.data?.data?.data?.error_note
            )
          );
          return;
        }
        dispatch(
          slotActions.setSlot(res?.data?.data?.data?.response?.[0]?.slot)
        );
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
    })
      .then((res) => {
        setData(res?.data?.data?.response);
      })
      .catch(() => {
        setErrorAlertOpen(true);
      });
  };

  const getMyCards = () => {
    getCards({
      data: {
        with_relations: false,
        user_id: userData?.guid,
      },
    })
      .then((res) => {
        const responseData = res?.data?.data?.response;
        if (Array.isArray(responseData) && responseData.length > 0) {
          setMyCards(responseData);
          if (selectedCardId === "") {
            setSelectedCardId(responseData?.[responseData?.length-1]?.guid || "");
          }
        } else {
          setErrorAlertOpen(true);
        }

      })
      .catch(() => {
        setErrorAlertOpen(true);
      });
  };

  useEffect(() => {
    getOrderPrice();
    getMyCards();
  }, []);

  useEffect(() => {
    if (selectedCardId === "") return;
    const selectedCard = selectedCardId
      ? myCards.filter((card) => card?.guid == selectedCardId)?.[0]?.credit_card
      : myCards?.[myCards?.length-1]?.credit_card;
    const { icon } = checkCardType(selectedCard);
    setSelectedCardIcon(icon);
  }, [selectedCardId]);

  if (!data || !myCards) {
    return (
      <>
        <ErrorAlert
          openAlert={isErrorAlertOpen}
          setOpenAlert={setErrorAlertOpen}
        />
        <FullScreenSpinner />
      </>
    );
  }

  return (
    <div className={styles.PaymentWrap}>
      <div className={styles.stationHeader}>{t("station_info")}</div>
      <div className={styles.stationBox}>
        {" "}
        <div className={styles.stationAddress}>
          <h1>{selectorRes?.merchant_list_id_data?.venune_name_in_english}</h1>
          <p>{selectorRes?.merchant_list_id_data?.detail_address_in_english}</p>
        </div>
        <div className={styles.stationInfo}>
          <div className={styles.stationDetail}>
            <p>{t("cabinet_id")}</p>
            <div className={styles.tarifLine}></div>
            <span>{selectorRes?.station_id}</span>
          </div>
          <div className={styles.stationDetail}>
            {" "}
            <p>{t("status")}</p>
            <div className={styles.tarifLine}></div>
            <span>{selectorRes?.status ? t("online") : t("offline")}</span>
          </div>
        </div>
      </div>
      <div className={styles.stationHeader}>{t("payment_info")}</div>
      <div className={styles.paymentPlan}>
        {data?.map((item) => (
          <div className={styles.paymentBox} key={item?.guid}>
            <p>{item?.title}</p>
            <div className={styles.tarifLine}></div>
            <span>{item?.pricing}</span>
          </div>
        ))}
      </div>
      <div className={styles.stationHeader}>{t("payment_method")}</div>

      <div className="flex flex-col gap-4">
        <div className={styles.paymentMethod}>
          <div className={styles.editCard}>
            <img
              className={`bg-white h-[32px] w-[32px] p-1 border border-[#ECECEC] rounded-lg`}
              src={selectedCardIcon}
              alt="icon"
            ></img>
            <div>
              {selectedCardId
                ? formatCardNumber(myCards.find((card) => card?.guid == selectedCardId)?.credit_card)
                : formatCardNumber(myCards?.[myCards?.length-1]?.credit_card)}
            </div>
          </div>
          <button
            className={styles.editBtn}
            onClick={() => setCardSelectOpen(true)}
          >
            {t("change")}
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
                {t("choose_payment_method")}
              </h2>
              {myCards?.map((card) => {
                const { icon } = checkCardType(card?.credit_card);
                return (
                  <div
                    onClick={() => setSelectedCardId(card?.guid)}
                    key={card?.card_token}
                    className={`flex flex-row justify-between bg-[#F9F9F9] border cursor-pointer ${
                      card?.guid == selectedCardId
                        ? "border-[#12ADC1]"
                        : "border-[#F1F1F1]"
                    }  py-2 px-2 rounded-2xl items-center`}
                  >
                    <div className={"flex flex-row gap-6 items-center"}>
                      <img
                        className={`bg-white h-[32px] w-[32px] p-1 border border-[#ECECEC] rounded-lg`}
                        src={icon || cardicon}
                        alt="icon"
                      ></img>
                      <div>{card?.credit_card}</div>
                    </div>
                    <button
                      className={`${
                        card?.guid == selectedCardId ? "block" : "hidden"
                      }`}
                    >
                      <CheckCircleIcon sx={{ color: "#12ADC1" }} />
                    </button>
                  </div>
                );
              })}
              <button
                style={{ background: "rgba(104, 107, 112, 0.05)" }}
                className="p-3 rounded-2xl text-[#686B70] font-medium"
                onClick={() => {
                  navigate("/add-card/?from=payment");
                }}
              >
                + {t("add_card")}
              </button>
              <button
                style={{ background: "rgba(133, 127, 127, 0.15)" }}
                onClick={() => {
                  setCardSelectOpen(false);
                }}
                className="p-3 rounded-2xl text-[#686B70] font-medium"
              >
                {t("continue")}
              </button>
            </div>
          </SwipeableDrawer>
        </div>
      </div>

      <div className={styles.question} onClick={() => navigate("/faq")}>
        {t("powerbank_lost")}
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
        {t("rent_now")}
      </button>
    </div>
  );
};

export default PaymentInfo;
