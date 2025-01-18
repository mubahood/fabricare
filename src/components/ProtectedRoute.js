import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Utils from "../models/Utils";
import { DB_TOKEN } from "../models/Constants";

function ProtectedRoute({ isAdmin, children }) {
  var isIn = false;
  const token = localStorage.getItem(DB_TOKEN); // Retrieve token from local storage
  if (!token || token.length < 5) {
    isIn = false;
  } else {
    isIn = true;
  }

  if (!isIn) {
    toast.error("You need to login first.");
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
