import { createSlice } from "@reduxjs/toolkit";

export const { actions: locationActions, reducer: locationReducers } = createSlice({
  name: "locations",
  initialState: { locationIds: {} },
  reducers: {
    setLocationId: (state, { payload }) => {
      state.locationIds = payload;
    },
  },
});
