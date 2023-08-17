import request from "@/utils/axios";
import axios from "axios";

export const getPrice = async (data) => {
  return await request({
    method: "post",
    url: "/get-list/pricing_descs",
    data,
  });
};

export const getPriceFaq = async (data) => {
  return await request({
    method: "post",
    url: "/get-list/pricing_description",
    data,
  });
};

export const getFaqs = async (data) => {
  return await axios.post(
    "https://api.admin.u-code.io/v1/invoke_function/qwatt-getdescriptions-4dbfb907-8b4b-460b-906b-cc81c58e656c", 
    data,
    {
      headers: {
        Authorization: "API-KEY",
        "X-API-KEY": "P-LjlsEVqKmkuiQNYQEi5iZuH3WXVwUU45",
      },
    }
  )
}