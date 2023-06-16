import request from "@/utils/axios";

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
