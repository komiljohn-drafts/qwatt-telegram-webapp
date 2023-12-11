import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"

export default function ErrorAlert({
  title,
  errorMesage,
  action,
  openAlert,
  setOpenAlert,
  dependency,
}) {
  const { t } = useTranslation()
  const [getElement, setGetElement] = useState("")

  useEffect(() => {
    const theme = document?.documentElement?.getAttribute("data-theme")

    if (theme) {
      setGetElement(theme)
    }

    const observer = new MutationObserver((mutations) => {
      const themeMutation = mutations.find(
        (mutation) =>
          mutation.attributeName === "data-theme" &&
          mutation.target === document.documentElement
      )

      if (themeMutation) {
        setGetElement(themeMutation.target.getAttribute("data-theme"))
      }
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleClose = () => {
    setOpenAlert(false)
    action && action()
    dependency && dependency()
  }

  return (
    <Dialog
      open={openAlert}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="!rounded-2xl"
      borderRadius="2xl"
      maxWidth="xs"
      fullWidth={false}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          background: getElement === "dark" ? "#242429" : "#DFE1EE",
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        className={`text-center !font-semibold !text-[17px] tracking-tight !pb-1 ${
          getElement === "dark" ? "text-[#fff]" : "text-[#242429]"
        }`}
      >
        {title ? title : t("error")}
      </DialogTitle>
      <DialogContent className="!pb-1 ">
        <DialogContentText
          id="alert-dialog-description"
          className={`!text-xs !font-normal text-center ${
            getElement === "dark" ? "!text-[#ccc]" : "!text-[#9093a2]"
          }`}
        >
          {errorMesage ? errorMesage : t("error_text")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div className="w-full flex items-center justify-center pb-2">
          <button
            className="bg-[#0073FF] h-10 w-36 font-semibold text-white rounded-lg text-sm"
            onClick={() => {
              setOpenAlert(false)
              action()
              dependency && dependency()
            }}
          >
            {t("good")}
          </button>
        </div>
      </DialogActions>
    </Dialog>
  )
}

ErrorAlert.propTypes = {
  title: PropTypes.string,
  errorMesage: PropTypes.string,
  action: PropTypes.func,
  openAlert: PropTypes.bool,
  setOpenAlert: PropTypes.func,
  dependency: PropTypes.any,
}

ErrorAlert.defaultProps = {
  title: "",
  errorMesage: "",
  action: () => {},
  openAlert: false,
  setOpenAlert: () => {},
}
