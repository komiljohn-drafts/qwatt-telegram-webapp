import { createSlice } from "@reduxjs/toolkit";

export const { actions: userDataActions, reducer: userDataReducers } =
  createSlice({
    name: "userData",
    initialState: { data: {} },
    reducers: {
      setUserData: (state, { payload }) => {
        state.data = payload;
      },
    },
  });
