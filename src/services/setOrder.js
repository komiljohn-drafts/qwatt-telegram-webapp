import request from "@/utils/axios";
import requestInvoke from "@/utils/axiosForInvoke";

export const setStation = async (data) => {
  return await request({
    method: "post",
    url: "/get-list/cabine_lists",
    data,
  })
}


export const getOrderById = async (guid, data) => {
  return await request({
    method: "get",
    url: `/orders/${guid}`,
    data,
  })
}

export const getOrders = async (data) => {
  return await requestInvoke.post(
    "/qwatt-getuserorders-4dbfb907-8b4b-460b-906b-cc81c58e656c",
    data
  )
}


export const setOrder = async (data) => {
  return await requestInvoke.post(
    "/qwatt-createbatteryorder-4dbfb907-8b4b-460b-906b-cc81c58e656c",
    data
  )
}


export const getBonus = async (data) => {
  return await requestInvoke.post(
    "/qwatt-getbonusanddlink-4dbfb907-8b4b-460b-906b-cc81c58e656c",
    data
  )
}