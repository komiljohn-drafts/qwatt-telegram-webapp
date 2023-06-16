import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import moment from "moment";
import { orderDetailsActions } from "@/store/Order/orderDetails";
import request from "@/utils/axios";

export default function useOrderTimer() {
  const dispatch = useDispatch();
  const [fetchedData, setFetchedData] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderStatusGuid, setOrderStatusGuid] = useState(null);
  const [price, setPrice] = useState(null);
  const [debt, setDebt] = useState(null);
  const [orderStatusTime, setOrderStatusTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const orderData = useSelector((state) => state.orderDetails?.data);

  const getOrderDetails = () => {
    if (!orderData?.guid) return;

    request({
      method: "GET",
      url: `/orders/${orderData?.guid}`,
    }).then((res) => {
      console.log("order details", res?.data?.data?.response);
      setPrice(res?.data?.data?.response?.amounbefore);
      setFetchedData(res?.data?.data?.response);

      const timestamp = moment(res?.data?.data?.response?.created_time);
      const timenow = moment();
      const diffe = timenow.diff(timestamp, "seconds");
      const duration = moment.duration(diffe, "seconds");
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      setOrderStatusTime({ hours, minutes, seconds });

      console.log(`hours: ${hours}, minutes: ${minutes}, seconds: ${seconds}`);

      setOrderStatusGuid(res?.data?.data?.response?.order_status_id);

      if (
        res?.data?.data?.response?.amounbefore -
          res?.data?.data?.response?.amount_after >
        0
      ) {
        setDebt(
          res?.data?.data?.response?.amounbefore -
            res?.data?.data?.response?.amount_after
        );
      }
    });
  };

  const getOrderStatus = () => {
    if (!orderStatusGuid) return;

    request({
      method: "GET",
      url: `/order_status/${orderStatusGuid}`,
    }).then((res) => {
      console.log("order status", res?.data?.data?.response);
      setOrderStatus(res?.data?.data?.response?.name);
      if (res?.data?.data?.response?.name === "Has been completed") {
        dispatch(orderDetailsActions.setOrderDetails({}));
      }
    });
  };

  useEffect(() => {
    getOrderDetails();

    let interval = setInterval(() => {
      getOrderDetails();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    getOrderStatus();

    let interval = setInterval(() => {
      getOrderStatus();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [orderStatusGuid]);

  useEffect(() => {
    if (
      orderStatusTime.hours == 0 &&
      orderStatusTime.minutes == 0 &&
      orderStatusTime.seconds == 0
    )
      return;

    const interval = setInterval(() => {
      if (orderStatusTime.seconds < 59) {
        setOrderStatusTime((prev) => ({
          ...prev,
          seconds: prev.seconds + 1,
        }));
      } else if (orderStatusTime.minutes < 59) {
        setOrderStatusTime((prev) => ({
          ...prev,
          minutes: prev.minutes + 1,
          seconds: 0,
        }));
      } else {
        setOrderStatusTime((prev) => ({
          ...prev,
          hours: prev.hours + 1,
          minutes: 0,
          seconds: 0,
        }));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [orderStatusTime]);

  return { fetchedData, orderStatus, orderStatusTime, price, debt };
}
