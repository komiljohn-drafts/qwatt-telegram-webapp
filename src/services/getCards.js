import axios from "axios";
import request from "@/utils/axios";
import requestInvoke from "@/utils/axiosForInvoke";

// export const getCards = async (data) => {
//   return await request({
//     method: "post",
//     url: "/get-list/credit_card_list",
//     data,
//   });
// };

// export const deleteCard = async (guid, data) => {
//   return await request({
//     method: "delete",
//     url: `/credit_card_list/${guid}`,
//     data,
//   });
// };

export const setCard = async (data) =>
  await request({
    method: "post",
    url: "/credit_card_list",
    data,
  });

export const getCards = async (data) =>
  await requestInvoke.post(
    "/qwatt-usercard-4dbfb907-8b4b-460b-906b-cc81c58e656c",
    data
  );

export const deleteCard = async (data) =>
  await axios.post(
    "/qwatt-carddelete-4dbfb907-8b4b-460b-906b-cc81c58e656c",
    data
  );

export const setCardOtp = async (data) =>
  await axios.post(
    "/qwatt-confirmcardtoken-4dbfb907-8b4b-460b-906b-cc81c58e656c",
    data
  );

export const setConfirmCardToken = async (data) =>
  await axios.post(
    "/qwatt-confirmcardtoken-4dbfb907-8b4b-460b-906b-cc81c58e656c",
    data
  );

export const setCardToken = async (data) =>
  await axios.post(
    "/qwatt-createtokencard-4dbfb907-8b4b-460b-906b-cc81c58e656c",
    data
  );
