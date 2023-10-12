import { CircularProgress, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { deleteCard, getCards, setMainCard } from "@/services/getCards";
import { useEffect, useState } from "react";

import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert";
import FullScreenSpinner from "@/components/atoms/FullScreenSpinner";
import cardicon from "@/assets/images/card.jpg";
import { checkCardType } from "@/helpers/checkCardType";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formatCardNumber } from "@/helpers/formatCardNumber";

const MyCardsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userData = useSelector((state) => state.userData?.data);
  const orderData = useSelector((state) => state.orderDetails?.data);
  const [data, setData] = useState(null);
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertProps, setErrorAlertProps] = useState({})
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false); // boolean or card guid that is being deleted. To open modal confirm delete 
  const [isDeleting, setIsDeleting] = useState(false); // boolean or card guid that is being deleted. To show circular progress
  const [mainCardId, setMainCardId] = useState("");

  const getMyCards = () => {
    if (!userData?.guid) return;

    getCards({
      data:{
        user: userData?.guid
      }
    })
      .then((res) => {
        if (res?.data?.data?.data?.response) {
          setData(res?.data?.data?.data?.response);
          setMainCardId(res?.data?.data?.data?.response.find((card) => card?.main_card)?.guid)
        } else {
          setErrorAlertOpen(true);
        }
      })
      .catch((err) => {
        setErrorAlertOpen(true);
        console.log("my-cards err", err); // log
      });
  };

  const deleteMyCard = (guid) => {
    setIsDeleting(guid)
    deleteCard({
      data:{
        guid: guid,
      }
    })
      .then((res) => {
        getMyCards();
      })
      .catch((err) => {
        setErrorAlertOpen(true);
        console.log("delete-cards err", err); // log
      })
      .finally(() => {
        setIsDeleting(false)
      })
  };

  const changeMainCard = (card) => {
    setMainCardId(card?.guid)
    setMainCard({
      data: {
          guid: card?.guid,
          main_card: true,
          user_id: userData?.guid,
      }
    })
      .then(res => {
        if (res?.status != "OK") {
          setErrorAlertOpen(true)
          getMyCards()
        }
      })
      .catch(err => {
        console.log(err) // log
        setErrorAlertOpen(true)
        getMyCards()
      })
  }

  useEffect(() => {
    if (!userData?.guid){
      setErrorAlertOpen(true)
      setErrorAlertProps({
        title: t('attention'),
        errorMessage: t('try_restart')
      })
    }
    getMyCards();
  }, []);

  if (!data) {
    return (
      <>
        <ErrorAlert
          openAlert={isErrorAlertOpen}
          setOpenAlert={setErrorAlertOpen}
          title={errorAlertProps.title}
          errorMesage={errorAlertProps.errorMessage}
        />
        <FullScreenSpinner />
      </>
    );
  }

  // function used to display delete button if user do not have order (considered the case when user id vip)
  const isDeleteDisplayed = (card) => {
    let arr = orderData?.orders
    for (let i=0; i<arr?.length; i++) {
      if (card?.guid == arr[i]?.card_guid) {
        return false
      }
    }
    return true
  }

  return (
    <div className={styles.myCards}>
        <ErrorAlert
          openAlert={isErrorAlertOpen}
          setOpenAlert={setErrorAlertOpen}
          title={errorAlertProps.title}
          errorMesage={errorAlertProps.errorMessage}
        />
      {data?.length ? (
        <>
          <div className={styles.text}>
            <p>{t("this_is_cards")}</p>
          </div>
          {data?.map(card => {
            const { icon } = checkCardType(card?.credit_card);
            return (
              <div 
                className={`${styles.paymentMethod} ${card?.guid == mainCardId ? styles.mainCard : ''}`} 
                key={card?.guid}
                onClick={() => changeMainCard(card)}
              >
                <div className={styles.editCard}>
                  <img
                    className={`bg-white h-[32px] w-[32px] p-1 border border-[#ECECEC] rounded-lg`}
                    src={icon || cardicon}
                    alt="icon"
                  ></img>
                  <div>{formatCardNumber(card?.credit_card)}</div>
                </div>

                { isDeleting == card?.guid ? (
                    <CircularProgress size={20} />
                  ) : isDeleteDisplayed(card) && orderData?.userID == userData?.guid
                    && (
                    <button
                      className={styles.editBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirmOpen(card?.guid);
                      }}
                    >
                      {t("delete")}
                    </button>
                )}
              </div>
            )}
          )}
          <Dialog
            open={!!isDeleteConfirmOpen}
            onClose={() => setDeleteConfirmOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="!rounded-2xl"
            borderRadius="2xl"
            maxWidth="xs"
            fullWidth={false}
            PaperProps={{
              sx: {
                borderRadius: "12px",
              },
            }}
          >
            <DialogTitle
              id="alert-dialog-title"
              className="text-center !font-semibold !text-[17px] tracking-tight !pb-1"
            >
              {t("confirm_delete")}
            </DialogTitle>
            <DialogActions>
              <div className="w-full flex items-center justify-between px-4 pb-2">
                <button
                  className=" h-10 w-36 font-semibold text-[#12ADC1] rounded-lg text-sm"
                  onClick={() => {
                    setDeleteConfirmOpen(false);
                  }}
                >
                  {t("cancel")}
                </button>
                <button
                  className="bg-[#12ADC1] h-10 w-36 font-semibold text-white rounded-lg text-sm"
                  onClick={() => {
                    deleteMyCard(isDeleteConfirmOpen);
                    setDeleteConfirmOpen(false);
                  }}
                >
                  {t("delete")}
                </button>
              </div>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          {" "}
          <div className={styles.headerText}>
            <p>{t("this_is_cards")}</p>
          </div>
          <div className={styles.myCardsBody}>
            <h1>{t("no_cards")}</h1>
            <p>{t("add_card_and_order")}</p>
          </div>
        </>
      )}

      <div className={styles.addBtn} onClick={() => navigate("/uz/add-card")}>
        + {t("add_card")}
      </div>
    </div>
  );
};

export default MyCardsPage;
