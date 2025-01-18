import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { fetchOrders } from "../../features/orderSlice";

function OrdersPage() {
  const dispatch = useDispatch();
  const {
    orders_list,
    loading: is_loading,
    error: error_msg,
  } = useSelector((state) => state.orders);

  // State for filtering and searching
  const [search_term, set_search_term] = useState("");
  const [status_filter, set_status_filter] = useState("all");

  // For pagination (optional)
  const [current_page, set_current_page] = useState(1);
  const orders_per_page = 5; // Adjust to your preference

  useEffect(() => {
    dispatch(fetchOrders())
      .unwrap()
      .catch((err) => toast.error(err));
  }, [dispatch]);

  // 1. Filter & Search Logic
  const filtered_orders = orders_list.filter((order) => {
    // Search by ID, service_type, or other fields
    const matches_search =
      order.id.toString().includes(search_term) ||
      (order.service_type || "")
        .toLowerCase()
        .includes(search_term.toLowerCase()) ||
      (order.customer_name || "")
        .toLowerCase()
        .includes(search_term.toLowerCase());

    // Status filter
    const matches_status =
      status_filter === "all"
        ? true
        : order.status?.toLowerCase() === status_filter.toLowerCase();

    return matches_search && matches_status;
  });

  // 2. Pagination Logic
  const index_of_last_order = current_page * orders_per_page;
  const index_of_first_order = index_of_last_order - orders_per_page;
  const current_orders = filtered_orders.slice(
    index_of_first_order,
    index_of_last_order
  );

  const total_pages = Math.ceil(filtered_orders.length / orders_per_page);

  const handle_page_change = (new_page) => {
    set_current_page(new_page);
  };

  // 3. Loading and Error Handling
  if (is_loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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

  // Helper: Render a status badge
  const renderStatusBadge = (status) => {
    if (!status) return <span className="badge bg-secondary">Unknown</span>;

    const lower = status.toLowerCase();
    if (lower === "completed") {
      return <span className="badge bg-success">{status}</span>;
    } else if (lower === "in_progress" || lower.includes("progress")) {
      return <span className="badge bg-warning text-dark">{status}</span>;
    } else if (lower === "cancelled") {
      return <span className="badge bg-danger">{status}</span>;
    } else if (lower === "delivered") {
      return <span className="badge bg-primary">{status}</span>;
    } else {
      return <span className="badge bg-secondary">{status}</span>;
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="mb-3">All Orders</h2>

      {/* Refresh Button */}
      <div className="mb-3 d-flex justify-content-end">
        <button
          className="btn btn-outline-secondary"
          onClick={() => dispatch(fetchOrders())}
        >
          Refresh
        </button>
      </div>

      {/* Filters Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          {/* Search Input */}
          <input
            type="text"
            className="form-control"
            placeholder="Search by ID, service, or name..."
            value={search_term}
            onChange={(e) => set_search_term(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          {/* Status Filter */}
          <select
            className="form-select"
            value={status_filter}
            onChange={(e) => {
              set_status_filter(e.target.value);
              set_current_page(1); // Reset to first page
            }}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="awaiting pickup">Awaiting Pickup</option>
            <option value="picked up">Picked Up</option>
            <option value="awaiting washing">Awaiting Washing</option>
            <option value="washing in progress">Washing in Progress</option>
            <option value="ready for delivery">Ready for Delivery</option>
            <option value="out for delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {current_orders.length === 0 ? (
        <p>No orders match your criteria.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Status</th>
                <th>Pickup Date</th>
                <th>Delivery Date</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {current_orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer_name || "N/A"}</td>
                  <td>{order.service_type || "N/A"}</td>
                  <td>{renderStatusBadge(order.status)}</td>
                  <td>{order.pickup_date || "N/A"}</td>
                  <td>{order.delivery_date || "N/A"}</td>
                  <td>
                    {order.payment_status
                      ? order.payment_status.toUpperCase()
                      : "N/A"}
                  </td>
                  <td>
                    {/* Action buttons (View, Pay, etc.) */}
                    <Link
                      to={`/orders/${order.id}`}
                      className="btn btn-sm btn-info me-2"
                    >
                      View
                    </Link>
                    {order.payment_status?.toUpperCase() === "NOT PAID" && (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handlePayNow(order)}
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {filtered_orders.length > orders_per_page && (
        <nav aria-label="Order pagination">
          <ul className="pagination justify-content-center mt-4">
            {/* Previous Page */}
            <li className={`page-item ${current_page === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handle_page_change(current_page - 1)}
                disabled={current_page === 1}
              >
                Previous
              </button>
            </li>

            {/* Page Numbers */}
            {Array.from({ length: total_pages }, (_, idx) => idx + 1).map(
              (page) => (
                <li
                  className={`page-item ${
                    page === current_page ? "active" : ""
                  }`}
                  key={page}
                >
                  <button
                    className="page-link"
                    onClick={() => handle_page_change(page)}
                  >
                    {page}
                  </button>
                </li>
              )
            )}

            {/* Next Page */}
            <li
              className={`page-item ${
                current_page === total_pages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handle_page_change(current_page + 1)}
                disabled={current_page === total_pages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );

  // Example stub for Pay Now
  function handlePayNow(order) {
    toast.info(`Initiate payment for order #${order.id}...`);
    // Could navigate to a payment page or trigger a payment action
  }
}

export default OrdersPage;
