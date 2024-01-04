import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { CheckSlotPosition } from "@/helpers/checkSlotPosition"
import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert"
import { LinearProgress } from "@mui/material"
import MobileHeader from "@/components/UI/MobileHeader"
import SuccessAlert from "@/components/UI/SuccessAlert/SuccessAlert"
import { orderErrorNoteActions } from "@/store/Order/orderErrorNote"
import qwatt from "@/assets/images/qwatt.svg"
import { slotActions } from "@/store/Order/Slot"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styles from "./style.module.scss"

export default function Rent() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const slot = useSelector((state) => state.slot?.slotNumber)
  const errorNote = useSelector((state) => state.orderErrorNote?.error)
  const [isSuccessAlertOpen, setSuccessAlertOpen] = useState(false)
  const [successAlertProps, setSuccessAlertProps] = useState({})
  const [slotPosition, setSlotPosition] = useState("")
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false)
  const [errorAlertProps, setErrorAlertProps] = useState({})
  const cabineInfo = useSelector(
    (state) => state.orders?.orderIds?.response?.[0]
  )

  useEffect(() => {
    if (slot) {
      setSuccessAlertOpen(true)
      setSuccessAlertProps({
        action: () => {
          setSuccessAlertOpen(false)
          navigate("/", { replace: true })
          dispatch(slotActions.setSlot(""))
        },
      })
    }

    setSlotPosition(CheckSlotPosition(cabineInfo?.powerbank_slots, slot))
  }, [slot])

  useEffect(() => {
    if (errorNote) {
      setErrorAlertOpen(true)
      setErrorAlertProps({
        text: errorNote,
        action: () => {
          navigate("/", { replace: true })
          dispatch(orderErrorNoteActions.setOrderErrorNote(""))
        },
      })
    }
  }, [errorNote])

  return (
    <div className="w-full">
      <MobileHeader title={t("rental")} path="/" isBlueBg={true} />
      <div
        className={`flex items-center  justify-center h-[100vh] w-full ${
          slot ? styles.py3 : ""
        }`}
        style={{ background: "var(--page-main-color)" }}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            className={`flex flex-col items-center justify-center gap-6 border-2 rounded-3xl border-[var(--page-header-border-color)] py-8 ${
              cabineInfo?.powerbank_slots > 24 ? "px-4" : "px-10"
            }`}
            style={{ background: "var(--bonus-card-color)" }}
          >
            <img src={qwatt} alt="qwatt" className="w-20 " />
            <div
              className={`grid ${
                cabineInfo?.powerbank_slots > 24
                  ? "grid-cols-4 gap-x-2"
                  : "grid-cols-2 gap-x-5"
              } gap-y-2.5 `}
            >
              {Array.from(
                { length: cabineInfo?.powerbank_slots },
                (v, i) => i
              ).map((_, index) => (
                <div
                  key={index}
                  className={`${
                    styles.powerbank_slot_box
                  } w-12 h-4 border rounded-2xl ${
                    index + 1 == slotPosition
                      ? "bg-[#0073ff]  border-[#0073ff]"
                      : "bg-[#EFEFEF]  border-[#E0E0E0]"
                  }`}
                />
              ))}
            </div>
          </div>
          <p
            className={`font-medium text-[var(--text-grey-color)] ${
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
  )
}
