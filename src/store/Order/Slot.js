import { createSlice } from "@reduxjs/toolkit";

export const { actions: slotActions, reducer: slotReducer } = createSlice({
  name: "slot",
  initialState: { slotNumber: "" },
  reducers: {
    setSlot: (state, { payload }) => {
      state.slotNumber = payload;
    },
  },
});
