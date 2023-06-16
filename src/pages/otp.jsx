import MobileHeader from "@/components/UI/MobileHeader";
import OTPcode from "@/components/Pages/OTP";

const CardOtp = () => {
  return (
    <div>
      <MobileHeader title={"Привязать карту"} />
      <OTPcode />
    </div>
  );
};

export default CardOtp;
