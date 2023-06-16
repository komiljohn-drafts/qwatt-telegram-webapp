import { createSlice } from "@reduxjs/toolkit";

export const { actions: fitlerActions, reducer: filterReducers } = createSlice({
  name: "filters",
  initialState: { filterIds: [] },
  reducers: {
    setFilterId: (state, { payload }) => {
      if (state.filterIds.includes(payload)) {
        state.filterIds = state.filterIds.filter((i) => i !== payload);
      } else {
        state.filterIds = [...state.filterIds, payload];
      }
    },
    resetFilter: (state) => {
      state.filterIds = []; // Reset the filterIds array to an empty array
    },
  },
});
