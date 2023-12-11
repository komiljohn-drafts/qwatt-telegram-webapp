import MobileHeader from "@/components/UI/MobileHeader"
import PaymentInfo from "@/components/Pages/Payment"
import { useTranslation } from "react-i18next"

const Payment = () => {
  const { t } = useTranslation()

  return (
    <div>
      <MobileHeader title={t("rental")} isBlueBg={true} />
      <PaymentInfo />
    </div>
  )
}

export default Payment
