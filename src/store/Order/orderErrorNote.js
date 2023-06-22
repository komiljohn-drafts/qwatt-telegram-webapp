import { createSlice } from "@reduxjs/toolkit";

export const {
  actions: orderErrorNoteActions,
  reducer: orderErrorNoteReducer,
} = createSlice({
  name: "orderErrorNote",
  initialState: { error: "" },
  reducers: {
    setOrderErrorNote: (state, { payload }) => {
      state.error = payload;
    },
  },
});
