import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http_get, http_post } from "../services/api";
// Assumes you have GET and POST helpers. Adjust as needed.

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      // GET /orders might return an array of orders for the logged-in user
      const response = await http_get("laundry-orders");
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (order_data, { rejectWithValue }) => {
    try {
      // POST /orders with the new order details
      const response = await http_post("order-create", order_data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders_list: [], // List of user orders
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH ORDERS
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orders_list = [];
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders_list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.orders_list = [];
      })

      // CREATE ORDER
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orders_list = [];
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        // You might add the new order to the list if it returns the created order
        state.orders_list.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = [];
      });
  },
});

export default orderSlice.reducer;
