import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchOrders } from "../../features/orderSlice";
import { logout } from "../../features/authSlice"; // Import the logout action

function DashboardPage() {
  const dispatch = useDispatch();

  // Pull order data from Redux
  const {
    orders_list,
    loading: is_loading,
    error: error_msg,
  } = useSelector((state) => state.orders);

  // Fetch orders on mount (if needed)
  useEffect(() => {
    dispatch(fetchOrders())
      .unwrap()
      .catch((err) => {
        toast.error(err);
      });
  }, [dispatch]);

  // 1. Basic Stats
  const total_orders = orders_list.length;
  const completed_orders = orders_list.filter(
    (order) => order.status?.toLowerCase() === "completed"
  ).length;
  const in_progress_orders = orders_list.filter(
    (order) => order.status?.toLowerCase() === "in_progress"
  ).length;
  const pending_orders = total_orders - completed_orders - in_progress_orders;

  // 2. Payment Status (example: paid vs. not paid)
  const not_paid_orders = orders_list.filter(
    (order) => order.payment_status?.toUpperCase() === "NOT PAID"
  ).length;
  const paid_orders = orders_list.filter(
    (order) =>
      order.payment_status?.toUpperCase() === "PAID" ||
      order.payment_status?.toUpperCase() === "COMPLETED"
  ).length;

  // 3. Additional Status Counts (Based on your Flutter references)
  const awaiting_pickup = orders_list.filter(
    (order) => order.status?.toUpperCase() === "AWAITING PICKUP"
  ).length;
  const picked_up = orders_list.filter(
    (order) => order.status?.toUpperCase() === "PICKED UP"
  ).length;
  const awaiting_washing = orders_list.filter(
    (order) => order.status?.toUpperCase() === "AWAITING WASHING"
  ).length;
  const washing_in_progress = orders_list.filter(
    (order) => order.status?.toUpperCase() === "WASHING IN PROGRESS"
  ).length;
  const ready_for_delivery = orders_list.filter(
    (order) => order.status?.toUpperCase() === "READY FOR DELIVERY"
  ).length;
  const out_for_delivery = orders_list.filter(
    (order) => order.status?.toUpperCase() === "OUT FOR DELIVERY"
  ).length;
  const delivered = orders_list.filter(
    (order) => order.status?.toUpperCase() === "DELIVERED"
  ).length;
  const cancelled = orders_list.filter(
    (order) => order.status?.toUpperCase() === "CANCELLED"
  ).length;

  // 4. Recent Orders (sort descending by ID)
  const recent_orders = [...orders_list]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  // Handle loading state
  if (is_loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error_msg) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error_msg}</div>
        <button
          className="btn btn-danger mt-3"
          onClick={() => dispatch(fetchOrders())}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <ToastContainer />

      <h2>Fabricare Dashboard</h2>
      <p className="text-muted">Welcome to your Fabricare dashboard.</p>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => dispatch(fetchOrders())}
        >
          Refresh
        </button>
      </div>

      {/* Main Order Summary Row */}
      <div className="row g-3">
        <div className="col-md-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text fs-4">{total_orders}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Completed</h5>
              <p className="card-text fs-4">{completed_orders}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">In Progress</h5>
              <p className="card-text fs-4">{in_progress_orders}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-secondary">
            <div className="card-body">
              <h5 className="card-title">Pending</h5>
              <p className="card-text fs-4">{pending_orders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary Row */}
      <h4 className="mt-5">Payment Overview</h4>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">Not Paid</h5>
              <p className="card-text fs-4">{not_paid_orders}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">Paid / Completed</h5>
              <p className="card-text fs-4">{paid_orders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Statuses Row */}
      <h4 className="mt-5">Order Status Details</h4>
      <div className="row g-3">
        <div className="col-sm-6 col-md-3">
          <div className="card border-primary">
            <div className="card-body">
              <h6 className="card-title mb-1">Awaiting Pickup</h6>
              <p className="card-text fs-5">{awaiting_pickup}</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div className="card border-info">
            <div className="card-body">
              <h6 className="card-title mb-1">Picked Up</h6>
              <p className="card-text fs-5">{picked_up}</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div className="card border-dark">
            <div className="card-body">
              <h6 className="card-title mb-1">Awaiting Washing</h6>
              <p className="card-text fs-5">{awaiting_washing}</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div className="card border-success">
            <div className="card-body">
              <h6 className="card-title mb-1">Washing in Progress</h6>
              <p className="card-text fs-5">{washing_in_progress}</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div className="card border-secondary">
            <div className="card-body">
              <h6 className="card-title mb-1">Ready for Delivery</h6>
              <p className="card-text fs-5">{ready_for_delivery}</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div className="card border-primary">
            <div className="card-body">
              <h6 className="card-title mb-1">Out for Delivery</h6>
              <p className="card-text fs-5">{out_for_delivery}</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div className="card border-success">
            <div className="card-body">
              <h6 className="card-title mb-1">Delivered</h6>
              <p className="card-text fs-5">{delivered}</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div className="card border-danger">
            <div className="card-body">
              <h6 className="card-title mb-1">Cancelled</h6>
              <p className="card-text fs-5">{cancelled}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-3 my-4">
        <Link to="/orders" className="btn btn-outline-primary">
          View All Orders
        </Link>
        <Link to="/orders/new" className="btn btn-primary">
          Place New Order
        </Link>
      </div>

      {/* Recent Orders */}
      <h4>Recent Orders</h4>
      {recent_orders.length === 0 ? (
        <p>No recent orders yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Service Type</th>
                <th>Status</th>
                <th>Pickup Date</th>
                <th>Delivery Date</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {recent_orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.service_type || "N/A"}</td>
                  <td>{order.status || "N/A"}</td>
                  <td>{order.pickup_date || "N/A"}</td>
                  <td>{order.delivery_date || "N/A"}</td>
                  <td>{order.payment_status || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Logout Button */}
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-danger" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
