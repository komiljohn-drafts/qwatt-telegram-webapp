import { format, parseISO } from "date-fns";

import styles from "./style.module.scss";
import useOrderTimer from "@/hooks/useOrderTimer";

const ActiveCard = ({ order }) => {
  const { orderStatusTime } = useOrderTimer();

  return (
    <div className={styles.usedHistory}>
      <div className={styles.historyInfo}>
        {order?.end_time == "" && (
          <div className="flex flex-row w-full justify-between items-center">
            <div
              className="flex items-center justify-center px-2 py-1 rounded-2xl"
              style={{ background: "rgba(18, 173, 193, 0.15)" }}
            >
              <p className="font-medium text-sm text-[#12ADC1]">Используется</p>
            </div>
            <p className="font-medium text-[#12ADC1]">{`${
              orderStatusTime.hours < 10 ? "0" : ""
            }${orderStatusTime.hours}:${
              orderStatusTime.minutes < 10 ? "0" : ""
            }${orderStatusTime.minutes}:${
              orderStatusTime.seconds < 10 ? "0" : ""
            }${orderStatusTime.seconds}`}</p>
          </div>
        )}
      </div>

      {order?.end_time == "" && (
        <div className={styles.usedInfo}>
          <p>Начало аренды</p>
          <div>{order?.merchant_list_id_data?.detail_address_in_english}</div>
          <div>{`${format(parseISO(order?.created_time), "dd MMMM yyyy")} - ${
            order?.merchant_list_id_data?.business_hour_start || "00:00"
          }`}</div>
        </div>
      )}
      {order?.end_time == "" && (
        <div className={styles.usedInfo}>
          <p>Сумма аренды</p>
          <div>{`${order?.amounbefore || 0} сум`}</div>
        </div>
      )}

      {order?.end_time == "" && (
        <div className={styles.usedInfo}>
          <p>Повербанк ID</p>
          <div>{order?.battery_list_id_data?.powerbank_id}</div>
        </div>
      )}
    </div>
  );
};

export default ActiveCard;
