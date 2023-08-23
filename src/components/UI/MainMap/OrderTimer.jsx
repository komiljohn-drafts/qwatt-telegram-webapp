import useOrderTimer from '@/hooks/useOrderTimer';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const OrderTimer = ({order}) => {
  const { debt, price, orderStatusTime, place } = useOrderTimer(order)
  const params = new URLSearchParams(document.location.search);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-full min-w-[80vw] text-xs text-white bg-white rounded-2xl">
      <div className="flex flex-row w-full bg-[#12ADC1] p-4 rounded-t-2xl justify-between items-center">
        <div></div>
        <p
          className="font-medium cursor-pointer"
          onClick={() => navigate("/faq")}
        >
          {t("how_to_return_powerbank")}
        </p>
      </div>

      <div className="flex flex-row w-full bg-white py-1 px-4 justify-between items-center">
        <p className="text-[#686B70]">{t("on_use")}:</p>
        <p className="text-[#282727]">{`
          ${orderStatusTime.days > 0 ? orderStatusTime.days +t("day")+"." : ""}
          ${orderStatusTime.days == 0 && orderStatusTime.hours == 0 ? "" : orderStatusTime.hours+t("hour")+"."}
          ${orderStatusTime.minutes+t("minute")+"."}
        `}</p>
      </div>
      <div className="flex flex-row w-full bg-white py-1 px-4 justify-between items-center">
        <p className="text-[#686B70]">{t("rental_price")}:</p>
        <p className="text-[#282727]">
          {price} {t("сум")}
        </p>
      </div>
      {debt && (
        <div className="flex flex-row w-full bg-white py-1 px-4 justify-between items-center">
          <p className="text-[#686B70]">{t("debt")}</p>
          <p className="text-[#ED4337]">
            {debt} {t("сум")}
          </p>
        </div>
      )}
      <div className="flex flex-row w-full rounded-b-2xl bg-white py-1 px-4 justify-between items-center">
        <p className="text-[#686B70]">{t("rental_place")}:</p>
        <p className="text-[#282727]">{params.get("place") || place}</p>
      </div>
    </div>
  )
}

export default OrderTimer