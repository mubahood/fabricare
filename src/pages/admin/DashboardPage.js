import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiPlusCircle,
  FiBox,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiTruck,
  FiArchive,
} from "react-icons/fi";
import { fetchOrders } from "../../features/orderSlice";
import { logout } from "../../features/authSlice";

function DashboardPage() {
  const dispatch = useDispatch();
  const {
    orders_list,
    loading: is_loading,
    error: error_msg,
  } = useSelector((state) => state.orders);

  // Calculate all order metrics
  const total_orders = orders_list?.length || 0;
  const completed_orders =
    orders_list?.filter((order) => order.status?.toLowerCase() === "completed")
      .length || 0;
  const in_progress_orders =
    orders_list?.filter(
      (order) => order.status?.toLowerCase() === "in_progress"
    ).length || 0;
  const pending_orders = total_orders - completed_orders - in_progress_orders;
  const not_paid_orders =
    orders_list?.filter(
      (order) => order.payment_status?.toUpperCase() === "NOT PAID"
    ).length || 0;
  const paid_orders =
    orders_list?.filter((order) =>
      ["PAID", "COMPLETED"].includes(order.payment_status?.toUpperCase())
    ).length || 0;

  // Detailed status counts
  const statusCount = (status) =>
    orders_list?.filter(
      (order) => order.status?.toUpperCase() === status.toUpperCase()
    ).length || 0;

  const awaiting_pickup = statusCount("AWAITING PICKUP");
  const picked_up = statusCount("PICKED UP");
  const awaiting_washing = statusCount("AWAITING WASHING");
  const washing_in_progress = statusCount("WASHING IN PROGRESS");
  const ready_for_delivery = statusCount("READY FOR DELIVERY");
  const out_for_delivery = statusCount("OUT FOR DELIVERY");
  const delivered = statusCount("DELIVERED");
  const cancelled = statusCount("CANCELLED");

  // Recent orders
  const recent_orders =
    orders_list?.length > 0
      ? [...orders_list].sort((a, b) => b.id - a.id).slice(0, 3)
      : [];

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (is_loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error_msg) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger d-flex align-items-center">
          <div className="flex-grow-1">{error_msg}</div>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => dispatch(fetchOrders())}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-gray-800">Fabrircare Dashboard</h1>
        <div className="d-flex gap-2">
          <Link
            to="/orders/new"
            className="btn btn-primary d-flex align-items-center gap-2"
          >
            <FiPlusCircle /> New Order
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-start-primary h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <FiBox className="text-primary fs-3 me-3" />
                <div>
                  <div className="text-muted small">Total Orders</div>
                  <div className="h3 mb-0">{total_orders}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-start-success h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <FiCheckCircle className="text-success fs-3 me-3" />
                <div>
                  <div className="text-muted small">Completed</div>
                  <div className="h3 mb-0">{completed_orders}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-start-warning h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <FiClock className="text-warning fs-3 me-3" />
                <div>
                  <div className="text-muted small">In Progress</div>
                  <div className="h3 mb-0">{in_progress_orders}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-start-danger h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <FiDollarSign className="text-danger fs-3 me-3" />
                <div>
                  <div className="text-muted small">Pending Payment</div>
                  <div className="h3 mb-0">{not_paid_orders}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h5 className="mb-0">Order Workflow</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {[
                  {
                    title: "Awaiting Pickup",
                    value: awaiting_pickup,
                    icon: <FiTruck />,
                  },
                  {
                    title: "Picked Up",
                    value: picked_up,
                    icon: <FiTruck className="text-success" />,
                  },
                  {
                    title: "Awaiting Wash",
                    value: awaiting_washing,
                    icon: <FiArchive />,
                  },
                  {
                    title: "Washing",
                    value: washing_in_progress,
                    icon: <FiArchive className="text-info" />,
                  },
                  {
                    title: "Ready for Delivery",
                    value: ready_for_delivery,
                    icon: <FiCheckCircle />,
                  },
                  {
                    title: "Out for Delivery",
                    value: out_for_delivery,
                    icon: <FiTruck className="text-warning" />,
                  },
                  {
                    title: "Delivered",
                    value: delivered,
                    icon: <FiCheckCircle className="text-success" />,
                  },
                  {
                    title: "Cancelled",
                    value: cancelled,
                    icon: <FiClock className="text-danger" />,
                  },
                ].map((item, index) => (
                  <div key={index} className="col-6 col-md-4 col-lg-3">
                    <div className="p-3 border rounded text-center">
                      <div className="text-muted small mb-2">
                        {item.icon} {item.title}
                      </div>
                      <div className="h4 mb-0">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Orders</h5>
              <Link to="/orders" className="btn btn-sm btn-link">
                View All
              </Link>
            </div>
            <div className="card-body p-0">
              {recent_orders.length === 0 ? (
                <div className="text-center p-4 text-muted">
                  No recent orders
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {recent_orders.map((order) => (
                    <Link
                      key={order.id}
                      to={`/orders/${order.id}`}
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-bold">Order #{order.id}</div>
                          <small className="text-muted">
                            {order.service_type}
                          </small>
                        </div>
                        <span
                          className={`badge rounded-pill bg-${
                            order.status === "Completed" ? "success" : "warning"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h5 className="mb-0">Detailed Statistics</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {[
              {
                title: "Pending Orders",
                value: pending_orders,
                color: "warning",
              },
              { title: "Paid Orders", value: paid_orders, color: "success" },
              {
                title: "Awaiting Washing",
                value: awaiting_washing,
                color: "info",
              },
              {
                title: "Out for Delivery",
                value: out_for_delivery,
                color: "primary",
              },
            ].map((item, index) => (
              <div key={index} className="col-6 col-md-3">
                <div
                  className={`p-3 bg-${item.color}-subtle rounded text-center`}
                >
                  <div className="text-muted small mb-1">{item.title}</div>
                  <div className="h4 mb-0">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div></div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-danger"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
