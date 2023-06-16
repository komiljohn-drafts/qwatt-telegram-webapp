import request from "@/utils/axios";

export const getPrice = async (data) => {
  return await request({ method: "post", url: "/pricing_descs", data });
};

export const getPriceFaq = async (data) => {
  return await request({ method: "post", url: "/pricing_description", data });
};
