import PropTypes from "prop-types"
import styles from "./style.module.scss"
import useOrderTimer from "@/hooks/useOrderTimer"
import { useTranslation } from "react-i18next"
import { formatDate } from "@/helpers/formatDate"

const ActiveCard = ({ order }) => {
  const { orderStatusTime } = useOrderTimer(order)
  const { t } = useTranslation()

  return (
    <div className={styles.usedHistory}>
      <div className={styles.historyInfo}>
        {order?.end_time == "" && (
          <div className="flex flex-row w-full justify-between items-center">
            <div
              className="flex items-center justify-center px-2 py-1 rounded-2xl"
              style={{ background: "#0073FF26" }}
            >
              <p className="font-medium text-sm text-[#0073FF]">
                {t("on_use")}143123
              </p>
            </div>
            <p className="font-medium text-[#0073FF]">{`
              ${
                orderStatusTime.days > 0
                  ? orderStatusTime.days + t("day") + "."
                  : ""
              }
              ${
                orderStatusTime.days == 0 && orderStatusTime.hours == 0
                  ? ""
                  : orderStatusTime.hours + t("hour") + "."
              }
              ${orderStatusTime.minutes + t("minute") + "."}
            `}</p>
          </div>
        )}
      </div>

      {order?.end_time == "" && (
        <div className={styles.usedInfo}>
          <p>{t("rental_start")}</p>
          <p>{order?.started_merchant}</p>
          <pre>{formatDate(order?.created_time)}</pre>
        </div>
      )}
      {order?.end_time == "" && (
        <div className={styles.usedInfo}>
          <p>{t("rental_amount")}</p>
          <p>
            {`${order?.total || 0}`} {t("sum")}
          </p>
        </div>
      )}

      {order?.end_time == "" && (
        <div className={styles.usedInfo}>
          <p>{t("powerbank_id")}</p>
          <p>{order?.power_bank_id}</p>
        </div>
      )}
    </div>
  )
}

export default ActiveCard

ActiveCard.propTypes = {
  order: PropTypes.object,
}

ActiveCard.defaultProps = {
  order: {},
}
