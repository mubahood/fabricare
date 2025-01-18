import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "services",
  initialState: [],
  reducers: {
    addService(state, action) {
      state.push(action.payload);
    },
    updateService(state, action) {
      const index = state.findIndex(
        (service) => service.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeService(state, action) {
      return state.filter((service) => service.id !== action.payload);
    },
  },
});

export const { addService, updateService, removeService } =
  serviceSlice.actions;
export default serviceSlice.reducer;
