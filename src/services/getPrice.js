import request from "@/utils/axios";
import requestInvoke from "@/utils/axiosForInvoke";

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
  return await requestInvoke.post(
    "/qwatt-getdescriptions-4dbfb907-8b4b-460b-906b-cc81c58e656c", 
    data
  )
}