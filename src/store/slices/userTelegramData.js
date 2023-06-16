import { createSlice } from "@reduxjs/toolkit";

export const {
  actions: userTelegramDataActions,
  reducer: userTelegramDataReducers,
} = createSlice({
  name: "userTelegramData",
  initialState: { data: {} },
  reducers: {
    setUserTelegramData: (state, { payload }) => {
      state.data = payload;
    },
  },
});
