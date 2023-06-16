import MobileHeader from "@/components/UI/MobileHeader";
import OrderCreate from "@/components/Pages/OrderCreate";

const Order = () => {
  return (
    <div>
      <MobileHeader title={"Введите код под QR кодом"} />
      <OrderCreate />
    </div>
  );
};

export default Order;
