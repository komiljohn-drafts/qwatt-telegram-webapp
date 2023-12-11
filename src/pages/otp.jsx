import MobileHeader from "@/components/UI/MobileHeader"
import OTPcode from "@/components/Pages/OTP"
import { useTranslation } from "react-i18next"

const CardOtp = () => {
  const { t } = useTranslation()
  return (
    <div>
      <MobileHeader title={t("link_card")} isBlueBg={true} />
      <OTPcode />
    </div>
  )
}

export default CardOtp
