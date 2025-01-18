import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //error message
  const [errorMessage, setError] = useState("");
  //loading
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    //loading
    setLoading(true);

    try {
      await dispatch(
        login({
          username: email,
          password: password,
        })
      ).unwrap();
      //loading
      setLoading(false);
      toast.success("Loggged in successfuly");
      navigate("/admin/dashboard"); // Redirect to dashboard upon successful login
    } catch (error) {
      //loading
      setLoading(false);
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div
      className="container mt-5 d-flex justify-content-center align-items-center"
      style={{ height: "50vh" }}
    >
      <div className="col-md-6">
        <h2 className="text-center">Login</h2>

        <form onSubmit={handleLogin}>
          {/* display errorMessage */}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* loading */}
          {loading && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {!loading && (
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          )}
          <hr />
          <div className="mt-3 text-center">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
