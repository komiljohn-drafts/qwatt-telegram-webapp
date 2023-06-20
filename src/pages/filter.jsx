import FilterPage from "@/components/Pages/Filter";
import MobileHeader from "@/components/UI/MobileHeader";
import { useTranslation } from "react-i18next";

const Filter = () => {
  const { t } = useTranslation();
  return (
    <div>
      <MobileHeader title={t("filter")} />
      <FilterPage />
    </div>
  );
};

export default Filter;
