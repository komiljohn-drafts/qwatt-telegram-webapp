import useOrderTimer from "@/hooks/useOrderTimer"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import styles from "./style.module.scss"

const OrderTimer = ({ order }) => {
  const { debt, price, orderStatusTime, place } = useOrderTimer(order)
  const params = new URLSearchParams(document.location.search)
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="w-full min-w-[80vw] text-xs text-white rounded-2xl">
      <div
        className="flex flex-row w-full py-2 px-4 rounded-t-2xl justify-between items-center"
        style={{ background: "var(--button-color)" }}
      >
        <p className={styles.defText}>Используется</p>
        <p
          className="font-medium cursor-pointer"
          onClick={() => navigate("/uz/faq")}
        >
          {t("how_to_return_powerbank")}
        </p>
      </div>

      <div
        className="flex flex-row w-full bg-white py-2 pt-3 px-4 justify-between items-center"
        style={{ background: "var(--main-color)" }}
      >
        <p className="text-[var(--text-grey-color)]">{t("on_use")}:</p>
        <p className="text-[var(--close-icon-color)]">{`
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
      <div
        className="flex flex-row w-full bg-white py-2 px-4 justify-between items-center"
        style={{ background: "var(--main-color)" }}
      >
        <p className="text-[var(--text-grey-color)]">{t("rental_price")}:</p>
        <p className="text-[var(--close-icon-color)]">
          {price} {t("сум")}
        </p>
      </div>
      {debt && (
        <div
          className="flex flex-row w-full bg-white py-2 px-4 justify-between items-center"
          style={{ background: "var(--main-color)" }}
        >
          <p className="text-[var(--text-grey-color)]">{t("debt")}</p>
          <p className="text-[#ED4337]">
            {debt} {t("сум")}
          </p>
        </div>
      )}
      <div
        className="flex flex-row w-full rounded-b-2xl bg-white py-2 pb-3 px-4 justify-between items-center"
        style={{ background: "var(--main-color)" }}
      >
        <p className="text-[var(--text-grey-color)]">{t("rental_place")}:</p>
        <p className="text-[var(--close-icon-color)]">
          {params.get("place") || place}
        </p>
      </div>
    </div>
  )
}

export default OrderTimer
