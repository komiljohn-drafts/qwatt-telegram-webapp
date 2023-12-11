import AddingCard from "@/components/Pages/AddCard"
import MobileHeader from "@/components/UI/MobileHeader"
import { useTranslation } from "react-i18next"

const AddCard = () => {
  const { t } = useTranslation()

  return (
    <div>
      <MobileHeader title={t("link_card")} isBlueBg={true} />
      <AddingCard />
    </div>
  )
}

export default AddCard
