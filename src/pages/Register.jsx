import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import "./Auth.css";
import API from "../api";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await API.post("/auth/signup", { name, email, password, age: Number(age), gender });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed!");
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
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Start prioritizing your mental health</p>

        {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

        <form className="auth-form animate-fade-in" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            className="form-input"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            required
            className="form-input"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="number"
            required
            className="form-input"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <select
            required
            className="form-input"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="password"
            required
            className="form-input"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={isLoading || !email || !password || !name || !age || !gender}
          >
            {isLoading ? "Creating..." : <>Sign Up <FiUserPlus /></>}
          </button>
        </form>

        <div className="auth-links animate-slide-up">
          Already have an account?
          <Link to="/" className="auth-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;