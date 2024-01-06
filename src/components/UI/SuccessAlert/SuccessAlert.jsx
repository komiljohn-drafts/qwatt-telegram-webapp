import PropTypes from "prop-types"
import { SwipeableDrawer } from "@mui/material"
import { useTranslation } from "react-i18next"

import CheckIcon from "../../../assets/images/check.svg"
export default function SuccessAlert({
  openAlert,
  setOpenAlert,
  title,
  text,
  action,
}) {
  const { t } = useTranslation()

  return (
    <SwipeableDrawer
      anchor="bottom"
      classes={"!border-t-2 !border-white !rounded-t-2xl"}
      className=""
      open={openAlert}
      onClose={() => {
        action && action()
        setOpenAlert(false)
      }}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
      }}
    >
      <div className="flex flex-col gap-3 p-6 pt-4 items-center bg-[var(--location-bg-color)] ">
        <div
          className="rounded-2xl h-1 w-10 self-center"
          style={{ background: "#646778" }}
        />

        <img src={CheckIcon} alt="icon" />

        <h2 className="text-center text-lg font-semibold text-[var(--close-icon-color)]">
          {title || t("successfully_rented")}
        </h2>

        <p className="text-center text-sm text-[var(--text-grey-color)] mb-4">
          {text || t("charge_and_enjoy")}
        </p>

        <button
          className="p-3 rounded-2xl font-medium text-white w-full"
          style={{ background: "var(--button-color)" }}
          onClick={() => {
            action && action()
            setOpenAlert(false)
          }}
        >
          {t("to_menu")}
        </button>
      </div>
    </SwipeableDrawer>
  )
}

SuccessAlert.propTypes = {
  openAlert: PropTypes.bool.isRequired,
  setOpenAlert: PropTypes.func.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  action: PropTypes.func,
}
