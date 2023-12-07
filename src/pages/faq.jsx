import FaqPage from "@/components/Pages/Faq"
import MobileHeader from "@/components/UI/MobileHeader"
import { useTranslation } from "react-i18next"

const Faq = () => {
  const { t } = useTranslation()
  return (
    <div>
      <MobileHeader title={t("faq")} path="/" isBlueBg={true} />
      <FaqPage />
    </div>
  )
}

export default Faq
