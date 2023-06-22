import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getOrders } from "@/services/setOrder";
import moment from "moment";
import { orderDetailsActions } from "@/store/Order/orderDetails";
import request from "@/utils/axios";

export default function useOrderTimer() {
  const dispatch = useDispatch();
  const [fetchedData, setFetchedData] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const userData = useSelector((state) => state.userData?.data);
  const [orderStatusGuid, setOrderStatusGuid] = useState(null);
  const [price, setPrice] = useState(null);
  const [place, setPlace] = useState(null);
  const [debt, setDebt] = useState(null);
  const [orderStatusTime, setOrderStatusTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const getOrderDetails = () => {
    getOrders({
      data: {
        with_relations: false,
        user_id: userData?.guid,
      },
    }).then((res) => {
      console.log("all orders", res?.data?.data?.response);

      const activeOrder = res?.data?.data?.response?.filter(
        (el) => el?.end_time == ""
      );

      console.log("active order", activeOrder);

      setPrice(activeOrder?.amounbefore);
      setFetchedData(activeOrder);
      setPlace(activeOrder?.merchant_list_id_data?.venune_name_in_english);

      const timestamp = moment(res?.data?.data?.response?.created_time);
      const timenow = moment();
      const diffe = timenow.diff(timestamp, "seconds");
      const duration = moment.duration(diffe, "seconds");
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      setOrderStatusTime({ hours, minutes, seconds });

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

  console.log("fetched data", fetchedData);

  const getOrderStatus = () => {
    if (!orderStatusGuid) return;

    request({
      method: "GET",
      url: `/order_status/${orderStatusGuid}`,
    }).then((res) => {
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

  return { fetchedData, orderStatus, orderStatusTime, price, debt, place };
}
