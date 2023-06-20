import MobileHeader from "@/components/UI/MobileHeader";
import MyCardsPage from "@/components/Pages/MyCards";

const MyCards = () => {
  return (
    <div>
      <MobileHeader title="Мои карты" path="/" />
      <MyCardsPage />
    </div>
  );
};

export default MyCards;
