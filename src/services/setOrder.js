import axios from "axios";
import request from "@/utils/axios";

export const setStation = async (data) => {
  return await request({
    method: "post",
    url: "/get-list/cabine_lists",
    data,
  });
};

export const getOrders = async (data) => {
  return await request({ method: "post", url: "/get-list/orders", data });
};

export const getOrderById = async (guid, data) => {
  return await request({
    method: "get",
    url: `/orders/${guid}`,
    data,
  });
};

export const setOrder = async (data) => {
  return await axios.post(
    "https://api.admin.u-code.io/v1/invoke_function/qwatt-createbatteryorder-4dbfb907-8b4b-460b-906b-cc81c58e656c",
    data,
    {
      headers: {
        Authorization: "API-KEY",
        "X-API-KEY": "P-LjlsEVqKmkuiQNYQEi5iZuH3WXVwUU45",
      },
    }
  );
};

export const getBonus = async (data) => {
  return await axios.post(
    "https://api.admin.u-code.io/v1/invoke_function/qwatt-getbonusanddlink-4dbfb907-8b4b-460b-906b-cc81c58e656c",
    data, 
    {
      headers: {
        Authorization: "API-KEY",
        "X-API-KEY": "P-LjlsEVqKmkuiQNYQEi5iZuH3WXVwUU45",
      }
    }
  )
}
