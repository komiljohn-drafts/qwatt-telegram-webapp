import MobileHeader from "@/components/UI/MobileHeader"
import OrderCreate from "@/components/Pages/OrderCreate"
import { useTranslation } from "react-i18next"

const Order = () => {
  const { t } = useTranslation()

  return (
    <div className="w-full">
      <MobileHeader title={t("enter_qr_code")} isBlueBg={true} />
      <OrderCreate />
    </div>
  )
}

export default Order
