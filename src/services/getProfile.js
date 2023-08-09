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

export const deleteUser = async (data) => {
  return await axios.put("https://api.admin.u-code.io/v1/object/user?project-id=4dbfb907-8b4b-460b-906b-cc81c58e656",
    data,
    {
      headers: {
        Authorization: "API-KEY",
        "X-API-KEY": "P-LjlsEVqKmkuiQNYQEi5iZuH3WXVwUU45",
      },
    }
  );
}
