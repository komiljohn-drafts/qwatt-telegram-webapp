import request from "@/utils/axios";
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

export const deleteUser = async (data) => { // should be checked
  return await request({
    method: 'put',
    url: "/user",
    data
  })
}

export const sendMsgDeleted = async (data) => {
  return await axios.post(
    "https://qwatt-bot.u-code.io/users_clean",
    data
  )
}
