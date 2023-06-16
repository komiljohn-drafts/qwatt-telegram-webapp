import request from "@/utils/axios";

export const getMerchantList = async (data) => {
  return await request({
    method: "post",
    url: "/get-list/merchant_list",
    data,
  });
};

export const getVenueList = async (data) => {
  return await request({ method: "post", url: "/get-list/venue_type", data });
};
