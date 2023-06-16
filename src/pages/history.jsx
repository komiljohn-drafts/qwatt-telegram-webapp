import HistoryPage from "@/components/Pages/History";
import MobileHeader from "@/components/UI/MobileHeader";

const History = () => {
  return (
    <div>
      <MobileHeader title="История заказов" />
      <HistoryPage />
    </div>
  );
};

export default History;
