import request from "@/utils/axios";
import axios from "axios";

export const getMerchantList = async (data) => {
  return await axios.get(
    'https://test.api.admin.qwatt.uz/v1/object-slim/get-list/merchant_list?project-id=4dbfb907-8b4b-460b-906b-cc81c58e656c&data={}',
    {
      headers: {
        Authorization: "API-KEY",
        "X-API-KEY": "P-LjlsEVqKmkuiQNYQEi5iZuH3WXVwUU45",
      },
    }
  )
}

export const getVenueList = async (data) => {
  return await request({ 
    method: "post", 
    url: "/get-list/venue_type", 
    data 
  });
};