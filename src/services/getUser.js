import request from "@/utils/axios";

export const getUserId = async (data) => {
  return await request({ method: "post", url: "/get-list/user", data });
};
