import { createSlice } from "@reduxjs/toolkit";

export const { actions: orderDetailsActions, reducer: orderDetailsReducer } =
  createSlice({
    name: "order-details",
    initialState: { data: {} },
    reducers: {
      setOrderDetails: (state, { payload }) => {
        state.data = payload;
      },
    },
  });

  // data: {
  //   userID: "",
  //   orders: []
  // }