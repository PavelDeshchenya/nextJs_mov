import { createSlice } from "@reduxjs/toolkit";
import { IRates } from "@/types/types";

export const displayRateSlice = createSlice({
  name: "displayRate",
  initialState: {
    rates: {},
  },
  reducers: {
    setDisplayRate(
      state: { rates: IRates },
      action: {
        type: string;
        payload: { cardId: number; rate: number | undefined };
      }
    ) {
      const { cardId, rate } = action.payload;
      state.rates[cardId] = rate;
    },
  },
});

export const { setDisplayRate } = displayRateSlice.actions;

export default displayRateSlice.reducer;
