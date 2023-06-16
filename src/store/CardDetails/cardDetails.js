import { createSlice } from "@reduxjs/toolkit";

export const { actions: cardDetailsActions, reducer: cardDetailsReducer } =
  createSlice({
    name: "card-details",
    initialState: { data: {} },
    reducers: {
      setCardDetails: (state, { payload }) => {
        state.data = payload;
      },
    },
  });
