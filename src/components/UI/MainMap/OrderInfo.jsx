import { useNavigate } from "react-router-dom";
import useOrderTimer from "@/hooks/useOrderTimer";
import { useTranslation } from "react-i18next";

export default function OrderInfo() {
  const { debt, price, orderStatusTime, orderStatus, place } = useOrderTimer();
  const params = new URLSearchParams(document.location.search);
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (
    orderStatus === "In The Lease"
  ) {
    return (
      <div className="flex absolute z-20 top-20  my-0 mx-auto right-0 left-0 items-center justify-center px-5">
        <div className="w-full text-xs text-white bg-white rounded-2xl">
          <div className="flex flex-row w-full bg-[#12ADC1] p-4 rounded-t-2xl justify-between items-center">
            <div
              className="flex items-center justify-center px-2 py-1 rounded-2xl"
              style={{ background: "rgba(255, 255, 255, 0.15)" }}
            >
              <p className="font-medium">{t("on_use")}</p>
            </div>
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
              ${orderStatusTime.days > 0 ? orderStatusTime.days +t("day") +".      " : ""}
              ${orderStatusTime.hours < 10 ? "0" : ""}${orderStatusTime.hours}
              :
              ${orderStatusTime.minutes < 10 ? "0" : ""}${orderStatusTime.minutes}
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
      </div>
    );
  }

  return null;
}
