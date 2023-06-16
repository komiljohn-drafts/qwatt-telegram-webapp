import PropTypes from "prop-types";
import { SuccessIcon } from "@/screen-capture/icons";
import { SwipeableDrawer } from "@mui/material";

export default function SuccessAlert({
  openAlert,
  setOpenAlert,
  title,
  text,
  action,
}) {
  return (
    <SwipeableDrawer
      anchor="bottom"
      classes={"!border-t-2 !border-white !rounded-t-2xl"}
      className=""
      open={openAlert}
      onClose={() => {
        action && action();
        setOpenAlert(false);
      }}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
      }}
    >
      <div className="flex flex-col gap-3 p-6 pt-4 items-center">
        <div
          className="rounded-2xl h-1 w-10 self-center"
          style={{ background: "rgba(133, 127, 127, 0.15)" }}
        />
        <SuccessIcon />

        <h2 className="text-center text-lg font-semibold">
          {title || "Успешно арендовано"}
        </h2>

        <p className="text-center text-sm text-[#686B70] mb-4">
          {text || "Заряжайте и наслаждайтесь использованием."}
        </p>

        <button
          className="p-3 rounded-2xl bg-[#12ADC1] font-medium text-white w-full"
          onClick={() => {
            action && action();
            setOpenAlert(false);
          }}
        >
          В главное меню
        </button>
      </div>
    </SwipeableDrawer>
  );
}

SuccessAlert.propTypes = {
  openAlert: PropTypes.bool.isRequired,
  setOpenAlert: PropTypes.func.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  action: PropTypes.func,
};
