import { createSlice } from "@reduxjs/toolkit";

export const { actions: cardVerifyActions, reducer: cardVerifyReducers } =
  createSlice({
    name: "card-verify",
    initialState: { verified: false },
    reducers: {
      setCardVerify: (state, { payload }) => {
        state.verified = payload;
      },
    },
  });
