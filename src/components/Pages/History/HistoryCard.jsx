import { DollorIcon, DownIcon, TimeIcon, UpIcon } from "@/screen-capture/icons";
import { format, parseISO } from "date-fns";

import PropTypes from "prop-types";
import moment from "moment";
import styles from "./style.module.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const HistoryCard = ({ order }) => {
  const [open, setOpen] = useState();
  const { t } = useTranslation();
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
        <div>
          {`${order?.amounbefore || 0}`} {t("sum")}
        </div>
      </div>

      {open && (
        <>
          {order?.amounbefore - order?.amount_after > 0 && (
            <div className={styles.usedInfo}>
              <p>{t("debt")}</p>
              <div className={styles.debtPayment}>
                {`${order?.amounbefore - order?.amount_after || 0}`} {t("sum")}
              </div>
            </div>
          )}
          <div className={styles.usedInfo}>
            <p>{t("rental_start")}</p>
            <div>{order?.merchant_list_id_data?.detail_address_in_english}</div>
            <div>{`${format(parseISO(order?.created_time), "dd MMMM yyyy")} - ${
              moment.utc(order?.created_time).format("HH:mm") || ""
            }`}</div>
          </div>

          <div className={styles.usedInfo}>
            <p>{t("rental_end")}</p>
            <div>Метро Ноза</div>
            <div>{`${format(parseISO(order?.created_time), "dd MMMM yyyy")} - ${
              moment.utc(order?.end_time).format("HH:mm") || ""
            }`}</div>
          </div>
          <div className={styles.usedInfo}>
            <p>{t("payment_method")}</p>
            <div>{order?.credit_card_list_id_data?.credit_card || ""}</div>
          </div>
          <div className={styles.usedInfo}>
            <p>{t("powerbank_id")}</p>
            <div>{order?.battery_list_id_data?.powerbank_id}</div>
          </div>
        </>
      )}

      <div className={styles.moreWrap}>
        <div className={""} onClick={readMoreHandler}>
          {!open ? t("more") : t("close")}
        </div>
        {!open ? <DownIcon /> : <UpIcon />}
      </div>
    </div>
  );
};

export default HistoryCard;

HistoryCard.propTypes = {
  order: PropTypes.object,
};

HistoryCard.defaultProps = {
  order: {},
};
