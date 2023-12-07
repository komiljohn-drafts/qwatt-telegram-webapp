import HistoryPage from "@/components/Pages/History"
import MobileHeader from "@/components/UI/MobileHeader"
import { useTranslation } from "react-i18next"

const History = () => {
  const { t } = useTranslation()

  return (
    <div>
      <MobileHeader title={t("order_history")} isBlueBg={true} />
      <HistoryPage />
    </div>
  )
}

export default History
