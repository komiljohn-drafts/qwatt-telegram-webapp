import BonusesPage from "@/components/Pages/BonusesPage";
import MobileHeader from "@/components/UI/MobileHeader";
import { useTranslation } from "react-i18next";

const Bonuses = () => {
  const { t } = useTranslation();

  return (
    <div>
      <MobileHeader title={t("bonuses")} isBlueBg={true}/>
      <BonusesPage />
    </div>
  );
};

export default Bonuses;
