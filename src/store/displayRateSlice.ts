import { createSlice } from "@reduxjs/toolkit";

export const displayRateSlice = createSlice({
  name: "displayRate",
  initialState: {
    rates: {},
  },
  reducers: {
    setDisplayRate(state, action) {
      const { cardId, rate } = action.payload;
      state.rates[cardId] = rate;
    },
  },
});

export const { setDisplayRate } = displayRateSlice.actions;

export default displayRateSlice.reducer;
