import DocPage from "@/components/Pages/DocPage";
import MobileHeader from "@/components/UI/MobileHeader";
import { useTranslation } from "react-i18next";

const Documentation = () => {
  const { t } = useTranslation();

  return (
    <div>
      <MobileHeader title={t("documentation")} path="/" />
      <DocPage />
    </div>
  );
};

export default Documentation;
