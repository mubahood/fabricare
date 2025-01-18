import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action for fetching posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await response.json(); // Parse and return JSON
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {}, // No synchronous reducers for now
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true; // Start loading
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false; // Stop loading
        state.posts = action.payload; // Store fetched posts
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false; // Stop loading
        state.error = action.error.message; // Store error
      });
  },
});

export default postsSlice.reducer;
