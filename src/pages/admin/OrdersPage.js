import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { fetchOrders } from "../../features/orderSlice";
import {
  FaEye,
  FaCreditCard,
  FaSearch,
  FaInfoCircle,
  FaHistory,
  FaImages,
  FaSpinner,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { Modal, Button, Badge, Tab, Nav, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import Utils from "../../models/Utils";

function OrdersPage() {
  const dispatch = useDispatch();
  const { orders_list, loading, error } = useSelector((state) => state.orders);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    startDate: null,
    endDate: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchOrders())
      .unwrap()
      .catch((err) => toast.error(`Error loading orders: ${err.message}`));
  }, [dispatch]);

  const filteredOrders = orders_list.filter((order) => {
    const matchesSearch =
      order.id.toString().includes(filters.search) ||
      order.service_type
        ?.toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.status === "all" ||
      order.status?.toLowerCase() === filters.status.toLowerCase();

    const orderDate = new Date(order.created_at);
    const startMatch = !filters.startDate || orderDate >= filters.startDate;
    const endMatch = !filters.endDate || orderDate <= filters.endDate;

    return matchesSearch && matchesStatus && startMatch && endMatch;
  });

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePayment = (order) => {
    if (!order?.stripe_payment_link) {
      toast.error("No payment link available for this order");
      return;
    }
    window.open(order.stripe_payment_link, "_blank");
  };

  const OrderDetailsModal = ({ order, onClose }) => {
    const [activeTab, setActiveTab] = useState("details");
    if (!order) return null;

    const photos = JSON.parse(order.customer_photos || "[]");
    const paymentDue = order.payment_status?.toUpperCase() === "NOT PAID";

    const TimelineEvent = ({ icon, title, date }) => {
      return (
        <div>
          <div className="fw-bold">
            {icon} {title}
          </div>
          <div className="text-muted small">
            {date ? new Date(date).toLocaleString() : "Not recorded"}
          </div>
        </div>
      );
    };

    return (
      <Modal show={!!order} onHide={onClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Order #{order.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
            <Nav variant="tabs" className="mb-4">
              <Nav.Item>
                <Nav.Link eventKey="details">
                  <FaInfoCircle className="me-2" /> Details
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="timeline">
                  <FaHistory className="me-2" /> Timeline
                </Nav.Link>
              </Nav.Item>
              {photos.length > 0 && (
                <Nav.Item>
                  <Nav.Link eventKey="photos">
                    <FaImages className="me-2" /> Photos ({photos.length})
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>

            <Tab.Content>
              {/* Details Tab */}
              <Tab.Pane eventKey="details">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-header bg-primary text-white">
                        Customer Information
                      </div>
                      <div className="card-body">
                        <dl className="row">
                          <dt className="col-sm-4">Name</dt>
                          <dd className="col-sm-8">
                            {order.customer_name || "N/A"}
                          </dd>

                          <dt className="col-sm-4">Phone</dt>
                          <dd className="col-sm-8">
                            {order.customer_phone || "N/A"}
                          </dd>

                          <dt className="col-sm-4">Address</dt>
                          <dd className="col-sm-8">
                            {order.pickup_address || "N/A"}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                      <div className="card-header bg-primary text-white">
                        Payment Details
                      </div>
                      <div className="card-body">
                        <dl className="row">
                          <dt className="col-sm-4">Total Amount</dt>
                          <dd className="col-sm-8">${order.total_amount}</dd>

                          <dt className="col-sm-4">Status</dt>
                          <dd className="col-sm-8">
                            <Badge bg={paymentDue ? "danger" : "success"}>
                              {order.payment_status}
                            </Badge>
                          </dd>

                          <dt className="col-sm-4">Method</dt>
                          <dd className="col-sm-8">
                            {order.payment_method || "N/A"}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>

              {/* Timeline Tab */}
              <Tab.Pane eventKey="timeline">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <TimelineEvent
                      icon="📝"
                      title="Order Created"
                      date={order.created_at}
                    />
                    <TimelineEvent
                      icon="🚚"
                      title="Pickup Completed"
                      date={order.actual_pickup_time}
                    />
                    <TimelineEvent
                      icon="🧼"
                      title="Washing Started"
                      date={order.washing_start_time}
                    />
                    <TimelineEvent
                      icon="📦"
                      title="Delivery Completed"
                      date={order.delivery_date}
                    />
                  </div>
                </div>
              </Tab.Pane>

              {/* Photos Tab */}
              {photos.length > 0 && (
                <Tab.Pane eventKey="photos">
                  <div className="row g-3">
                    {photos.map((photo, index) => (
                      <div className="col-md-3" key={index}>
                        <div className="card border-0 shadow-sm h-100">
                          <img
                            src={Utils.img(photo.src)}
                            alt={`Order ${order.id} - ${photo.type || "Photo"}`}
                            className="card-img-top img-fluid"
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                          <div className="card-body small">
                            {photo.type && (
                              <div className="text-muted">{photo.type}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Tab.Pane>
              )}
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer>
          {paymentDue && (
            <Button
              variant="warning"
              onClick={() => handlePayment(order)}
              disabled={!order.stripe_payment_link}
            >
              <FaCreditCard className="me-2" />
              {order.stripe_payment_link ? "Pay Now" : "Payment Unavailable"}
            </Button>
          )}
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5 py-5">
        <FaSpinner className="fa-spin me-2" size={32} />
        <span className="h4 align-middle">Loading Orders...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <Alert variant="danger" className="d-flex align-items-center">
          <FaTimesCircle className="me-2" size={24} />
          <div>
            <h5>Error Loading Orders</h5>
            <p className="mb-0">{error}</p>
          </div>
          <Button
            variant="outline-danger"
            className="ms-auto"
            onClick={() => dispatch(fetchOrders())}
          >
            Retry
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" />

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Order Management</h1>
        <Button
          variant="outline-primary"
          onClick={() => dispatch(fetchOrders())}
        >
          Refresh Orders
        </Button>
      </div>

      {/* Filters Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            {/* Search Input */}
            <div className="col-md-4">
              <label className="form-label">Search Orders</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by ID, name, or service..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="col-md-3">
              <label className="form-label">Filter by Status</label>
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="delivered">Delivered</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="col-md-5">
              <label className="form-label">Date Range</label>
              <div className="d-flex gap-2">
                <DatePicker
                  selected={filters.startDate}
                  onChange={(date) =>
                    setFilters((prev) => ({ ...prev, startDate: date }))
                  }
                  selectsStart
                  startDate={filters.startDate}
                  endDate={filters.endDate}
                  placeholderText="Start Date"
                  className="form-control"
                />
                <DatePicker
                  selected={filters.endDate}
                  onChange={(date) =>
                    setFilters((prev) => ({ ...prev, endDate: date }))
                  }
                  selectsEnd
                  startDate={filters.startDate}
                  endDate={filters.endDate}
                  minDate={filters.startDate}
                  placeholderText="End Date"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Status</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer_name || "N/A"}</td>
                  <td>{order.service_type}</td>
                  <td>
                    <Badge
                      bg={
                        order.status === "DELIVERED"
                          ? "success"
                          : order.status === "CANCELLED"
                          ? "danger"
                          : order.status === "IN_PROGRESS"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td>${order.total_amount}</td>
                  <td>
                    <Badge
                      bg={
                        order.payment_status === "Not Paid"
                          ? "danger"
                          : "success"
                      }
                      className="d-flex align-items-center gap-1"
                    >
                      {order.payment_status === "Not Paid" ? (
                        <FaTimesCircle />
                      ) : (
                        <FaCheckCircle />
                      )}
                      {order.payment_status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                      className="me-2"
                    >
                      <FaEye />
                    </Button>
                    {order.payment_status === "Not Paid" && (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handlePayment(order)}
                        disabled={!order.stripe_payment_link}
                      >
                        <FaCreditCard className="me-1" />
                        {order.stripe_payment_link ? "Pay Now" : "No Link"}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {paginatedOrders.length === 0 && (
          <div className="text-center py-5">
            <h5 className="text-muted">
              No orders found matching your criteria
            </h5>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="card-footer d-flex justify-content-center">
            <nav>
              <ul className="pagination mb-0">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, idx) => (
                  <li
                    key={idx}
                    className={`page-item ${
                      currentPage === idx + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}

export default OrdersPage;

// Add custom styles
const styles = `
.timeline-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border: 2px solid #dee2e6;
}

.table-hover tbody tr {
  transition: background-color 0.15s ease;
}

.card-header {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.badge {
  padding: 0.5em 0.75em;
  font-size: 0.9em;
  letter-spacing: 0.5px;
}

.react-datepicker-wrapper {
  width: 100%;
}

.pagination .page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
