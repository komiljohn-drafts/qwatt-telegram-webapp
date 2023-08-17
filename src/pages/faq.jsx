import FaqPage from "@/components/Pages/Faq";
import MobileHeader from "@/components/UI/MobileHeader";
import { useTranslation } from "react-i18next";

const Faq = () => {
  const { t } = useTranslation();
  return (
    <div>
      {/* static data */}
      <MobileHeader title={t("faqs")} path="/" /> 
      <FaqPage />
    </div>
  );
};

export default Faq;
