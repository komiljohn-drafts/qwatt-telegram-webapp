import { createSlice } from "@reduxjs/toolkit";

export const { actions: fitlerActions, reducer: filterReducers } = createSlice({
  name: "filter",
  initialState: { filterId: 0 },
  reducers: {
    setFilterId: (state, { payload }) => {
      state.filterId = payload;
    },
    resetFilter: (state) => {
      state.filterId = 0; // Reset the filterIds array to an empty array
    },
  },
});
