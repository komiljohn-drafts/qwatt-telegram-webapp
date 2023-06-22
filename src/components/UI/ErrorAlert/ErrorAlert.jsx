import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function ErrorAlert({
  title,
  errorMesage,
  action,
  openAlert,
  setOpenAlert,
}) {
  const { t } = useTranslation();
  const handleClose = () => {
    setOpenAlert(false);
    action && action();
  };

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
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        className="text-center font-semibold text-[17px] tracking-tight pb-2"
      >
        {title ? title : t("error")}
      </DialogTitle>
      <DialogContent className="pb-2">
        <DialogContentText
          id="alert-dialog-description"
          className="text-xs font-normal text-center text-[#686B70]"
        >
          {errorMesage ? errorMesage : t("error_text")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div className="w-full flex items-center justify-center pb-2">
          <button
            className="bg-[#12ADC1] h-10 w-36 font-semibold text-white rounded-lg text-[15px]"
            onClick={() => {
              setOpenAlert(false);
              action();
            }}
          >
            {t("good")}
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

ErrorAlert.propTypes = {
  title: PropTypes.string,
  errorMesage: PropTypes.string,
  action: PropTypes.func,
  openAlert: PropTypes.bool,
  setOpenAlert: PropTypes.func,
};

ErrorAlert.defaultProps = {
  title: "",
  errorMesage: "",
  action: () => {},
  openAlert: false,
  setOpenAlert: () => {},
};
