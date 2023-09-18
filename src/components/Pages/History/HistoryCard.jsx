import { BonusIcon, DollorIcon, DownIcon, LightingIcon, QwattBlueIcon, TimeIcon, UpIcon, starIcon } from "@/screen-capture/icons";
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

  const paymentMethod = () => {
    const {ball, total, rental_name, card} = order
    let result = ""
    let icon = <></>
    if (ball > 0) {
      result = t("scores")
      icon = starIcon()
      if (total > 0) {
        result += (" + " + card)
      }
    } else if (rental_name) {
      result = rental_name
      icon = <LightingIcon color="#12ADC1" />
      if (total > 0) {
        result += (" + " + card)
      }
    } else {
      result = card
    }
    return (
      <span className="flex items-center gap-1">
        {icon} {result}
      </span>
    )
  }

  return (
    <div className={styles.usedHistory}>
      <div
        className="flex w-max items-center justify-center px-2 py-1 mb-2 rounded-2xl"
        style={{ background: "rgba(18, 173, 193, 0.15)" }}
      >
        <p className="font-medium text-sm text-[#12ADC1]">
          {t("finished")}
        </p>
      </div>
      <div className={styles.historyInfo}>
        <div>
          <TimeIcon />
        </div>
        <div>{format(parseISO(order?.created_time), "dd MM yyyy")}</div>
      </div>
      <div className={styles.historyInfo}>
        <div>
          <DollorIcon />
        </div>
        <div>
          {`${order?.total || 0}`} {t("sum")}
        </div>
      </div>
      {order?.ball > 0
        && <div className={styles.historyInfo}>
          <div>
            <BonusIcon />
          </div>
          <div>
            {`${order?.ball}`} {t("score")}
          </div>
      </div>}

      <div className={`${styles.openCard} ${open ? '' : styles.card}`}>
        {order?.debt > 0 && (
          <div className={styles.usedInfo}>
            <p>{t("debt")}</p>
            <div className={styles.debtPayment}>
              {`${order?.debt}`} {t("sum")}
            </div>
          </div>
        )}
        <div className={styles.usedInfo}>
          <p>{t("rental_start")}</p>
          <div>{order?.started_merchant}</div>
          <div>
            {`${
              format(parseISO(order?.created_time), "dd MMMM yyyy")
            } - ${
              moment(order?.created_time).format("HH:mm") || ""
            }`}
          </div>
        </div>

        <div className={styles.usedInfo}>
          <p>{t("rental_end")}</p>
          <div>{order?.end_merchant}</div>
          {order?.end_time && <div>
            {`${
              format(parseISO(order?.end_time), "dd MMMM yyyy")
            } - ${
              moment(order?.end_time).format("HH:mm") || ""
            }`}
          </div> }
        </div>
        <div className={styles.usedInfo}>
          <p>{t("payment_method")}</p>
          <div>{paymentMethod()}</div>
        </div>
        <div className={styles.usedInfo}>
          <p>{t("powerbank_id")}</p>
          <div>{order?.power_bank_id}</div>
        </div>
      </div>

      <div className={styles.moreWrap}>
        <div onClick={readMoreHandler}>
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
