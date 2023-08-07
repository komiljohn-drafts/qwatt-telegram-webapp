import { createSlice } from "@reduxjs/toolkit";

export const { actions: userDataActions, reducer: userDataReducers } =
  createSlice({
    name: "userData",
    initialState: { data: {}, debt: false },
    reducers: {
      setUserData: (state, { payload }) => {
        state.data = payload;
      },
      setUserDebt: (state, { payload }) => {
        state.debt = payload;
      }
    },
  });
