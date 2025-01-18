import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrder } from "../features/orderSlice";
import { useNavigate } from "react-router-dom";

function NewOrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [is_loading, set_is_loading] = useState(false);

  const formik = useFormik({
    initialValues: {
      service_type: "",
      pickup_date: "",
      pickup_address: "",
      notes: "",
    },
    validationSchema: Yup.object({
      service_type: Yup.string().required("Service type is required"),
      pickup_date: Yup.string().required("Pickup date is required"),
      pickup_address: Yup.string().required("Pickup address is required"),
      notes: Yup.string(),
    }),
    onSubmit: async (values) => {
      set_is_loading(true);
      try {
        await dispatch(createOrder(values)).unwrap();
        toast.success("Order placed successfully!");
        navigate("/orders"); // Redirect to orders list
      } catch (error) {
        toast.error(error);
      } finally {
        set_is_loading(false);
      }
    },
  });

  return (
    <div className="container mt-5">
      <h2>Place New Order</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Service Type */}
        <div className="mb-3">
          <label className="form-label">Service Type</label>
          <input
            type="text"
            className={`form-control ${
              formik.touched.service_type && formik.errors.service_type
                ? "is-invalid"
                : ""
            }`}
            name="service_type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.service_type}
          />
          {formik.touched.service_type && formik.errors.service_type && (
            <div className="invalid-feedback">{formik.errors.service_type}</div>
          )}
        </div>

        {/* Pickup Date */}
        <div className="mb-3">
          <label className="form-label">Pickup Date</label>
          <input
            type="date"
            className={`form-control ${
              formik.touched.pickup_date && formik.errors.pickup_date
                ? "is-invalid"
                : ""
            }`}
            name="pickup_date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pickup_date}
          />
          {formik.touched.pickup_date && formik.errors.pickup_date && (
            <div className="invalid-feedback">{formik.errors.pickup_date}</div>
          )}
        </div>

        {/* Pickup Address */}
        <div className="mb-3">
          <label className="form-label">Pickup Address</label>
          <input
            type="text"
            className={`form-control ${
              formik.touched.pickup_address && formik.errors.pickup_address
                ? "is-invalid"
                : ""
            }`}
            name="pickup_address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pickup_address}
          />
          {formik.touched.pickup_address && formik.errors.pickup_address && (
            <div className="invalid-feedback">
              {formik.errors.pickup_address}
            </div>
          )}
        </div>

        {/* Notes (Optional) */}
        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            className="form-control"
            name="notes"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.notes}
          />
        </div>

        {is_loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button type="submit" className="btn btn-primary">
            Place Order
          </button>
        )}
      </form>
      <ToastContainer />
    </div>
  );
}

export default NewOrderPage;
