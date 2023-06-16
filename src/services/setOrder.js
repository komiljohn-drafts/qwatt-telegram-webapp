import request from "@/utils/axios";

export const setOrder = async (data) => {
  return await request({ method: "post", url: "/orders", data });
};

export const setStation = async (data) => {
  return await request({
    method: "post",
    url: "/get-list/cabine_lists",
    data,
  });
};

export const getOrders = async (data) => {
  return await request({ method: "post", url: "/orders", data });
};
