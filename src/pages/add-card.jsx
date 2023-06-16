import AddingCard from "@/components/Pages/AddCard";
import MobileHeader from "@/components/UI/MobileHeader";

const AddCard = () => {
  return (
    <div>
      <MobileHeader title={"Привязать карту"} />
      <AddingCard />
    </div>
  );
};

export default AddCard;
