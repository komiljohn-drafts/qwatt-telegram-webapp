import MobileHeader from "@/components/UI/MobileHeader";
import MyCardsPage from "@/components/Pages/MyCards";
import { useTranslation } from "react-i18next";

const MyCards = () => {
  const { t } = useTranslation();
  return (
    <div>
      <MobileHeader title={t("my_cards")} path="/" />
      <MyCardsPage />
    </div>
  );
};

export default MyCards;
