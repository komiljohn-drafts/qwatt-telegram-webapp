import { DollorIcon, DownIcon, TimeIcon, UpIcon } from "@/screen-capture/icons";
import React, { useState } from "react";
import { format, parseISO } from "date-fns";

import moment from "moment";
import styles from "./style.module.scss";

const HistoryCard = ({ order, orderStatusTime }) => {
  const [open, setOpen] = useState();
  const readMoreHandler = () => {
    setOpen(!open);
  };

  if (order?.end_time == "") {
    return null;
  }

  return (
    <div className={styles.usedHistory}>
      <div className={styles.historyInfo}>
        <div>
          <TimeIcon />
        </div>
        <div>{format(parseISO(order?.created_time), "dd MMMM yyyy")}</div>
      </div>
      <div className={styles.historyInfo}>
        <div>
          <DollorIcon />
        </div>
        <div>{`${order?.amounbefore || 0} сум`}</div>
      </div>

      {open && (
        <>
          {order?.amounbefore - order?.amount_after > 0 && (
            <div className={styles.usedInfo}>
              <p>Долг к оплате</p>
              <div className={styles.debtPayment}>
                {`${order?.amounbefore - order?.amount_after || 0} сум`}
              </div>
            </div>
          )}
          <div className={styles.usedInfo}>
            <p>Начало аренды</p>
            <div>{order?.merchant_list_id_data?.detail_address_in_english}</div>
            <div>{`${format(parseISO(order?.created_time), "dd MMMM yyyy")} - ${
              moment.utc(order?.created_time).format("HH:mm") || "00:00"
            }`}</div>
          </div>

          <div className={styles.usedInfo}>
            <p>Завершения аренды</p>
            <div>Метро Ноза</div>
            <div>{`${format(parseISO(order?.created_time), "dd MMMM yyyy")} - ${
              moment.utc(order?.end_time).format("HH:mm") || "00:00"
            }`}</div>
          </div>
          <div className={styles.usedInfo}>
            <p>Способ оплаты</p>
            <div>
              **** **** ****{" "}
              {order?.credit_card_list_id_data?.credit_card?.slice(-4) ||
                "0000"}
            </div>
          </div>
          <div className={styles.usedInfo}>
            <p>Повербанк ID</p>
            <div>{order?.battery_list_id_data?.powerbank_id}</div>
          </div>
        </>
      )}

      <div className={styles.moreWrap}>
        <div className={styles.moreBtn} onClick={readMoreHandler}>
          {!open ? "Подробно" : "Закрыть"}
        </div>
        {!open ? <DownIcon /> : <UpIcon />}
      </div>
    </div>
  );
};

export default HistoryCard;
