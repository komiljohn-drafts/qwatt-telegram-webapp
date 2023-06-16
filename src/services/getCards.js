import axios from "axios";
import request from "@/utils/axios";

export const getCards = async (data) => {
  return await request({
    method: "post",
    url: "/get-list/credit_card_list",
    data,
  });
};

export const setCard = async (data) => {
  return await request({
    method: "post",
    url: "/credit_card_list",
    data,
  });
};

export const deleteCard = async (guid, data) => {
  return await request({
    method: "delete",
    url: `/credit_card_list/${guid}`,
    data,
  });
};

export const setCardOtp = async (data) => {
  return await axios.post(
    "https://api.admin.u-code.io/v1/invoke_function/qwatt-confirmcardtoken-4dbfb907-8b4b-460b-906b-cc81c58e656c",
    data,
    {
      headers: {
        Authorization: "API-KEY",
        "X-API-KEY": "P-LjlsEVqKmkuiQNYQEi5iZuH3WXVwUU45",
      },
    }
  );
};

export const setConfirmCardToken = async (data) => {
  return await axios.post(
    "https://api.admin.u-code.io/v1/invoke_function/qwatt-confirmcardtoken-4dbfb907-8b4b-460b-906b-cc81c58e656c",
    data,
    {
      headers: {
        Authorization: "API-KEY",
        "X-API-KEY": "P-LjlsEVqKmkuiQNYQEi5iZuH3WXVwUU45",
      },
    }
  );
};

export const setCardToken = async (data) => {
  return await axios.post(
    "https://api.admin.u-code.io/v1/invoke_function/qwatt-createtokencard-4dbfb907-8b4b-460b-906b-cc81c58e656c",
    data,
    {
      headers: {
        Authorization: "API-KEY",
        "X-API-KEY": "P-LjlsEVqKmkuiQNYQEi5iZuH3WXVwUU45",
      },
    }
  );
};
