import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { http_post } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";

function Register() {
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First Name is required")
        .min(2, "First Name must be at least 2 characters"),
      lastName: Yup.string()
        .required("Last Name is required")
        .min(2, "Last Name must be at least 2 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(4, "Password must be at least 4 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .min(4, "Password must be at least 4 characters"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        var data = null;
        setLoading(true);
        setErrorMsg("");
        try {
          data = await http_post("users/register", {
            first_name: values.firstName,
            last_name: values.lastName,
            phone_number: values.phone,
            phone_number_1: values.phone,
            password: values.password,
            name: values.firstName + " " + values.lastName,
            email: values.email,
          });
          setLoading(false);
        } catch (error) {
          toast.error(`Error: ${error.message}`);
          setLoading(false);
          setErrorMsg(error.message);
          return;
        }
        setLoading(false);

        toast.success("Loggin in...");

        setLoading(true);

        try {
          await dispatch(
            login({
              username: values.email,
              password: values.password,
            })
          ).unwrap();
          setLoading(false);
          toast.success("Loggged in successfuly");
          navigate("/admin/dashboard");
        } catch (error) {
          setLoading(false);
          setErrorMsg(error.message);
        }

        return;
        const response = null;
        if (response.ok) {
          toast.success("Registration successful!");
          resetForm();
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again.");
      }
    },
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Register</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "is-invalid"
                    : ""
                }`}
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="invalid-feedback">
                  {formik.errors.firstName}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "is-invalid"
                    : ""
                }`}
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="invalid-feedback">{formik.errors.lastName}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "is-invalid"
                    : ""
                }`}
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.phone && formik.errors.phone
                    ? "is-invalid"
                    : ""
                }`}
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="invalid-feedback">{formik.errors.phone}</div>
              )}
            </div>

            {errorMsg && (
              <div className="alert alert-danger my-2">{errorMsg}</div>
            )}

            {loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            )}
            <hr />
            <div className="mt-3 text-center">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
