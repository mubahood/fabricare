import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./features/orderSlice";
import serviceReducer from "./features/serviceSlice";
// import counterReducer
import counterReducer from "./features/counterReducer";
import authSlice from "./features/authSlice";
import postsReducer from "./features/postsSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    auth: authSlice,
    orders: orderReducer,
    services: serviceReducer,
    counter: counterReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
