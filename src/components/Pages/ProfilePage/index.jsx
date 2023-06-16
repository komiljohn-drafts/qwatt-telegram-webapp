import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";

import { LightIcon } from "@/screen-capture/icons";
import { deleteProfile } from "@/services/getProfile";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "280px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: "16px",
};

const ProfilePage = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userData = useSelector((state) => state.userData?.data);

  const handleUserDelete = () => {
    deleteProfile({
      data: {
        phone_after_deletion: userData?.phone || "",
        email: "",
        email_after_deletion: "",
        guid: userData?.guid || "",
        is_deleted: true,
        phone: "",
      },
    })
      .then((res) => {
        console.log("profile delete res", res);
        window.Telegram?.WebApp?.close();
      })
      .catch((err) => {
        console.log("profile delete err", err);
      });
  };

  useEffect(() => {
    handleUserDelete();
  }, []);

  return (
    <div className={styles.profileBox}>
      <div className={styles.profileData}>
        <p className={styles.profileHeader}>Личные данные</p>
        <p className={styles.profileText}>{userData?.phone || ""}</p>
        <div className={styles.balls}>
          <LightIcon />
          <p>0 баллов</p>
        </div>
        <div className={styles.editButton} onClick={() => navigate("add-data")}>
          Редактировать
        </div>
        <p className={styles.getBall}>Заполните профиль и получите 20 баллов</p>
      </div>
      <div className={styles.profileBtn}>
        <div
          className={styles.logout}
          onClick={() => {
            window.Telegram?.WebApp?.close();
          }}
        >
          Выйти из аккаунта
        </div>
        <div onClick={handleOpen} className={styles.deleteAccount}>
          Удалить аккаунт
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className={styles.modalHeader}>Удалить аккаунт?</p>
          <p className={styles.modalSubtext}>
            Все ваши данные аренд и начисленные балы будут удалены безвозвратно.
          </p>
          <div className={styles.modalBtns}>
            <button
              className={styles.cancelBtn}
              onClick={() => {
                setOpen(false);
              }}
            >
              Отменить
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => {
                handleUserDelete();
                setOpen(false);
              }}
            >
              Удалить
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfilePage;
