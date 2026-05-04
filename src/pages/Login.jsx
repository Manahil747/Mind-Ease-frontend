import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import "./Auth.css";
import API from "../api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await API.post("/auth/login", { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>

      <div className="glass-card auth-card">
        <div className="auth-logo"><FaHeartbeat /></div>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Continue your mental wellness journey</p>

        {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

        <form className="auth-form animate-fade-in" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            className="form-input"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={isLoading || !email || !password}
          >
            {isLoading ? "Signing in..." : <>Sign In <FiArrowRight /></>}
          </button>
        </form>

        <div className="auth-links animate-slide-up">
          Don't have an account?
          <Link to="/register" className="auth-link">Create Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;