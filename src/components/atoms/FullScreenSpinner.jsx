import PropTypes from "prop-types";
// import { ThreeDots } from "react-loader-spinner";

export default function FullScreenSpinner({ display }) {
  return (
    <>
      <div />
      {/* <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#12adc1"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      wrapperClassName=""
      visible={display || true}
    /> */}
    </>
  );
}

FullScreenSpinner.propTypes = {
  display: PropTypes.bool,
};
