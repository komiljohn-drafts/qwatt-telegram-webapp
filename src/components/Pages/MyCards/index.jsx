import { deleteCard, getCards } from "@/services/getCards";
import { useEffect, useState } from "react";

import styles from "./style.module.scss";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import uzcardicon from "@/assets/images/Frame.svg";

const MyCardsPage = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData?.data);
  const [data, setData] = useState(null);

  const getMyCards = () => {
    if (!userData?.guid) return;

    getCards({
      data: {
        with_relations: false,
        user_id: userData?.guid,
      },
    })
      .then((res) => {
        setData(res?.data?.data?.response);
      })
      .catch((err) => {
        console.log("my-cards err", err);
      });
  };

  const deleteMyCard = (guid) => {
    deleteCard(guid, { data: {} })
      .then((res) => {
        console.log("delete-cards res", res);
        getMyCards();
      })
      .catch((err) => {
        console.log("delete-cards err", err);
      });
  };

  useEffect(() => {
    getMyCards();
  }, []);

  return (
    <div className={styles.myCards}>
      {data?.length ? (
        <>
          <div className={styles.text}>
            <p>Тут хранятся ваши карты</p>
          </div>
          {data.map((card) => (
            <div className={styles.paymentMethod} key={card.guid}>
              <div className={styles.editCard}>
                <img
                  className={styles.images}
                  src={uzcardicon}
                  alt="icon"
                ></img>
                <div>
                  {`**** **** ${card.credit_card?.toString().slice(-8)}`}
                </div>
              </div>
              <button
                className={styles.editBtn}
                onClick={() => {
                  deleteMyCard(card?.guid, { data: {} });
                }}
              >
                {t("delete")}
              </button>
            </div>
          ))}
        </>
      ) : (
        <>
          {" "}
          <div className={styles.headerText}>
            <p>Тут хранятся ваши карты</p>
          </div>
          <div className={styles.myCardsBody}>
            <h1>Нет добавленных карт</h1>
            <p>Добавляйте свои карты и арендуйте повербанки</p>
          </div>
        </>
      )}

      <div className={styles.addBtn} onClick={() => navigate("/add-card")}>
        + Добавить карту
      </div>
    </div>
  );
};

export default MyCardsPage;
