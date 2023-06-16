import request from "@/utils/axios";

export const getTariffs = async (data) => {
  return await request({
    method: "post",
    url: "/get-list/pricing_description",
    data,
  });
};
