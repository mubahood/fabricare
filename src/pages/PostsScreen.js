import React from "react";
import CounterControls from "./components/CounterControls";
import CounterDisplay from "./components/CounterDisplay";
import Posts from "./components/Posts";

function PostsScreen() {
  return (
    <div className="container mt-5">
      <h1>Redux Thunk Example</h1>
      <Posts />
    </div>
  );
}

export default PostsScreen;
