import { Box, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import FullScreenSpinner from "@/components/atoms/FullScreenSpinner";
import {
  deleteProfile,
  deleteUser,
  getBonus,
  getProfile,
  sendMsgDeleted,
} from "@/services/getProfile";
import styles from "./style.module.scss";
import { LightingIcon } from "@/screen-capture/icons";
import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert";
import { userDataActions } from "@/store/slices/userData";
import { formatPhoneNumber } from "@/helpers/formatPhoneNumber";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "300px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: "16px",
};

const errorsOnCheck = {
  delete: {
    order: "cannotDeleteAccountWithActiveOrders",
    debt: "youHaveDebt",
  },
  logOut: {
    order: "you_have_active_lease",
    debt: "youHaveDebt",
  },
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData?.data);
  const userDebt = useSelector((state) => state.userData?.debt);
  const orderData = useSelector((state) => state.orderDetails?.data);
  const [open, setOpen] = useState(false);
  const [bonus, setBonus] = useState("");
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertProps, setErrorAlertProps] = useState({});
  const [fetchedData, setFetchedData] = useState({});

  const checkBefore = (operation) => {
    if (orderData?.userID == userData?.guid && orderData?.orders?.length) {
      setErrorAlertOpen(true);
      setErrorAlertProps({
        title: t("attention"),
        errorMessage: t(errorsOnCheck[operation].order),
      });
    } else if (userDebt) {
      setErrorAlertOpen(true);
      setErrorAlertProps({
        title: t("attention"),
        errorMessage: t(errorsOnCheck[operation].debt),
      });
    } else {
      setOpen(operation);
    }
  };

  const handleClose = () => setOpen("");

  const handleLogOut = () => {
    sendMsgDeleted({
      user_id: userData?.telegram_id,
      is_logout: true,
    }).finally(() => window.Telegram?.WebApp?.close());
  };

  const handleUserDelete = () => {
    deleteUser({
      data: {
        guid: userData?.guid,
        is_deleted: true,
      },
    })
      .then((res) => {
        sendMsgDeleted({
          user_id: userData?.telegram_id,
          is_logout: false,
        }).finally(() => window.Telegram?.WebApp?.close());
      })
      .catch((err) => {
        setErrorAlertOpen(true);
      });
  };

  const modalVersions = {
    delete: {
      title: "delete_account",
      description: "delete_account_confirmation",
      action: handleUserDelete,
      btnText: "delete",
    },
    logOut: {
      title: "logout",
      description: "delete_account_confirmation",
      action: handleLogOut,
      btnText: "yes",
    },
  };

  useEffect(() => {
    if (!userData?.guid) {
      setErrorAlertOpen(true);
      setErrorAlertProps({
        title: t("attention"),
        errorMessage: t("try_restart"),
      });
    }

    getProfile(userData?.guid)
      .then((res) => {
        dispatch(userDataActions.setUserData(res?.data?.data?.response));
        setBonus(res?.data?.data?.response?.bonus);
        setFetchedData(res?.data?.data?.response);
      })
      .catch((err) => {
        setErrorAlertOpen(true);
      });
  }, []);

  useEffect(() => {
    getBonus({
      data: {
        offset: 1,
        limit: 10,
        user_id: [userData?.guid],
      },
    })
    .then((res) => {
      if(res?.status === "OK"){
        if(res?.data?.data?.response?.length > 0){
          setBonus(res?.data?.data?.response?.[0]?.balance)
        } else {
          setBonus(0)
        }
      } else {
        setErrorAlertOpen(true)
      }
    })
      .catch((err) => {
        setErrorAlertOpen(true);
      });
  }, [userData]);

  if (Object.entries(fetchedData).length == 0) {
    return (
      <>
        <FullScreenSpinner />
        <ErrorAlert
          openAlert={isErrorAlertOpen}
          setOpenAlert={setErrorAlertOpen}
          title={errorAlertProps.title}
          errorMesage={errorAlertProps.errorMessage}
        />
      </>
    );
  }

  console.log("fetchedData", fetchedData); // log

  return (
    <div className={styles.profileBox}>
      <div className={styles.profileData}>
        <p className={styles.profileHeader}>
          {fetchedData?.name || t("personal_details")}
        </p>
        <p className={styles.profileText}>
          {formatPhoneNumber(fetchedData?.phone) || ""}
        </p>
        <div className={styles.bonus}>
          <LightingIcon />
          <p>{bonus !== "" ? bonus + " " + t("score") : ""}</p>
        </div>
        <div className={styles.editButton} onClick={() => navigate("add-data")}>
          {t("change")}
        </div>
      </div>
      <div className={styles.profileBtn}>
        <div className={styles.logout} onClick={() => checkBefore("logOut")}>
          {t("logout")}
        </div>
        <div
          onClick={() => checkBefore("delete")}
          className={styles.deleteAccount}
        >
          {t("delete_account")}
        </div>
      </div>
      <Modal
        open={!!open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className={styles.modalHeader}>
            {" "}
            {t(modalVersions[open]?.title)} ?
          </p>
          <p className={styles.modalSubtext}>
            {t(modalVersions[open]?.description)}
          </p>
          <div className={styles.modalBtns}>
            <button className={styles.cancelBtn} onClick={handleClose}>
              {t("cancel")}
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => {
                modalVersions[open]?.action();
                handleClose();
              }}
            >
              {t(modalVersions[open]?.btnText)}
            </button>
          </div>
        </Box>
      </Modal>

      <ErrorAlert
        openAlert={isErrorAlertOpen}
        setOpenAlert={setErrorAlertOpen}
        title={errorAlertProps.title}
        errorMesage={errorAlertProps.errorMessage}
      />
    </div>
  );
};

export default ProfilePage;
