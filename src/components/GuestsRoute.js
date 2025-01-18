import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function GuestsRoute({ isAdmin, children }) {
  if (isAdmin) {
    toast.error("You are already logged in");
    return <Navigate to="/dashboard" />;
  }
  return children;
}

export default GuestsRoute;
