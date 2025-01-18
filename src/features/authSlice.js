import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http_post } from "../services/api";
import Utils from "../models/Utils";
import { DB_LOGGED_IN_PROFILE, DB_TOKEN } from "../models/Constants";
import { toast } from "react-toastify";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  var data = null;
  try {
    data = await http_post("users/login", credentials);
  } catch (error) {
    throw new Error("Failed to login because: " + error.message);
  }
  const token = data.remember_token;
  //check if null
  if (!token) {
    throw new Error("Failed to login because token is null");
  }
  //check if length is less than 5
  if (token.length < 5) {
    throw new Error("Failed to login because token is invalid");
  }
  Utils.saveToDatabase(DB_TOKEN, token);

  var const_2 = Utils.loadFromDatabase(DB_TOKEN);
  if (
    const_2 == null ||
    const_2 == undefined ||
    const_2 == "undefined" ||
    const_2 == ""
  ) {
    throw new Error("Failed to login because token is null");
  }

  //check const_2 length
  if (const_2.length < 5) {
    throw new Error("Failed to login because token is invalid");
  }

  //save DB_LOGGED_IN_PROFILE
  Utils.saveToDatabase("DB_LOGGED_IN_PROFILE", data);
  //load DB_LOGGED_IN_PROFILE
  var const_3 = Utils.loadFromDatabase("DB_LOGGED_IN_PROFILE");
  if (
    const_3 == null ||
    const_3 == undefined ||
    const_3 == "undefined" ||
    const_3 == ""
  ) {
    throw new Error("Failed to login because user is null");
  }
  localStorage.setItem("DB_TOKEN", token); // Save token in local storage
  return {
    user: const_3,
    token: token,
    authenticated: true,
  };
});

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem(DB_TOKEN); // Clear token
  return null; // Reset auth state
});

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async () => {
    const token = localStorage.getItem(DB_TOKEN); // Retrieve token from local storage
    if (!token || token.length < 5) {
      const authenticated = false;
      return null;
    }

    const user = Utils.loadFromDatabase(DB_LOGGED_IN_PROFILE);
    if (
      user == null ||
      user == undefined ||
      user == "undefined" ||
      user == ""
    ) {
      return {
        user: null,
        token: null,
        authenticated: false,
      };
    }
    return {
      user: user,
      token: token,
      authenticated: true,
    };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    user: null,
    loading: false,
    error: null,
    token: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.authenticated = action.payload.authenticated;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.authenticated = false;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.authenticated = false;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.authenticated = action.payload.authenticated;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.authenticated = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
