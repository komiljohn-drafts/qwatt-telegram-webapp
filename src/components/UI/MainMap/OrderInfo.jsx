import { useSelector } from "react-redux";
import OrderTimer from "./OrderTimer";

export default function OrderInfo() {
  const orderData = useSelector(state => state.orderDetails.data)
  const isCentered = orderData?.orders?.length == 1

  if (orderData?.orders?.length) {
    return (
      <div className="flex overflow-x-scroll absolute z-20 top-20  my-0 mx-auto right-0 left-0 items-center px-5">
        <div className={`flex gap-4 ${isCentered ? "justify-center w-full" : "w-max"}`}>
          {orderData?.orders?.map(ord => (
            <OrderTimer key={ord?.order_guid} order={ord} />
          ))}
        </div>
      </div>
    );
  }

  return null;
}
