import { createSlice } from "@reduxjs/toolkit";

export const { actions: orderActions, reducer: orderReducers } = createSlice({
  name: "orders",
  initialState: { orderIds: {} },
  reducers: {
    setOrderId: (state, { payload }) => {
      state.orderIds = payload;
    },
  },
});
