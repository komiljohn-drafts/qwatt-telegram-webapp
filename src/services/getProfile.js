import request from "@/utils/axios";
import requestInvoke from "@/utils/axiosForInvoke";
import axios from "axios";

export const setProfile = async (data) => {
  return await request({
    method: "put",
    url: "/user",
    data,
  });
};

export const getProfile = async (guid) => {
  return await request({
    method: "get",
    url: `/user/${guid}`,
  });
};

export const deleteProfile = async (data) => {
  return await request({
    method: "put",
    url: "/user",
    data,
  });
};

export const deleteUser = async (data) => {
  // should be checked
  return await request({
    method: "put",
    url: "/user",
    data,
  });
};

export const sendMsgDeleted = async (data) => {
  return await axios.post("https://qwatt-bot.qwatt.uz/users_clean", data);
};

export const getBonus = async (data) => {
  return await request({
    method: "post",
    url: "/get-list/user_balance",
    data,
  });
};

export const giveGifts = async (data) => {
  return await requestInvoke.post("/qwatt-givegifts-4dbfb907-8b4b-460b-906b-cc81c58e656c", data);
};
