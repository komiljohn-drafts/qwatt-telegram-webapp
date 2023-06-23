import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { CheckSlotPosition } from "@/helpers/checkSlotPosition";
import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert";
import { LinearProgress } from "@mui/material";
import MobileHeader from "@/components/UI/MobileHeader";
import SuccessAlert from "@/components/UI/SuccessAlert/SuccessAlert";
import { orderErrorNoteActions } from "@/store/Order/orderErrorNote";
import qwatt from "@/assets/images/qwatt.svg";
import { slotActions } from "@/store/Order/Slot";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Rent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const slot = useSelector((state) => state.slot?.slotNumber);
  const errorNote = useSelector((state) => state.orderErrorNote?.error);
  const [isSuccessAlertOpen, setSuccessAlertOpen] = useState(false);
  const [successAlertProps, setSuccessAlertProps] = useState({});
  const [slotPosition, setSlotPosition] = useState("");
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertProps, setErrorAlertProps] = useState({});
  const cabineInfo = useSelector(
    (state) => state.orders?.orderIds?.response?.[0]
  );

  useEffect(() => {
    if (slot) {
      setSuccessAlertOpen(true);
      setSuccessAlertProps({
        action: () => {
          setSuccessAlertOpen(false);
          navigate("/", { replace: true });
          dispatch(slotActions.setSlot(""));
        },
      });
    }

    setSlotPosition(CheckSlotPosition(cabineInfo?.powerbank_slots, slot));
  }, [slot]);

  useEffect(() => {
    if (errorNote) {
      setErrorAlertOpen(true);
      setErrorAlertProps({
        text: errorNote,
        action: () => {
          navigate("/", { replace: true });
          dispatch(orderErrorNoteActions.setOrderErrorNote(""));
        },
      });
    }
  }, [errorNote]);

  return (
    <div className="w-full">
      <MobileHeader title={t("rental")} path="/" />
      <div className="flex items-center  justify-center w-full py-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            className={`flex flex-col items-center justify-center gap-6 border-2 rounded-3xl border-[#b8b8b8] py-8 ${
              cabineInfo?.powerbank_slots > 24 ? "px-4" : "px-10"
            }`}
          >
            <img src={qwatt} alt="qwatt" className="w-40 " />
            <div
              className={`grid ${
                cabineInfo?.powerbank_slots > 24
                  ? "grid-cols-4 gap-x-1"
                  : "grid-cols-2 gap-x-8"
              } gap-y-3 `}
            >
              {Array.from(
                { length: cabineInfo?.powerbank_slots },
                (v, i) => i
              ).map((_, index) => (
                <div
                  key={index}
                  className={`${
                    cabineInfo?.powerbank_slots > 24 ? "w-16" : "w-20"
                  } h-5 border rounded-2xl ${
                    index + 1 == slotPosition
                      ? "bg-[#12ADC1]  border-[#12ADC1]"
                      : "bg-[#EFEFEF]  border-[#E0E0E0]"
                  }`}
                />
              ))}
            </div>
          </div>
          <p
            className={`font-medium text-[#686B70] ${
              slot || errorNote ? "hidden" : "block"
            }`}
          >
            {t("selecting_powerbank")}
          </p>
          <div className={`w-full ${slot || errorNote ? "hidden" : "block"}`}>
            <LinearProgress />
          </div>
        </div>
      </div>

      <SuccessAlert
        openAlert={isSuccessAlertOpen}
        setOpenAlert={setSuccessAlertOpen}
        action={successAlertProps?.action}
      />

      <ErrorAlert
        title={errorAlertProps?.title}
        errorMesage={errorAlertProps?.text}
        action={errorAlertProps?.action}
        openAlert={isErrorAlertOpen}
        setOpenAlert={setErrorAlertOpen}
      />
    </div>
  );
}
