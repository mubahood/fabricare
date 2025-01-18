import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Services from "./pages/Services";
import AdminDashboard from "./pages/admin/DashboardPage";
import ManageOrders from "./pages/admin/ManageOrders";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./features/authSlice";
import Posts from "./components/Posts";
import Register from "./pages/Register";
import DashboardPage from "./pages/admin/DashboardPage";
import OrdersPage from "./pages/admin/OrdersPage";
import OrderCreatePage from "./pages/admin/OrderCreatePage";

import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS bundle

function App() {
  const isAdmin = true; // Replace with real authentication logic

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile()).catch(() => {});
  }, [dispatch]);
  const authenticated = useSelector((state) => state.auth.authenticated);

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/orders/new" element={<OrderCreatePage />} />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute isAdmin={authenticated}>
              <Routes>
                <Route path="dashboard" element={<DashboardPage />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
