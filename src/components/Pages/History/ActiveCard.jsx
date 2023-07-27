import { format, parseISO } from "date-fns";

import PropTypes from "prop-types";
import styles from "./style.module.scss";
import useOrderTimer from "@/hooks/useOrderTimer";
import { useTranslation } from "react-i18next";
import moment from "moment";

const ActiveCard = ({ order }) => {
  const { orderStatusTime } = useOrderTimer();
  const { t } = useTranslation();

  return (
    <div className={styles.usedHistory}>
      <div className={styles.historyInfo}>
        {order?.end_time == "" && (
          <div className="flex flex-row w-full justify-between items-center">
            <div
              className="flex items-center justify-center px-2 py-1 rounded-2xl"
              style={{ background: "rgba(18, 173, 193, 0.15)" }}
            >
              <p className="font-medium text-sm text-[#12ADC1]">
                {t("on_use")}
              </p>
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
          <p>{t("rental_start")}</p>
          <div>{order?.merchant_list_id_data?.detail_adress_in_uzbek}</div>
          <div>{`${format(parseISO(order?.created_time), "dd MMMM yyyy")} - ${
              moment.utc(order?.created_time).format("HH:mm") || ""
            }`}</div>
        </div>
      )}
      {order?.end_time == "" && (
        <div className={styles.usedInfo}>
          <p>{t("rental_amount")}</p>
          <div>
            {`${order?.amounbefore || 0}`} {t("sum")}
          </div>
        </div>
      )}

      {order?.end_time == "" && (
        <div className={styles.usedInfo}>
          <p>{t("powerbank_id")}</p>
          <div>{order?.battery_list_id_data?.powerbank_id}</div>
        </div>
      )}
    </div>
  );
};

export default ActiveCard;

ActiveCard.propTypes = {
  order: PropTypes.object,
};

ActiveCard.defaultProps = {
  order: {},
};
