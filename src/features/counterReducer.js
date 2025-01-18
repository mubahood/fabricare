import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0, // Initial value of the counter
    my_val: 2,
  },
  reducers: {
    increment: (state) => {
      state.value += 1; // Increase the counter
      state.my_val += 2; // Increase the counter
    },
    decrement: (state) => {
      state.value -= 1; // Decrease the counter
      state.my_val -= 2; // Decrease the counter
    },
    divider: (state) => {
      state.value /= 2; // Decrease the counter
      state.my_val /= 4; // Decrease the counter
    },
  },
});

export const { increment, decrement, divider } = counterSlice.actions; // Export actions
export default counterSlice.reducer; // Export reducer
