import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useState } from "react";

export default function ErrorAlert({
  title = "Произошла ошибка",
  errorMesage,
  action,
  openAlert,
  setOpenAlert,
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpenAlert(false);
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
        {title}
      </DialogTitle>
      <DialogContent className="pb-2">
        <DialogContentText
          id="alert-dialog-description"
          className="text-xs font-normal text-center text-[#686B70]"
        >
          {errorMesage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div className="w-full flex items-center justify-center pb-2">
          <button
            className="bg-[#12ADC1] h-10 w-36 font-semibold text-white rounded-lg text-[15px]"
            onClick={() => {
              setOpen(false);
              setOpenAlert(false);
              action();
            }}
          >
            Хорошо
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
